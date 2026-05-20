import React, { useState, useEffect } from "react";
import { Chord } from "tonal";

import * as S from "./Styles";
import Acordes from "../../components/Acordes";

const ROOT_NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const CHORD_TYPES = [
  { suffix: "Maj", name: "Maior" },
  { suffix: "m", name: "Menor" },
  { suffix: "7", name: "Com Sétima" },
  { suffix: "m7", name: "Menor com Sétima" },
  { suffix: "Maj7", name: "Maior com Sétima" },
  { suffix: "dim", name: "Diminuto" },
  { suffix: "sus4", name: "Suspenso 4" },
  { suffix: "9", name: "Com Nona" },
];

export default function Dictionary() {
  const [selectedRoot, setSelectedRoot] = useState("C");
  const [selectedType, setSelectedType] = useState("Maj");

  const [chordData, setChordData] = useState<{
    name: string;
    notes: string[];
    intervals: string[];
  } | null>(null);

  useEffect(() => {
    // Busca os dados estruturados combinando a nota fundamental e o sufixo
    const chordToken = Chord.get(`${selectedRoot}${selectedType}`);

    if (!chordToken.empty) {
      setChordData({
        name: chordToken.name,
        notes: chordToken.notes,
        intervals: chordToken.intervals,
      });
    }
  }, [selectedRoot, selectedType]);

  return (
    <S.Container>
      <S.Title>Dicionário</S.Title>

      {/* Seletor de Notas Fundamentais (C, D, E...) */}
      <S.SelectorContainer>
        <S.Label>Nota Fundamental</S.Label>
        <S.HorizontalScroll>
          {ROOT_NOTES.map((note) => (
            <S.SelectionButton
              key={note}
              isSelected={selectedRoot === note}
              onPress={() => setSelectedRoot(note)}
            >
              <S.ButtonText isSelected={selectedRoot === note}>
                {note}
              </S.ButtonText>
            </S.SelectionButton>
          ))}
        </S.HorizontalScroll>
      </S.SelectorContainer>

      {/* Seletor de Tipo de Acorde (Maior, Menor...) */}
      <S.SelectorContainer>
        <S.Label>Tipo do Acorde</S.Label>
        <S.HorizontalScroll>
          {CHORD_TYPES.map((type) => (
            <S.SelectionButton
              key={type.suffix}
              isSelected={selectedType === type.suffix}
              onPress={() => setSelectedType(type.suffix)}
            >
              <S.ButtonText isSelected={selectedType === type.suffix}>
                {type.suffix}
              </S.ButtonText>
            </S.SelectionButton>
          ))}
        </S.HorizontalScroll>
      </S.SelectorContainer>

      {/* Painel Exibidor do Acorde Selecionado */}
      {chordData && (
        <S.ChordDisplayCard>
          <S.ChordName>
            {selectedRoot === "C" && selectedType === "Maj"
              ? "C"
              : `${selectedRoot}${selectedType}`}
          </S.ChordName>

          <S.ChordFullName>{chordData.name}</S.ChordFullName>

          {/* Local reservado para a futura inserção do bracinho em SVG */}
          <S.GraphicPlaceholder>
            {/* Substitua o antigo GraphicPlaceholder por isso: */}
            <S.GraphicPlaceholder style={{ borderStyle: "solid" }}>
              <Acordes chordKey={`${selectedRoot}${selectedType}`} />
            </S.GraphicPlaceholder>
          </S.GraphicPlaceholder>

          <S.InfoRow>
            <S.InfoLabel>Notas</S.InfoLabel>
            <S.InfoValue>{chordData.notes.join(" - ")}</S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>Intervalos</S.InfoLabel>
            <S.InfoValue>{chordData.intervals.join(" - ")}</S.InfoValue>
          </S.InfoRow>
        </S.ChordDisplayCard>
      )}
    </S.Container>
  );
}
