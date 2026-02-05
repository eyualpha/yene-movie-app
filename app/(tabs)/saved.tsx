import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "@/components/movie-card";
import { useFavorites } from "@/context/favorites-context";
import { images } from "@/constants/images";

const SavedMovies = () => {
  const { favorites, ready } = useFavorites();

  if (!ready) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full z-0 absolute" />

      <View className=" px-4 pt-14">
        <Text className="text-white text-2xl font-bold mb-3">Saved Movies</Text>
        <Text className="text-gray-300 mb-4">
          Tap the bookmark icon on any movie to add or remove it from this list.
        </Text>

        {favorites.length === 0 ? (
          <Text className="text-gray-300">You have no saved movies yet.</Text>
        ) : (
          <FlatList
            data={favorites}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => <MovieCard {...item} />}
          />
        )}
      </View>
    </View>
  );
};

export default SavedMovies;
