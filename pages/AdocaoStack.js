import React, { useRef } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  Animated, SafeAreaView, StatusBar, ScrollView
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

// ---------------------- LISTA DE PETS ----------------------
const pets = [
  {
    id: "1",
    nome: "Baidu",
    idade: "2 anos",
    sexo: "Macho",
    historia: "Ele é carismático até demais.",
    foto: "https://i.pinimg.com/736x/d0/fc/ff/d0fcffda927eaaf0a369e983105d0530.jpg",
  },
  {
    id: "2",
    nome: "Jica",
    idade: "1 ano",
    sexo: "Fêmea",
    historia: "Sempre suspeita de algo.",
    foto: "https://i.pinimg.com/736x/1e/f0/f8/1ef0f8362d6b32be6264691258b12fd3.jpg",
  },
  {
    id: "3",
    nome: "Jorge",
    idade: "3 anos",
    sexo: "Macho",
    historia: "O famoso, a a folou.",
    foto: "https://i.pinimg.com/736x/87/5b/f3/875bf3f9775891dbda878db1bbd2477c.jpg",
  },
  
];

const PetCard = ({ item, navigation, index }) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 150,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: opacityAnim, transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("DetalhesPet", { pet: item })}
        activeOpacity={0.8}
      >
        <View style={styles.cardInner}>
          <Image source={{ uri: item.foto }} style={styles.foto} />
          <View style={styles.cardContent}>
            <Text style={styles.nome}>{item.nome}</Text>
            <View style={styles.cardInfo}>
              <View style={styles.infoTag}>
                <Ionicons name="time-outline" size={16} color="#64748B" />
                <Text style={styles.infoText}>{item.idade}</Text>
              </View>
              <View style={styles.infoTag}>
                <Ionicons 
                  name={item.sexo === "Macho" ? "male" : "female"} 
                  size={16} 
                  color="#64748B" 
                />
                <Text style={styles.infoText}>{item.sexo}</Text>
              </View>
            </View>
            <Text style={styles.cardHistoria} numberOfLines={2}>{item.historia}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

function ListaPetsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Encontre seu novo amigo</Text>
          <Text style={styles.subtitulo}>
            {pets.length} pets esperando por um lar
          </Text>
        </View>
        
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <PetCard item={item} navigation={navigation} index={index} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

function DetalhesPetScreen({ route, navigation }) {
  const { pet } = route.params;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.detalhesContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.detalhesHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.foto }} style={styles.fotoGrande} />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.nomeContainer}>
            <Text style={styles.nomeGrande}>{pet.nome}</Text>
            <View style={styles.badge}>
              <Ionicons 
                name={pet.sexo === "Macho" ? "male" : "female"} 
                size={16} 
                color="#FFFFFF" 
              />
              <Text style={styles.badgeText}>{pet.sexo}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color="#64748B" />
              <Text style={styles.infoLabel}>{pet.idade}</Text>
            </View>
          </View>

          <View style={styles.historiaContainer}>
            <Text style={styles.historiaTitulo}>Sobre {pet.nome}</Text>
            <Text style={styles.historia}>{pet.historia}</Text>
          </View>

          <TouchableOpacity style={styles.botaoAdotar}>
            <Text style={styles.botaoAdotarTexto}>Tenho interesse em adotar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function AdocaoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListaPets" component={ListaPetsScreen} />
      <Stack.Screen name="DetalhesPet" component={DetalhesPetScreen} />
    </Stack.Navigator>
  );
}

// Estilos atualizados
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  detalhesContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { padding: 24, paddingBottom: 16 },
  titulo: { 
    fontSize: 32, 
    fontWeight: "700", 
    color: "#1E293B",
    letterSpacing: -0.8,
  },
  subtitulo: { 
    fontSize: 16, 
    color: "#64748B",
    marginTop: 8,
  },
  listContent: {
    padding: 24,
    paddingTop: 8,
  },
  card: { 
    marginBottom: 16, 
    borderRadius: 16, 
    backgroundColor: "#FFFFFF", 
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardInner: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  foto: { 
    width: 80, 
    height: 80, 
    borderRadius: 16,
  },
  cardContent: { 
    flex: 1, 
    marginLeft: 16 
  },
  nome: { 
    fontSize: 18, 
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  cardInfo: { 
    flexDirection: "row",
    marginBottom: 8,
  },
  infoTag: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginRight: 16 
  },
  infoText: { 
    marginLeft: 6, 
    color: "#64748B",
    fontSize: 14,
  },
  cardHistoria: { 
    color: "#64748B", 
    fontSize: 14,
    lineHeight: 20,
  },
  arrowContainer: {
    padding: 8,
  },
  detalhesHeader: {
    padding: 16,
  },
  backButton: { 
    flexDirection: "row", 
    alignItems: "center",
    padding: 8,
  },
  backText: { 
    color: "#374151",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 4,
  },
  imageContainer: { 
    alignItems: "center", 
    marginVertical: 24 
  },
  fotoGrande: { 
    width: 280, 
    height: 280, 
    borderRadius: 24,
  },
  detailsContainer: { 
    padding: 24,
    paddingTop: 0,
  },
  nomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  nomeGrande: { 
    fontSize: 28, 
    fontWeight: "700",
    color: "#1E293B",
    flex: 1,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  infoLabel: {
    marginLeft: 8,
    color: "#64748B",
    fontSize: 16,
  },
  historiaContainer: {
    marginBottom: 32,
  },
  historiaTitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  historia: { 
    fontSize: 16, 
    color: "#64748B",
    lineHeight: 24,
  },
  botaoAdotar: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoAdotarTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});