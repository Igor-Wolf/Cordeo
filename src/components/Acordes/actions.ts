export interface ChordPosition {
  frets: number[];
  fingers: number[];
}

export interface ChordVariation {
  fretStart: number;
  frets: number[];
  fingers: number[];
  barre?: {
    fret: number;
    startString: number;
    endString: number;
  };
}

export const chordPositions: Record<string, ChordPosition> = {
  // === ACORDES MAIORES (Maj) ===
  "CMaj": { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
  "AMaj": { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
  "GMaj": { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
  "EMaj": { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
  "FMaj": { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1] }, 
  "DMaj": { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },

  // === ACORDES MENORES (m) ===
  "Cm":   { frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1] },
  "Am":   { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
  "Gm":   { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1] },
  "Em":   { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  "Fm":   { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1] }, 
  "Dm":   { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
  
  // === ACORDES COM SÉTIMA DOMINANTE (7) ===
  "C7":   { frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0] },
  "A7":   { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 1, 0, 2, 0] },
  "G7":   { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] },
  "E7":   { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
  "F7":   { frets: [1, 3, 1, 2, 1, 1], fingers: [1, 3, 1, 2, 1, 1] }, 
  "D7":   { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 1, 2, 3] },

  // === ACORDES MENORES COM SÉTIMA (m7) ===
  "Cm7":  { frets: [-1, 3, 5, 3, 4, 3], fingers: [0, 1, 3, 1, 2, 1] },
  "Am7":  { frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0] },
  "Gm7":  { frets: [3, 5, 3, 3, 3, 3], fingers: [1, 3, 1, 1, 1, 1] },
  "Em7":  { frets: [0, 2, 0, 0, 0, 0], fingers: [0, 1, 0, 0, 0, 0] },
  "Fm7":  { frets: [1, 3, 1, 1, 1, 1], fingers: [1, 3, 1, 1, 1, 1] }, 
  "Dm7":  { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1] },

  // === ACORDES MAIORES COM SÉTIMA MAIOR (Maj7) ===
  "CMaj7": { frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0] },
  "AMaj7": { frets: [-1, 0, 2, 1, 2, 0], fingers: [0, 0, 2, 1, 3, 0] },
  "GMaj7": { frets: [3, 2, 0, 0, 0, 2], fingers: [2, 1, 0, 0, 0, 3] },
  "EMaj7": { frets: [0, 2, 1, 1, 0, 0], fingers: [0, 3, 1, 2, 0, 0] },
  "FMaj7": { frets: [1, 3, 2, 2, 1, 1], fingers: [1, 4, 2, 3, 1, 1] }, 
  "DMaj7": { frets: [-1, -1, 0, 2, 2, 2], fingers: [0, 0, 0, 1, 1, 1] },

  // === ACORDES DIMINUTOS (dim) ===
  "Cdim":  { frets: [-1, -1, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4] },
  "Adim":  { frets: [-1, 0, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4] },
  "Gdim":  { frets: [-1, -1, 5, 6, 5, 6], fingers: [0, 0, 1, 3, 2, 4] },
  "Edim":  { frets: [-1, -1, 2, 3, 2, 3], fingers: [0, 0, 1, 3, 2, 4] },
  "Fdim":  { frets: [-1, -1, 3, 4, 3, 4], fingers: [0, 0, 1, 3, 2, 4] }, 
  "Ddim":  { frets: [-1, -1, 0, 1, 0, 1], fingers: [0, 0, 0, 1, 0, 2] },

  // === ACORDES COM SUSPENSOS (sus4) ===
  "Csus4": { frets: [-1, 3, 3, 0, 1, 1], fingers: [0, 3, 4, 0, 1, 1] },
  "Asus4": { frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 4, 0] },
  "Gsus4": { frets: [3, 3, 0, 0, 1, 3], fingers: [2, 3, 0, 0, 1, 4] },
  "Esus4": { frets: [0, 2, 2, 2, 0, 0], fingers: [0, 2, 3, 4, 0, 0] },
  "Fsus4": { frets: [1, 3, 3, 3, 1, 1], fingers: [1, 3, 4, 2, 1, 1] },
  "Dsus4": { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4] },

  // === ACORDES COM NONA (9) ===
  "C9":   { frets: [-1, 3, 2, 3, 3, -1], fingers: [0, 2, 1, 3, 4, 0] },
  "A9":   { frets: [-1, 0, 2, 4, 2, 3], fingers: [0, 0, 1, 3, 1, 2] },
  "G9":   { frets: [3, -1, 3, 2, 0, 1], fingers: [3, 0, 4, 2, 0, 1] }, 
  "E9":   { frets: [0, 2, 0, 1, 0, 2], fingers: [0, 2, 0, 1, 0, 3] },
  "F9":   { frets: [1, 3, 1, 2, 1, 3], fingers: [1, 3, 1, 2, 1, 4] }, 
  "D9":   { frets: [-1, -1, 0, 2, 1, 0], fingers: [0, 0, 0, 2, 1, 0] },
};

