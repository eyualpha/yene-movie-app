import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "tom and jerry",
    }),
  );

  if (moviesLoading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (moviesError) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-white">Something went wrong</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full z-0 absolute" />

      <FlatList
        data={movies}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 15 }}
        renderItem={({ item }) => <MovieCard {...item} />}
        ListHeaderComponent={
          <View>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 object-contain mx-auto"
            />

            <SearchBar
              onPressIn={() => router.push("/search")}
              editable={false}
              placeholder="Search for a movie"
            />

            <Text className="text-white text-2xl font-bold mt-5 mb-5">
              Latest Movies
            </Text>
          </View>
        }
      />
    </View>
  );
}
