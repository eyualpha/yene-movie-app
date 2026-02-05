import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import { useFavorites } from "@/context/favorites-context";

const MovieCard = (movie: Movie) => {
  const { id, poster_path, title, vote_average, release_date } = movie;
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(id);

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(movie);
  }, [toggleFavorite, movie]);

  return (
    <View className="w-[30%] mx-2 mb-5 relative">
      <TouchableOpacity
        className="absolute right-1.5 top-1.5 z-10 rounded-full bg-black/60 p-1.5"
        onPress={handleToggleFavorite}
        activeOpacity={0.8}
      >
        <Image
          source={icons.save}
          className="size-5"
          tintColor={favorite ? "#FACC15" : "#fff"}
        />
      </TouchableOpacity>

      <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity className="w-full" activeOpacity={0.85}>
          <View className="w-full h-40 rounded-lg overflow-hidden mb-2 bg-black/30">
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
            {release_date?.split("-")[0] ?? ""} • ⭐ {vote_average}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default MovieCard;