const CHROMATIC_SCALE = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const BASE_SHAPES = ["C", "A", "G", "E", "D", "F"];

export function getGuitarVariations(chordKey: string): ChordVariation[] {
  // Regex atualizada incluindo o "sus4" na listagem de tipologias aceitas
  const match = chordKey.match(/^([A-G]#?)(Maj|m|7|m7|Maj7|dim|sus4|9)$/);
  if (!match) return [];

  const [_, targetRoot, targetType] = match;
  const targetIndex = CHROMATIC_SCALE.indexOf(targetRoot);
  if (targetIndex === -1) return [];

  const variations: ChordVariation[] = [];
  const MAX_FRET = 14; 

  for (const baseLetter of BASE_SHAPES) {
    const baseChord = chordPositions[`${baseLetter}${targetType}`];
    if (!baseChord) continue;

    const baseIndex = CHROMATIC_SCALE.indexOf(baseLetter);
    const shiftBase = (targetIndex - baseIndex + 12) % 12;

    for (let shift = shiftBase; shift <= MAX_FRET; shift += 12) {
      
      const absoluteFrets = baseChord.frets.map(fret => {
        if (fret === -1) return -1;
        return fret === 0 ? (shift === 0 ? 0 : shift) : fret + shift;
      });

      const pressedFrets = absoluteFrets.filter(f => f > 0);
      if (pressedFrets.length === 0) continue;
      
      const minAbsoluteFret = Math.min(...pressedFrets);
      const fretStart = absoluteFrets.includes(0) ? 1 : minAbsoluteFret;

      // Se o shape estourar visualmente o bloco de 5 casas do SVG, ignora para não deformar o desenho
      const maxAbsoluteFret = Math.max(...absoluteFrets);
      if (fretStart > 1 && (maxAbsoluteFret - fretStart + 1) > 5) continue;

      const normalizedFrets = absoluteFrets.map(fret => {
        if (fret <= 0) return fret;
        return fret - fretStart + 1;
      });

      // Lógica anatômica inteligente de dedos
      const normalizedFingers = baseChord.fingers.map((finger, idx) => {
        // Se a corda original era solta (0) e foi transposta (shift > 0), ela ganha a pestana (Dedo 1)
        if (baseChord.frets[idx] === 0 && shift > 0) return 1;
        
        // CORREÇÃO DOS SUSTENIDOS: Se a corda já tinha um dedo apertando e mudou de casa devido ao shift,
        // nós mantemos o dedo original em vez de forçar o dedo 1 por cima de tudo
        return finger;
      });

      // Detector e Montador de Pestanas (Barre)
      let barre: ChordVariation["barre"] = undefined;
      if (shift > 0) {
        const barreTargetFret = normalizedFrets[absoluteFrets.indexOf(shift)];
        const barreStrings = normalizedFrets
          .map((fret, idx) => (fret === barreTargetFret && normalizedFingers[idx] === 1 ? idx : -1))
          .filter(idx => idx !== -1);

        if (barreStrings.length >= 2) {
          barre = {
            fret: barreTargetFret,
            startString: barreStrings[0],
            endString: barreStrings[barreStrings.length - 1],
          };
        }
      }

      variations.push({ fretStart, frets: normalizedFrets, fingers: normalizedFingers, barre });
    }
  }

  // Ordena as variações da casa 1 em direção ao final do braço e remove duplicatas geométricas
  return variations
    .filter((v, i, self) => self.findIndex(t => t.fretStart === v.fretStart && t.frets.toString() === v.frets.toString()) === i)
    .sort((a, b) => a.fretStart - b.fretStart);
}