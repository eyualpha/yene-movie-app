import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();
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
        <View>
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>
      </ScrollView>
    </View>
  );
}
