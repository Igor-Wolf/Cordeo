import styled from 'styled-components/native';

interface ButtonProps {
  isSelected: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0d0d0c;
  padding-top:50px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.5;
  text-align: center;
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  color: #888;
  font-size: 14px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

export const SelectorContainer = styled.View`
  margin-bottom: 20px;
`;

export const HorizontalScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 16 }
})`
  flex-grow: 0;
`;

export const SelectionButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ isSelected }) => (isSelected ? '#00ff88' : '#1c1c1a')};
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const ButtonText = styled.Text<ButtonProps>`
  color: ${({ isSelected }) => (isSelected ? '#0d0d0c' : '#fff')};
  font-size: 16px;
  font-weight: 700;
`;

/* --- Área do Acorde Selecionado --- */

export const ChordDisplayCard = styled.View`
  flex: 1;
  background-color: #121211;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 30px;
  align-items: center;
`;

export const ChordName = styled.Text`
  color: #00ff88;
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 5px;
`;

export const ChordFullName = styled.Text`
  color: #aaa;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 25px;
  text-align: center;
`;

/* --- Espaço Reservado para o Gráfico (SVG) --- */

export const GraphicPlaceholder = styled.View`
  width: 220px;
  height: 300px;
  background-color: #1c1c1a;
  border-radius: 15px;
  border-width: 2px;
  border-color: #222;
  border-style: dashed;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const PlaceholderText = styled.Text`
  color: #555;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  padding-horizontal: 20px;
`;

/* --- Detalhes Teóricos --- */

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #1c1c1a;
  padding-bottom: 12px;
`;

export const InfoLabel = styled.Text`
  color: #666;
  font-size: 15px;
  font-weight: 600;
`;

export const InfoValue = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
`;