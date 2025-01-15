import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native";

interface CurrencyInputProps
  extends Omit<TextInputProps, "value" | "onChangeText"> {
  onValueChange?: (value: string) => void;
  initialValue?: string;
  setStep?: (step: string) => void;
}

const CurrencyInput = ({
  onValueChange,
  initialValue = "",
  ...props
}: CurrencyInputProps) => {
  const [value, setValue] = useState<string>(initialValue);

  const formatCurrency = (input: string): string => {
    // Remove any non-digit characters
    const numbers = input.replace(/\D/g, "");

    // Convert to cents (divide by 100 to get decimal places)
    const amount = parseFloat(numbers) / 100;

    // Handle invalid or empty input
    if (isNaN(amount)) {
      return "";
    }

    // Format as currency
    const formatted = amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatted;
  };

  const handleChangeText = (text: string): void => {
    // Only process if there's input or if clearing the field
    if (text.length > 0 || text === "") {
      const rawValue = text.replace(/[^\d]/g, "");
      const formattedValue = formatCurrency(rawValue);
      setValue(formattedValue);
      onValueChange?.(rawValue);
    }
  };

  return (
    <TextInput
      className="w-full text-6xl text-gray-600"
      placeholder="R$0,00"
      autoFocus
      multiline
      numberOfLines={4}
      value={value}
      onChangeText={handleChangeText}
      keyboardType="numeric"
      returnKeyType="done"
      submitBehavior="blurAndSubmit"
      {...props}
    />
  );
};

export default CurrencyInput;
