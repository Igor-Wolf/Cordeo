import styled from 'styled-components/native';

// Interfaces para as propriedades dinâmicas
interface ColorProps {
  displayColor: string;
}

interface TunedProps {
  pitch: number;
  tuningColor: string;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0d0d0c;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 50px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.5;
`;

export const GaugeContainer = styled.View`
  width: 300px;
  height: 170px;
  justify-content: center;
  align-items: center;
`;

export const NoteContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const Note = styled.Text<ColorProps>`
  font-size: 110px;
  font-weight: 900;
  line-height: 115px;
  color: ${({ displayColor }) => displayColor};
`;

export const Octave = styled.Text<ColorProps>`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
  margin-left: 2px;
  color: ${({ displayColor }) => displayColor};
`;

export const PitchText = styled.Text`
  font-size: 20px;
  color: #666;
  font-weight: 500;
  margin-top: 5px;
  letter-spacing: 1px;
`;

export const Badge = styled.View<TunedProps>`
  padding-horizontal: 18px;
  padding-vertical: 6px;
  border-radius: 20px;
  margin-top: 15px;
  background-color: ${({ pitch, tuningColor }) => 
    pitch > 0 ? `${tuningColor}15` : '#222'};
`;

export const CentsText = styled.Text<TunedProps>`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: ${({ pitch, tuningColor }) => 
    pitch > 0 ? tuningColor : '#555'};
`;

export const HelpText = styled.Text`
  color: #444;
  font-size: 16px;
  font-weight: 600;
`;