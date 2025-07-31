import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

const step2Schema = z
  .object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(6, { message: "6 caractères minimum" }),
    confirmPassword: z.string().min(6, { message: "Confirmation requise" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type Step2Data = z.infer<typeof step2Schema>;

type Props = {
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<Step2Data>;
};

export default function Step2({
  onSubmit,
  onBack,
  isLoading,
  defaultValues,
}: Props) {
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues,
  });

  // Pré-remplir les champs si des valeurs par défaut sont fournies
  React.useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        if (value && key !== "confirmPassword") {
          // Ne pas pré-remplir la confirmation
          setValue(key as keyof Step2Data, value);
        }
      });
    }
  }, [defaultValues, setValue]);

  return (
    <FormControl>
      <VStack space="xl">
        <Text className="text-lg font-semibold text-center">
          Compte et sécurité
        </Text>

        <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input variant="outline" size="md" isInvalid={!!errors.email}>
            <InputField
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              defaultValue={defaultValues?.email}
              onChangeText={(text: string) => setValue("email", text)}
            />
          </Input>
          {errors.email && (
            <Text className="text-error-500">{errors.email.message}</Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-typography-500">Mot de passe</Text>
          <Input variant="outline" size="md" isInvalid={!!errors.password}>
            <InputField
              placeholder="Mot de passe"
              type="password"
              onChangeText={(text: string) => setValue("password", text)}
            />
          </Input>
          {errors.password && (
            <Text className="text-error-500">{errors.password.message}</Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-typography-500">Confirmer le mot de passe</Text>
          <Input
            variant="outline"
            size="md"
            isInvalid={!!errors.confirmPassword}
          >
            <InputField
              placeholder="Confirmer le mot de passe"
              type="password"
              onChangeText={(text: string) => setValue("confirmPassword", text)}
            />
          </Input>
          {errors.confirmPassword && (
            <Text className="text-red-500">
              {errors.confirmPassword.message}
            </Text>
          )}
        </VStack>

        <VStack space="md">
          <Button
            onPress={handleSubmit(onSubmit)}
            isDisabled={isSubmitting || isLoading}
          >
            <ButtonText>Créer un compte</ButtonText>
          </Button>

          <Button
            variant="outline"
            onPress={onBack}
            isDisabled={isSubmitting || isLoading}
            className="rounded-sm"
          >
            <ButtonText>Retour</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </FormControl>
  );
}
