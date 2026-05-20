import { Linking, RefreshControl, Text, View } from "react-native";
import {
  ButtonText,
  DonwloadButton,
  GeneralContainer,
  LogoImage,
  LowerText,
  NormalText,
  SclrollContainer,
  Title,
} from "./Styles";
import MinhaFoto from "../../../assets/logoicon.png";
import { VERSION } from "../../constants/version-constant";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { VersionApi } from "../../api/VersionAPI";

export default function About() {
  const navigation = useNavigation();
  const [versionReq, setVersionReq] = useState();
  const [urlReq, setUrlReq] = useState();
  const [dateBuild, setDateBuild] = useState();
  const [refreshing, setRefreshing] = useState(true)

  const versionRequest = async () => {
    const response = await VersionApi.get("/latest");

    if (response.status === 200) {
      setVersionReq(response.data.tag_name);
      setUrlReq(response.data.assets[0].browser_download_url);
      setDateBuild(response.data.assets[0].updated_at);
    }
    setRefreshing(false)
  };

  useEffect(() => {
    versionRequest();
  }, [refreshing]);

  const openUrl = async () => {
    if (urlReq) {
      await Linking.openURL(urlReq);
    }
  };

   const handleRefresh = () => {
    setRefreshing(true);

    // Simulação de fetch
  };

  return (
    <SclrollContainer contentContainerStyle={{ 
    paddingBottom: 40, // Ajuste o valor conforme a necessidade
    
    }}
    refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor="#6200ee"
                colors={["#6200ee", "#03dac6"]}
              />
            }>
      {!refreshing &&
              <GeneralContainer>
                  <Title>Sobre</Title>
        <LogoImage source={MinhaFoto} />
        <NormalText>
                      Cordeo é um aplicativo desenvolvido para auxiliar na afinação de instrumentos musicais, com foco principal em violão. O projeto foi criado de forma independente, sem fins lucrativos, com o objetivo de oferecer uma experiência simples, prática e acessível para músicos de todos os níveis.
                      Criado por Igor Barbosa

        </NormalText>
        <LowerText>A sua versão é {VERSION}</LowerText>
        {/* {versionReq && (
          <>
            <LowerText>
              A versão mais recente disponível é{" "}
              {versionReq} de {dateBuild && (new Intl.DateTimeFormat('pt-BR').format(new Date(dateBuild)))}
            </LowerText>
            <DonwloadButton  >
              <ButtonText onPress={openUrl}>Baixar</ButtonText>
            </DonwloadButton>
          </>
        )} */}
       
      </GeneralContainer>
      }
    </SclrollContainer>
  );
}