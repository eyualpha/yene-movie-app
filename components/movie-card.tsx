import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%] mx-2 mb-5">
        <View className="w-full h-40 rounded-lg overflow-hidden mb-2">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
            }}
            className="w-full h-full"
          />
        </View>
        <Text className="text-white text-base font-medium" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-gray-400 text-sm">
          {release_date?.split("-")[0]} • ⭐ {vote_average}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
