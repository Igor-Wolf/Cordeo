import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import LiveAudioStream from 'react-native-live-audio-stream';
import { PitchDetector } from 'pitchy';
import { Buffer } from 'buffer';
import Svg, { Path, Line, Circle, G } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';
import { Badge, CentsText, Container, GaugeContainer, HelpText, Note, NoteContainer, Octave, PitchText, Row, Title } from './Styles';



global.Buffer = Buffer;

const SAMPLE_RATE = 44100;
const ANALYSIS_SIZE = 4096; 
const SILENCE_TIMEOUT = 1200;

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const AnimatedG = Animated.createAnimatedComponent(G);

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

export default function Home() {
  const [pitch, setPitch] = useState(0);
  const [note, setNote] = useState('-');
  const [octave, setOctave] = useState('');
  const [cents, setCents] = useState(0);

  const isFocused = useIsFocused();

  const detectorRef = useRef(PitchDetector.forFloat32Array(ANALYSIS_SIZE));
  const audioSamplesRef = useRef<number[]>([]);
  const pitchHistoryRef = useRef<number[]>([]);
  const smoothPitchRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const lastValidPitchTimeRef = useRef(0);

  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let startTimeout: NodeJS.Timeout;
    let silenceInterval: NodeJS.Timeout;

    if (!isFocused) {
      try { LiveAudioStream.stop(); } catch (e) {}
      setPitch(0);
      setNote('-');
      setOctave('');
      setCents(0);
      smoothPitchRef.current = 0;
      pitchHistoryRef.current = [];
      
      Animated.timing(rotationAnim, {
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
          smoothPitchRef.current = 0;
          pitchHistoryRef.current = [];
          
          Animated.timing(rotationAnim, {
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

              if (smoothPitchRef.current === 0) {
                smoothPitchRef.current = stablePitch;
              } else {
                smoothPitchRef.current = smoothPitchRef.current * 0.7 + stablePitch * 0.3;
              }

              const smoothPitch = smoothPitchRef.current;
              const now = Date.now();

              if (now - lastUpdateRef.current > 60) {
                const { noteName, octave: currentOctave } = frequencyToNoteAndOctave(smoothPitch);
                const midi = Math.round(12 * Math.log2(smoothPitch / 440) + 69);
                const idealFreq = 440 * Math.pow(2, (midi - 69) / 12);
                const centsValue = centsOff(smoothPitch, idealFreq);

                setPitch(smoothPitch);
                setNote(noteName);
                setOctave(currentOctave);
                setCents(centsValue);

                const targetRotation = Math.max(-50, Math.min(50, centsValue)) * 1.2;

                Animated.spring(rotationAnim, {
                  toValue: targetRotation,
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
      <Title>Afinador Ponteiro</Title>

      <GaugeContainer>
        <Svg width="300" height="170" viewBox="0 0 300 170">
          <Path
            d="M 40 150 A 110 110 0 0 1 260 150"
            fill="none"
            stroke="#222"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          <Path
            d="M 135 42 A 110 110 0 0 1 165 42"
            fill="none"
            stroke="#00ff88"
            strokeWidth="4"
          />

          <Line x1="150" y1="40" x2="150" y2="25" stroke="#fff" strokeWidth="2.5" />
          <Line x1="40" y1="150" x2="52" y2="143" stroke="#444" strokeWidth="2" />
          <Line x1="260" y1="150" x2="248" y2="143" stroke="#444" strokeWidth="2" />
          
          <AnimatedG
            style={{
              transform: [
                { translateX: 150 },
                { translateY: 150 },
                { rotate: rotationAnim.interpolate({ inputRange: [-90, 90], outputRange: ['-90deg', '90deg'] }) },
                { translateX: -150 },
                { translateY: -150 }
              ]
            }}
          >
            <Line
              x1="150"
              y1="150"
              x2="150"
              y2="38"
              stroke={pitch > 0 ? tuningColor : '#444'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </AnimatedG>

          <Circle cx="150" cy="150" r="10" fill="#1c1c1a" stroke={pitch > 0 ? tuningColor : '#444'} strokeWidth="3" />
          <Circle cx="150" cy="150" r="3" fill="#fff" />
        </Svg>
      </GaugeContainer>

      <NoteContainer>
        <Row>
          <Note displayColor={displayColor}>{note}</Note>
          {octave !== '' && <Octave displayColor={displayColor}>{octave}</Octave>}
        </Row>
        
        <PitchText>
          {pitch > 0 ? `${pitch.toFixed(1)} Hz` : '-- Hz'}
        </PitchText>
        
        <Badge pitch={pitch} tuningColor={tuningColor}>
          <CentsText pitch={pitch} tuningColor={tuningColor}>
            {pitch > 0 ? `${cents > 0 ? '+' : ''}${cents} cents` : '--'}
          </CentsText>
        </Badge>
      </NoteContainer>

      <HelpText>
        {isTuned ? 'Perfeito!' : 'Toque uma corda do violão'}
      </HelpText>
    </Container>
  );
}