import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission d'accès à la galerie refusée");
    }
    return true;
  };

  const pickImage = async () => {
    try {
      await requestPermissions();

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        return result.assets[0];
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la sélection d'image:", error);
      throw error;
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission d'accès à l'appareil photo refusée");
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        return result.assets[0];
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la prise de photo:", error);
      throw error;
    }
  };

  const uploadImage = async (imageAsset: ImagePicker.ImagePickerAsset) => {
    try {
      setIsUploading(true);

      if (!imageAsset.base64) {
        throw new Error("Données d'image manquantes");
      }

      // Générer un nom de fichier unique
      const fileExt = imageAsset.uri.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from("event-images")
        .upload(fileName, decode(imageAsset.base64), {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Récupérer l'URL publique
      const {
        data: { publicUrl },
      } = supabase.storage.from("event-images").getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    pickImage,
    takePhoto,
    uploadImage,
    isUploading,
  };
};
