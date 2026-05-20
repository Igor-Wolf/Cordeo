import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import LiveAudioStream from 'react-native-live-audio-stream';
import { PitchDetector } from 'pitchy';
import { Buffer } from 'buffer';
import { useIsFocused } from '@react-navigation/native';
import { Badge, BadgeRow, CenterLine, CentsText, ClarityText, Container, HelpText, MeterBar, MeterContainer, Note, NoteContainer, Octave, PitchText, Row, Title } from './Styles';


global.Buffer = Buffer;

const SAMPLE_RATE = 44100;
const ANALYSIS_SIZE = 4096; 
const SILENCE_TIMEOUT = 1200;

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function frequencyToNoteAndOctave(freq: number) {
  if (!freq || freq <= 0) return { noteName: '-', octave: '' };
  const midi = Math.round(12 * Math.log2(freq / 440) + 69);
  const noteName = notes[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return { noteName, octave: String(octave) };
}

function centsOff(freq: number, reference: number) {
  return Math.floor(1200 * Math.log2(freq / reference));
}

function getMedian(values: number[]) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const half = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) return sorted[half];
  return (sorted[half - 1] + sorted[half]) / 2.0;
}

export default function Second() {
  const [pitch, setPitch] = useState(0);
  const [note, setNote] = useState('-');
  const [octave, setOctave] = useState('');
  const [clarity, setClarity] = useState(0);
  const [cents, setCents] = useState(0);

  const isFocused = useIsFocused();

  const detectorRef = useRef(PitchDetector.forFloat32Array(ANALYSIS_SIZE));
  const audioSamplesRef = useRef<number[]>([]);
  const pitchHistoryRef = useRef<number[]>([]);
  const smoothPitchRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const lastValidPitchTimeRef = useRef(0);

  // Mapeia a animação horizontal do ponteiro da faixa
  const translateXAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let startTimeout: NodeJS.Timeout;
    let silenceInterval: NodeJS.Timeout;

    if (!isFocused) {
      try { LiveAudioStream.stop(); } catch (e) {}

      setPitch(0);
      setNote('-');
      setOctave('');
      setCents(0);
      setClarity(0);
      smoothPitchRef.current = 0;
      pitchHistoryRef.current = [];

      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();

      return; 
    }

    startTimeout = setTimeout(() => {
      silenceInterval = setInterval(() => {
        if (Date.now() - lastValidPitchTimeRef.current > SILENCE_TIMEOUT) {
          setPitch(0);
          setNote('-');
          setOctave('');
          setCents(0);
          setClarity(0);
          smoothPitchRef.current = 0;
          pitchHistoryRef.current = [];

          Animated.timing(translateXAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start();
        }
      }, 400);

      try { LiveAudioStream.stop(); } catch(e){}

      LiveAudioStream.init({
        sampleRate: SAMPLE_RATE,
        channels: 1,
        bitsPerSample: 16,
        audioSource: 6, 
        bufferSize: 2048,
      });

      LiveAudioStream.on('data', (data: string) => {
        try {
          const buffer = Buffer.from(data, 'base64');
          const int16 = new Int16Array(buffer.buffer, buffer.byteOffset, Math.floor(buffer.length / 2));

          for (let i = 0; i < int16.length; i++) {
            audioSamplesRef.current.push(int16[i] / 32768.0);
          }

          if (audioSamplesRef.current.length > ANALYSIS_SIZE * 2) {
            audioSamplesRef.current = audioSamplesRef.current.slice(-ANALYSIS_SIZE);
          }

          if (audioSamplesRef.current.length >= ANALYSIS_SIZE) {
            const chunk = audioSamplesRef.current.slice(0, ANALYSIS_SIZE);
            audioSamplesRef.current = audioSamplesRef.current.slice(ANALYSIS_SIZE / 2);

            const float32Array = new Float32Array(chunk);
            const [detectedPitch, detectedClarity] = detectorRef.current.findPitch(float32Array, SAMPLE_RATE);

            if (detectedClarity > 0.90 && detectedPitch > 50 && detectedPitch < 1000) {
              lastValidPitchTimeRef.current = Date.now();
              pitchHistoryRef.current.push(detectedPitch);
              if (pitchHistoryRef.current.length > 5) pitchHistoryRef.current.shift();

              const stablePitch = getMedian(pitchHistoryRef.current);

              // Mantido igual a página 1 (0.7 / 0.3) para respostas idênticas
              if (smoothPitchRef.current === 0) {
                smoothPitchRef.current = stablePitch;
              } else {
                smoothPitchRef.current = smoothPitchRef.current * 0.7 + stablePitch * 0.3;
              }

              const smoothPitch = smoothPitchRef.current;
              const now = Date.now();

              // Atualização sincronizada em 60ms
              if (now - lastUpdateRef.current > 60) {
                const { noteName, octave: currentOctave } = frequencyToNoteAndOctave(smoothPitch);
                const midi = Math.round(12 * Math.log2(smoothPitch / 440) + 69);
                const idealFreq = 440 * Math.pow(2, (midi - 69) / 12);
                const centsValue = centsOff(smoothPitch, idealFreq);

                setPitch(smoothPitch);
                setNote(noteName);
                setOctave(currentOctave);
                setClarity(detectedClarity);
                setCents(centsValue);

                // Mapeia os cents (-50 a 50) para os limites físicos em pixels da barra horizontal (-130px a 130px)
                const targetTranslation = Math.max(-50, Math.min(50, centsValue)) * 2.6;

                Animated.spring(translateXAnim, {
                  toValue: targetTranslation,
                  friction: 6,
                  tension: 45,
                  useNativeDriver: true,
                }).start();
                
                lastUpdateRef.current = now;
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      });

      LiveAudioStream.start();
    }, 150);

    return () => {
      clearTimeout(startTimeout);
      if (silenceInterval) clearInterval(silenceInterval);
      try { LiveAudioStream.stop(); } catch (e) {}
    };
  }, [isFocused]);

  const isTuned = Math.abs(cents) < 4 && pitch > 0;
  const tuningColor = isTuned ? '#00ff88' : '#ffaa00';
  const displayColor = pitch > 0 ? tuningColor : '#444';

  return (
    <Container>
      <Title>Afinador Faixa</Title>

      <MeterContainer>
        <MeterBar>
          <CenterLine />
          
          {/* Ponteiro animado por Spring que desliza na horizontal */}
          <Animated.View
            style={{
              position: 'absolute',
              left: '50%',
              marginLeft: -4, // Alinha metade exata da largura de 8px
              width: 8,
              height: 32,
              borderRadius: 4,
              backgroundColor: pitch > 0 ? tuningColor : '#444',
              transform: [{ translateX: translateXAnim }]
            }}
          />
        </MeterBar>
      </MeterContainer>

      <NoteContainer>
        <Row>
          <Note displayColor={displayColor}>{note}</Note>
          {octave !== '' && <Octave displayColor={displayColor}>{octave}</Octave>}
        </Row>
        
        <PitchText>
          {pitch > 0 ? `${pitch.toFixed(1)} Hz` : '-- Hz'}
        </PitchText>
        
        <BadgeRow>
          <Badge pitch={pitch} tuningColor={tuningColor}>
            <CentsText pitch={pitch} tuningColor={tuningColor}>
              {pitch > 0 ? `${cents > 0 ? '+' : ''}${cents} cents` : '--'}
            </CentsText>
          </Badge>
        </BadgeRow>
        
        <ClarityText>
          Clareza: {pitch > 0 ? `${(clarity * 100).toFixed(0)}%` : '--'}
        </ClarityText>
      </NoteContainer>

      <HelpText>
        {isTuned ? 'Perfeito!' : 'Toque uma corda do violão'}
      </HelpText>
    </Container>
  );
}