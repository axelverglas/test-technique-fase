import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

export const ProfileScreen = () => {
  const { user, profile, isLoadingProfile } = useUser();
  const { signOut } = useAuth();

  if (isLoadingProfile) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Text>Chargement du profil...</Text>
      </Box>
    );
  }

  return (
    <Box className="flex-1 p-6">
      <VStack space="lg">
        <Text size="2xl" className="font-bold">
          Profil
        </Text>

        <VStack space="md">
          <VStack space="xs">
            <Text size="sm">Email</Text>
            <Text>{user?.email}</Text>
          </VStack>

          <VStack space="xs">
            <Text size="sm">Nom</Text>
            <Text>{profile?.name || "Non défini"}</Text>
          </VStack>

          <VStack space="xs">
            <Text size="sm">Pseudo</Text>
            <Text>{profile?.username || "Non défini"}</Text>
          </VStack>

          {profile?.about && (
            <VStack space="xs">
              <Text size="sm">À propos</Text>
              <Text>{profile.about}</Text>
            </VStack>
          )}

          <VStack space="xs">
            <Text size="sm">Dernière connexion</Text>
            <Text>
              {new Date(user?.last_sign_in_at || "").toLocaleString("fr-FR")}
            </Text>
          </VStack>
        </VStack>

        <Button onPress={signOut} className="bg-error-500 rounded-sm">
          <ButtonText>Déconnexion</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};
