import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    }),
  );

  return (
    <View className=" flex-1 bg-primary ">
      <Image source={images.bg} className="w-full z-0 absolute" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
      >
        <Image
          source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 object-contain mx-auto"
        />
        {moviesLoading ? (
          <ActivityIndicator size={"large"} color="#fff" />
        ) : moviesError ? (
          <Text className="text-white">Something went wrong</Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            <View className="mt-5">
              <Text className="text-white text-2xl font-bold mb-5">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard {...item} key={item.id} />}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
