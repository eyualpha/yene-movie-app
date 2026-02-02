import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [query, setQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query }), false);

  // Handle debounced searching
  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length === 0) {
      reset();
      return;
    }

    const timeoutId = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, refetch, reset]);

  // Track search analytics ONLY when results exist
  useEffect(() => {
    if (!query.trim()) return;
    if (!movies || movies.length === 0) return;

    updateSearchCount(query, movies[0]);
  }, [movies]);

  return (
    <View className="flex-1 bg-primary px-4 pt-14">
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a movie"
      />

      <Text className="text-white mt-2">
        {query ? `Results for "${query}"` : ""}
      </Text>

      {loading && (
        <View className="mt-10 items-center justify-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {error && !loading && (
        <Text className="text-white mt-4">Could not fetch movies.</Text>
      )}

      {!loading &&
        !error &&
        movies?.length === 0 &&
        query.trim().length > 0 && (
          <Text className="text-white mt-4">No movies found.</Text>
        )}

      <FlatList
        data={movies ?? []}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}
        renderItem={({ item }) => <MovieCard {...item} />}
      />
    </View>
  );
};

export default Search;
