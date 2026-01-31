import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchBarProps {
  onPress: () => void;
  placeholder?: string;
}

const SearchBar = ({ onPress, placeholder }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4 border-1 border-dark-400">
      <Image
        source={icons.search}
        className="size-5 tint-dark-400"
        tintColor={"#a8b5db"}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 text-white ml-3"
        value=""
        onChangeText={() => {}}
        onPress={onPress}
      />
    </View>
  );
};

export default SearchBar;
