import { View, Image, TextInput, Pressable } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onPressIn?: () => void;
  editable?: boolean;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChangeText,
  onPressIn,
  editable = true,
  placeholder,
}: SearchBarProps) => {
  const Container = onPressIn && !editable ? Pressable : View;

  return (
    <Container
      className="flex-row items-center bg-dark-200 rounded-full px-5 py-2 border border-1 border-dark-100"
      onPressIn={onPressIn}
    >
      <Image
        source={icons.search}
        className="size-5 tint-dark-400"
        tintColor={"#a8b5db"}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 text-white ml-3"
        value={value}
        onChangeText={onChangeText}
        onPressIn={onPressIn}
        editable={editable}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </Container>
  );
};

export default SearchBar;
