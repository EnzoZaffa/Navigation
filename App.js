import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import AdocaoStack from "./pages/AdocaoStack";
import CadastroForm from "./pages/CadastroForm";
import SobreScreen from "./pages/SobreScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            if (route.name === "Adoção") iconName = focused ? "paw" : "paw-outline";
            else if (route.name === "Cadastrar") iconName = focused ? "person-add" : "person-add-outline";
            else iconName = focused ? "information-circle" : "information-circle-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2563EB",
          tabBarInactiveTintColor: "#64748B",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E2E8F0",
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        })}
      >
        <Tab.Screen name="Adoção" component={AdocaoStack} />
        <Tab.Screen name="Cadastrar" component={CadastroForm} />
        <Tab.Screen name="Sobre" component={SobreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}