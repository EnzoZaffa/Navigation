import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export default function CadastroForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailValido, setEmailValido] = useState(null);
  const [celular, setCelular] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  const verificarEmail = () => {
    setEmailValido(null);
    setTimeout(() => {
      if (email.includes("@") && email.includes(".")) setEmailValido(true);
      else setEmailValido(false);
    }, 800);
  };

  const formularioValido =
    nome && emailValido && celular.length === 15 && nascimento.length === 10 && senha.length >= 6 && senha === confSenha;

  const handleSubmit = () => Alert.alert("Sucesso 🎉", "Cadastro enviado com sucesso!");

  return (
    <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.formTitulo}>Cadastro para Adoção</Text>
          <Text style={styles.formSubtitulo}>Preencha os dados para iniciar o processo</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite seu nome completo" 
            value={nome} 
            onChangeText={setNome} 
            placeholderTextColor="#94A3B8" 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput 
            style={[
              styles.input, 
              emailValido === false && styles.inputError,
              emailValido === true && styles.inputSuccess
            ]} 
            placeholder="seu@email.com" 
            value={email} 
            onChangeText={setEmail} 
            onBlur={verificarEmail} 
            placeholderTextColor="#94A3B8" 
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Celular</Text>
          <TextInputMask 
            style={styles.input} 
            type={"cel-phone"} 
            options={{ maskType: "BRL", withDDD: true, dddMask: "(99) " }} 
            placeholder="(00) 00000-0000" 
            value={celular} 
            onChangeText={setCelular} 
            placeholderTextColor="#94A3B8" 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInputMask 
            style={styles.input} 
            type={"datetime"} 
            options={{ format: "DD/MM/YYYY" }} 
            placeholder="DD/MM/AAAA" 
            value={nascimento} 
            onChangeText={setNascimento} 
            placeholderTextColor="#94A3B8" 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Mínimo 6 caracteres" 
            secureTextEntry 
            value={senha} 
            onChangeText={setSenha} 
            placeholderTextColor="#94A3B8" 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput 
            style={[
              styles.input,
              confSenha && senha !== confSenha && styles.inputError
            ]} 
            placeholder="Digite novamente sua senha" 
            secureTextEntry 
            value={confSenha} 
            onChangeText={setConfSenha} 
            placeholderTextColor="#94A3B8" 
          />
        </View>

        <TouchableOpacity 
          style={[
            styles.botaoSubmit, 
            formularioValido && styles.botaoSubmitAtivo
          ]} 
          disabled={!formularioValido} 
          onPress={handleSubmit}
        >
          <Text style={styles.textoSubmit}>
            {formularioValido ? "Finalizar Cadastro" : "Preencha todos os campos"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContainer: { padding: 24, paddingTop: 40 },
  header: { marginBottom: 32 },
  formTitulo: { 
    fontSize: 28, 
    fontWeight: "700", 
    color: "#1E293B", 
    textAlign: "center",
    letterSpacing: -0.5,
  },
  formSubtitulo: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: { 
    backgroundColor: "#FFFFFF", 
    color: "#1E293B", 
    padding: 16, 
    borderRadius: 12, 
    borderWidth: 1,
    borderColor: "#E2E8F0",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#DC2626",
  },
  inputSuccess: {
    borderColor: "#059669",
  },
  botaoSubmit: { 
    backgroundColor: "#CBD5E1", 
    padding: 18, 
    borderRadius: 12,
    marginTop: 8,
  },
  botaoSubmitAtivo: { 
    backgroundColor: "#2563EB",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  textoSubmit: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "600",
    textAlign: "center",
  },
});