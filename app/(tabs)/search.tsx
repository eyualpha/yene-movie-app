import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";

const Search = () => {
  const [query, setQuery] = useState("");

  const fetchMoviesByQuery = useCallback(() => fetchMovies({ query }), [query]);

  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(fetchMoviesByQuery, false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed.length > 0) {
        refetch();
      } else {
        reset();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, refetch, reset]);

  return (
    <View className="flex-1 bg-primary px-4 pt-14">
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a movie"
      />

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
        data={movies || []}
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
