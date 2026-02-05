import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { fetchTrendingMovies, updateSearchCount } from "@/services/appwrite";
import { images } from "@/constants/images";

const Search = () => {
  const [query, setQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query }), false);

  const {
    data: trending,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useFetch(fetchTrendingMovies, true);

  // Handle debounced searching
  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length === 0) {
      reset();
      refetchTrending();
      return;
    }

    const timeoutId = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, refetch, reset, refetchTrending]);

  // Track search analytics ONLY when results exist
  useEffect(() => {
    if (!query.trim()) return;
    if (!movies || movies.length === 0) return;

    updateSearchCount(query, movies[0]);
  }, [movies, query]);

  const trimmedQuery = useMemo(() => query.trim(), [query]);
  const showingSearch = trimmedQuery.length > 0;

  const dataToRender = useMemo(
    () => (showingSearch ? (movies ?? []) : (trending ?? [])),
    [showingSearch, movies, trending],
  );

  const loadingState = showingSearch ? loading : trendingLoading;
  const errorState = showingSearch ? error : trendingError;

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full z-0 absolute" />
      <View className=" px-4 pt-14">
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search for a movie"
        />

        <Text className="text-white text-2xl font-bold mt-5 mb-5">
          {showingSearch && trimmedQuery
            ? `Results for "${trimmedQuery}"`
            : "Trending movies"}
        </Text>

        {loadingState && (
          <View className="mt-10 items-center justify-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {errorState && !loadingState && (
          <Text className="text-white mt-4">Could not fetch movies.</Text>
        )}

        {!loadingState && !errorState && dataToRender.length === 0 && (
          <Text className="text-white mt-4">
            {showingSearch ? "No movies found." : "No trending movies yet."}
          </Text>
        )}

        <FlatList
          data={dataToRender}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}
          renderItem={({ item }) => <MovieCard {...item} />}
        />
      </View>
    </View>
  );
};

export default Search;
