import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputField } from "../../components/ui/input";
import { Button, ButtonText } from "../../components/ui/button";
import { FormControl } from "../../components/ui/form-control";
import { Text } from "../../components/ui/text";
import { VStack } from "../../components/ui/vstack";
import { useAuth } from "../../hooks/useAuth";

const schema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "6 caractères minimum" }),
});

type SignInForm = z.infer<typeof schema>;

type Props = {
  navigation?: { navigate: (route: string) => void };
};

export default function SignInScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignInForm) => {
    const { error } = await signIn(data.email, data.password);
    if (error) {
      alert(error.message);
    } else {
      // Pas besoin de navigation manuelle, expo-router s'en charge
      console.log("Connexion réussie !");
    }
  };

  return (
    <FormControl className="p-4">
      <VStack space="xl">
        <Text className="text-xl font-bold">Connexion</Text>

        <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input variant="outline" size="md" isInvalid={!!errors.email}>
            <InputField
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
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

        <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
          <ButtonText>Se connecter</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
