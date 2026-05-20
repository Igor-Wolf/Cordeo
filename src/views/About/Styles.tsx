import styled from "styled-components";

export const SclrollContainer = styled.ScrollView`
  flex: 1;
  background-color: black;
  height: 100%;
  padding-bottom: 120px;
`;

export const GeneralContainer = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 5px;
  padding-top:50px;
`;

export const NormalText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
`;

export const LogoImage = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 75px;
  border-width: 2px;
  border-color: #00ff88;
  margin-bottom: 20px;
  margin-top: 20px;
  padding:10px;
`;

export const LowerText = styled.Text`
  color: gray;
  font-weight: 600;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
  padding: 10px;
  text-align: center;
  font-weight: 600;
`;

export const DonwloadButton = styled.Pressable`
  background-color: #00ff88;
  border-radius: 10px;
  margin-top: 20px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.5;
`;