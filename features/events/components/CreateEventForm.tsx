import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { CreateEventSchema, CreateEvent } from "@/schema/events";
import { ImagePicker } from "./ImagePicker";

interface CreateEventFormProps {
  onSubmit: (data: CreateEvent) => void;
  isLoading?: boolean;
}

export const CreateEventForm = ({
  onSubmit,
  isLoading = false,
}: CreateEventFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateEvent>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      title: "",
      date: "",
      image: "",
      description: "",
      location: "",
      price: undefined,
    },
  });

  const handleFormSubmit = (data: CreateEvent) => {
    onSubmit(data);
    reset();
  };

  return (
    <Box>
      <VStack space="md">
        <Text className="text-xl font-bold text-center mb-4">
          Créer un nouvel événement
        </Text>

        <FormControl isInvalid={!!errors.title}>
          <FormControlLabel>
            <FormControlLabelText>Titre *</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="rounded-sm">
                <InputField
                  placeholder="Titre de l'événement"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>{errors.title?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.date}>
          <FormControlLabel>
            <FormControlLabelText>Date *</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="rounded-sm">
                <InputField
                  placeholder="YYYY-MM-DD"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>{errors.date?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.image}>
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, value } }) => (
              <ImagePicker
                value={value}
                onImageSelected={onChange}
                onImageRemoved={() => onChange("")}
              />
            )}
          />
          <FormControlError>
            <FormControlErrorText>{errors.image?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Description</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea className="rounded-sm">
                <TextareaInput
                  placeholder="Description de l'événement"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  numberOfLines={3}
                />
              </Textarea>
            )}
          />
        </FormControl>

        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Lieu</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="rounded-sm">
                <InputField
                  placeholder="Lieu de l'événement"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.price}>
          <FormControlLabel>
            <FormControlLabelText>Prix (€)</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="rounded-sm">
                <InputField
                  placeholder="0"
                  onBlur={onBlur}
                  onChangeText={(text: string) =>
                    onChange(text ? parseFloat(text) : undefined)
                  }
                  value={value?.toString() || ""}
                  keyboardType="numeric"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>{errors.price?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button
          onPress={handleSubmit(handleFormSubmit)}
          isDisabled={isLoading}
          className="mt-4 rounded-sm"
        >
          <ButtonText>
            {isLoading ? "Création..." : "Créer l'événement"}
          </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};
