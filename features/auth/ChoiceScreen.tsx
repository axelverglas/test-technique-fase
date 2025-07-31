import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { VStack } from "../../components/ui/vstack";
import { HStack } from "../../components/ui/hstack";
import { Text } from "../../components/ui/text";
import { Button, ButtonText } from "../../components/ui/button";
import { View } from "react-native";

export default function ChoiceScreen() {
  const handleAppleSignIn = () => {
    // TODO: Implémenter la connexion Apple
    console.log("Connexion avec Apple");
  };

  const handleGoogleSignIn = () => {
    // TODO: Implémenter la connexion Google
    console.log("Connexion avec Google");
  };

  const handleEmailSignIn = () => {
    // TODO: Navigation vers l'écran de connexion email
    console.log("Connexion avec email");
  };

  return (
    <View className="flex-1 px-6 pb-8">
      {/* Contenu principal centré */}
      <VStack className="flex-1 justify-center items-center" space="xl">
        <Text className="text-3xl font-bold text-center text-typography-900">
          Bienvenue
        </Text>
        <Text className="text-lg text-center text-typography-600">
          Choisissez votre méthode de connexion
        </Text>
      </VStack>

      {/* Boutons en bas de page */}
      <VStack space="md" className="mb-6">
        {/* Bouton Email et mot de passe */}
        <Link href="/(auth)/sign-in" asChild>
          <Button
            size="xl"
            variant="outline"
            action="primary"
            className="w-full rounded-sm"
          >
            <HStack space="md" className="items-center">
              <Ionicons name="mail-outline" size={20} color="#6B7280" />
              <ButtonText className="text-typography-700">
                Email et mot de passe
              </ButtonText>
            </HStack>
          </Button>
        </Link>
      </VStack>

      {/* Texte d'inscription */}
      <Text className="text-center text-typography-600">
        Pas de compte ?{" "}
        <Link href="/(auth)/sign-up">
          <Text className="font-semibold">Inscrivez-vous</Text>
        </Link>
      </Text>
    </View>
  );
}
