import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Circle, Rect, Text as SvgText } from 'react-native-svg';
import { getGuitarVariations, ChordVariation } from './actions'; 

interface ChordChartProps {
  chordKey: string;
}

export default function Acordes({ chordKey }: ChordChartProps) {
  const variations = getGuitarVariations(chordKey);

  if (variations.length === 0) {
    return (
      <Svg width="200" height="240" viewBox="0 0 200 240">
        <SvgText x="100" y="120" fill="#555" fontSize="14" textAnchor="middle">
          Posição indisponível
        </SvgText>
      </Svg>
    );
  }

  const startX = 35;   
  const endX = 165;    
  const stringSpacing = 26; 
  const startY = 40;   
  const fretSpacing = 42;   

  const renderChordDiagram = (chord: ChordVariation, index: number) => {
    const isNut = chord.fretStart === 1;

    return (
      <View key={index} style={styles.diagramContainer}>
        <Text style={styles.variationLabel}>Forma {index + 1}</Text>

        <Svg width="220" height="250" viewBox="0 0 220 250">
          {/* 1. Pestana do topo */}
          <Line x1={startX} y1={startY} x2={endX} y2={startY} stroke="#fff" strokeWidth={isNut ? "5" : "2"} />

          {/* Número da casa ao lado */}
          {!isNut && (
            <SvgText x={startX - 18} y={startY + (fretSpacing / 2) + 4} fill="#00ff88" fontSize="13" fontWeight="bold" textAnchor="middle">
              {chord.fretStart}fr
            </SvgText>
          )}

          {/* 2. Casas Horizontais */}
          {[1, 2, 3, 4, 5].map((fretIndex) => {
            const y = startY + fretIndex * fretSpacing;
            return <Line key={fretIndex} x1={startX} y1={y} x2={endX} y2={y} stroke="#444" strokeWidth="2" />;
          })}

          {/* 3. Cordas Verticais */}
          {[0, 1, 2, 3, 4, 5].map((stringIndex) => {
            const x = startX + stringIndex * stringSpacing;
            return <Line key={stringIndex} x1={x} y1={startY} x2={x} y2={startY + 5 * fretSpacing} stroke="#555" strokeWidth="2" />;
          })}

          {/* --- DESENHO DA PESTANA (BARRE) --- */}
          {chord.barre && (() => {
            const barreFret = chord.barre.fret;
            const xStart = startX + chord.barre.startString * stringSpacing;
            const xEnd = startX + chord.barre.endString * stringSpacing;
            const cy = startY + (barreFret - 0.5) * fretSpacing;
            
            return (
              <Rect 
                x={xStart - 11} 
                y={cy - 11} 
                width={(xEnd - xStart) + 22} 
                height={22} 
                rx={11} // Deixa as pontas arredondadas como os outros dedos
                fill="#00ff88" 
              />
            );
          })()}

          {/* 4. Marcações de Dedos Individuais */}
          {chord.frets.map((fret, stringIndex) => {
            const x = startX + stringIndex * stringSpacing;

            if (fret === -1) {
              return (
                <SvgText key={stringIndex} x={x} y={startY - 12} fill="#ffaa00" fontSize="16" fontWeight="bold" textAnchor="middle">
                  X
                </SvgText>
              );
            }

            if (fret === 0) {
              return (
                <Circle key={stringIndex} cx={x} cy={startY - 14} r="5" fill="none" stroke="#00ff88" strokeWidth="2" />
              );
            }

            if (fret > 0) {
              const cy = startY + (fret - 0.5) * fretSpacing;
              const fingerNumber = chord.fingers[stringIndex];

              // Se este dedo já está coberto pelo desenho da barra da pestana, pula o círculo individual
              if (chord.barre && chord.barre.fret === fret && stringIndex >= chord.barre.startString && stringIndex <= chord.barre.endString) {
                // Apenas renderiza o número do dedo por cima da barra se for a primeira corda da pestana
                if (stringIndex === chord.barre.startString && fingerNumber > 0) {
                  return (
                    <SvgText key={stringIndex} x={x} y={cy + 4} fill="#0d0d0c" fontSize="12" fontWeight="bold" textAnchor="middle">
                      {fingerNumber}
                    </SvgText>
                  );
                }
                return null;
              }

              return (
                <React.Fragment key={stringIndex}>
                  <Circle cx={x} cy={cy} r="11" fill="#00ff88" />
                  {fingerNumber > 0 && (
                    <SvgText x={x} y={cy + 4} fill="#0d0d0c" fontSize="12" fontWeight="bold" textAnchor="middle">
                      {fingerNumber}
                    </SvgText>
                  )}
                </React.Fragment>
              );
            }

            return null;
          })}
        </Svg>
      </View>
    );
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {variations.map((chord, index) => renderChordDiagram(chord, index))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 5, alignItems: 'center' },
  diagramContainer: { alignItems: 'center', marginRight: 10 },
  variationLabel: { color: '#888', fontSize: 12, fontWeight: '600', marginBottom: 4 },
});