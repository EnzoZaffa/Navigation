import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Abrigo Esperança</Text>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🐾</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.texto}>
          Somos um abrigo dedicado à adoção responsável de pets. 
          Aqui você pode conhecer nossos amiguinhos e dar um novo lar para eles.
        </Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.versao}>Versão 1.0.0</Text>
          <Text style={styles.subtexto}>Desenvolvido com cuidado</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F8FAFC",
    padding: 24 
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  logo: {
    fontSize: 36,
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: "700", 
    color: "#1E293B",
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  texto: { 
    textAlign: "center", 
    fontSize: 16, 
    color: "#64748B", 
    lineHeight: 24,
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  versao: { 
    fontSize: 16, 
    fontWeight: "600",
    color: "#334155",
    marginBottom: 4,
  },
  subtexto: {
    fontSize: 14,
    color: "#94A3B8",
  },
});