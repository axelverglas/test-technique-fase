import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

const step1Schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Prénom requis (2 caractères minimum)" }),
  lastName: z.string().min(2, { message: "Nom requis (2 caractères minimum)" }),
  username: z
    .string()
    .min(3, { message: "Pseudo requis (3 caractères minimum)" }),
});

export type Step1Data = z.infer<typeof step1Schema>;

type Props = {
  onNext: (data: Step1Data) => void;
  defaultValues?: Partial<Step1Data>;
};

export default function Step1({ onNext, defaultValues }: Props) {
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  });

  // Pré-remplir les champs si des valeurs par défaut sont fournies
  React.useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        if (value) {
          setValue(key as keyof Step1Data, value);
        }
      });
    }
  }, [defaultValues, setValue]);

  return (
    <FormControl>
      <VStack space="xl">
        <Text className="text-lg font-semibold text-center">
          Informations personnelles
        </Text>

        <VStack space="xs">
          <Text className="text-typography-500">Prénom</Text>
          <Input variant="outline" size="md" isInvalid={!!errors.firstName}>
            <InputField
              placeholder="Prénom"
              autoCapitalize="words"
              defaultValue={defaultValues?.firstName}
              onChangeText={(text: string) => setValue("firstName", text)}
            />
          </Input>
          {errors.firstName && (
            <Text className="text-red-500">{errors.firstName.message}</Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-typography-500">Nom</Text>
          <Input variant="outline" size="md" isInvalid={!!errors.lastName}>
            <InputField
              placeholder="Nom"
              autoCapitalize="words"
              defaultValue={defaultValues?.lastName}
              onChangeText={(text: string) => setValue("lastName", text)}
            />
          </Input>
          {errors.lastName && (
            <Text className="text-red-500">{errors.lastName.message}</Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-typography-500">Pseudo</Text>
          <Input variant="outline" size="md" isInvalid={!!errors.username}>
            <InputField
              placeholder="Pseudo"
              autoCapitalize="none"
              defaultValue={defaultValues?.username}
              onChangeText={(text: string) => setValue("username", text)}
            />
          </Input>
          {errors.username && (
            <Text className="text-red-500">{errors.username.message}</Text>
          )}
        </VStack>

        <Button onPress={handleSubmit(onNext)} isDisabled={isSubmitting}>
          <ButtonText>Continuer</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
