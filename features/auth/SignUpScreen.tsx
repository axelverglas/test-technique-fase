import React, { useState } from "react";
import { FormControl } from "../../components/ui/form-control";
import { Text } from "../../components/ui/text";
import { VStack } from "../../components/ui/vstack";
import { HStack } from "../../components/ui/hstack";
import { Progress, ProgressFilledTrack } from "../../components/ui/progress";
import { View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import Step1, { Step1Data } from "@/features/auth/components/Step1";
import Step2, { Step2Data } from "@/features/auth/components/Step2";

type Props = {
  navigation?: { navigate: (route: string) => void };
};

export default function SignUpScreen({ navigation }: Props) {
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Partial<Step2Data> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const handleStep2Submit = async (data: Step2Data) => {
    if (!step1Data) return;

    setIsLoading(true);
    setStep2Data(data); // Sauvegarder les données de l'étape 2 aussi

    const { error } = await signUp(data.email, data.password, {
      firstName: step1Data.firstName,
      lastName: step1Data.lastName,
      username: step1Data.username,
    });

    setIsLoading(false);

    if (error) {
      alert(error.message);
    } else {
      if (navigation) navigation.navigate("SignIn");
    }
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  const progressValue = (currentStep / 2) * 100;

  return (
    <View className="flex-1 p-4">
      <VStack space="lg">
        {/* Titre et barre de progression */}
        <VStack space="md">
          <HStack className="justify-between items-center">
            <Text className="text-xl font-bold">Inscription</Text>
            <Text className="text-sm text-typography-500">
              Étape {currentStep} sur 2
            </Text>
          </HStack>

          <Progress value={progressValue} size="sm" className="w-full">
            <ProgressFilledTrack />
          </Progress>
        </VStack>

        {/* Rendu conditionnel des étapes */}
        {currentStep === 1 && (
          <Step1
            onNext={handleStep1Submit}
            defaultValues={step1Data || undefined}
          />
        )}

        {currentStep === 2 && (
          <Step2
            onSubmit={handleStep2Submit}
            onBack={handleBackToStep1}
            isLoading={isLoading}
            defaultValues={step2Data || undefined}
          />
        )}
      </VStack>
    </View>
  );
}
