import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Alert } from 'react-native';
import { Audio } from 'expo-av';

interface PermissionGateProps {
  children: React.ReactNode; // O conteúdo que será exibido se a permissão for aceita
}

export function MicrophonePermissionGate({ children }: PermissionGateProps) {
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    // Pede a permissão automaticamente se puder perguntar
    if (permissionResponse && !permissionResponse.granted && permissionResponse.canAskAgain) {
      requestPermission();
    }
  }, [permissionResponse]);

  // 1. Enquanto o sistema operacional checa o status (Tela de Carregamento)
  if (!permissionResponse) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.text}>Verificando acesso ao microfone...</Text>
      </View>
    );
  }

  // 2. Se o usuário negou permanentemente (Bloqueado nas configurações)
  if (!permissionResponse.granted && !permissionResponse.canAskAgain) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Microfone Bloqueado 🚫</Text>
        <Text style={styles.errorText}>
          O afinador precisa do microfone para ouvir seu instrumento. Ative a permissão nas configurações do sistema.
        </Text>
        <Button 
          title="Como liberar o acesso?" 
          color="#1DB954"
          onPress={() => Alert.alert(
            "Passo a Passo", 
            "1. Abra as Configurações do seu celular.\n2. Vá em Aplicativos > Seu App.\n3. Clique em Permissões.\n4. Ative o Microfone."
          )} 
        />
      </View>
    );
  }

  // 3. Se a permissão foi concedida, renderiza o resto do app normalmente
  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  text: { marginTop: 12, color: '#666', fontSize: 16 },
  errorTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  errorText: { textAlign: 'center', color: '#666', marginBottom: 24, fontSize: 16, lineHeight: 22 }
});