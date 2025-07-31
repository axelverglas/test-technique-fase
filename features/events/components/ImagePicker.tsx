import React, { useState } from "react";
import { Alert, Pressable } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Spinner } from "@/components/ui/spinner";
import { Camera, ImageIcon, X, Plus } from "lucide-react-native";
import { useImageUpload } from "@/hooks/useImageUpload";
import * as ImagePickerExpo from "expo-image-picker";

interface ImagePickerProps {
  value?: string;
  onImageSelected: (url: string) => void;
  onImageRemoved: () => void;
}

export const ImagePicker = ({
  value,
  onImageSelected,
  onImageRemoved,
}: ImagePickerProps) => {
  const { pickImage, takePhoto, uploadImage, isUploading } = useImageUpload();
  const [selectedImage, setSelectedImage] =
    useState<ImagePickerExpo.ImagePickerAsset | null>(null);

  const showImagePicker = () => {
    Alert.alert(
      "Sélectionner une image",
      "Choisissez une source pour votre image d'événement",
      [
        {
          text: "Galerie",
          onPress: handlePickFromGallery,
        },
        {
          text: "Appareil photo",
          onPress: handleTakePhoto,
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ]
    );
  };

  const handlePickFromGallery = async () => {
    try {
      const asset = await pickImage();
      if (asset) {
        setSelectedImage(asset);
        await handleUpload(asset);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de sélectionner l'image");
    }
  };

  const handleTakePhoto = async () => {
    try {
      const asset = await takePhoto();
      if (asset) {
        setSelectedImage(asset);
        await handleUpload(asset);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de prendre la photo");
    }
  };

  const handleUpload = async (asset: ImagePickerExpo.ImagePickerAsset) => {
    try {
      const url = await uploadImage(asset);
      onImageSelected(url);
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'uploader l'image");
      setSelectedImage(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onImageRemoved();
  };

  const imageToShow = value || selectedImage?.uri;

  return (
    <VStack space="sm">
      <Text className="font-semibold">Image de l'événement</Text>

      {imageToShow ? (
        <Box className="relative rounded-lg overflow-hidden">
          <Image
            source={{ uri: imageToShow }}
            alt="Image de l'événement"
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
          />

          {/* Overlay avec bouton supprimer */}
          <Box className="absolute inset-0 bg-black/20 items-end justify-start p-2">
            <Pressable
              onPress={handleRemoveImage}
              className="bg-red-500 p-2 rounded-full"
            >
              <Icon as={X} size="sm" color="white" />
            </Pressable>
          </Box>

          {/* Indicateur de chargement */}
          {isUploading && (
            <Box className="absolute inset-0 bg-black/50 items-center justify-center">
              <VStack space="sm" className="items-center">
                <Spinner size="large" color="white" />
                <Text className="text-white text-sm">Upload en cours...</Text>
              </VStack>
            </Box>
          )}
        </Box>
      ) : (
        <Pressable
          onPress={showImagePicker}
          className="border border-dashed border-outline-300 rounded-sm p-8 items-center justify-center bg-outline-50"
          style={{ height: 200 }}
        >
          <VStack space="md" className="items-center">
            <Box className="bg-outline-100 p-4 rounded-full">
              <Icon as={Plus} size="xl" color="gray" />
            </Box>
            <VStack space="xs" className="items-center">
              <Text className="text-base font-medium">Ajouter une image</Text>
              <Text className="text-sm text-gray-600 text-center">
                Sélectionnez depuis la galerie ou prenez une photo
              </Text>
            </VStack>
            <HStack space="md" className="mt-2">
              <HStack space="xs" className="items-center">
                <Icon as={ImageIcon} size="sm" color="gray" />
                <Text className="text-xs text-gray-600">Galerie</Text>
              </HStack>
              <HStack space="xs" className="items-center">
                <Icon as={Camera} size="sm" color="gray" />
                <Text className="text-xs text-gray-600">Photo</Text>
              </HStack>
            </HStack>
          </VStack>
        </Pressable>
      )}
    </VStack>
  );
};
