import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

interface Props {
  icon: any;
  name: string;
  focused: boolean;
}

const _layout = () => {
  const tabIcon = ({ icon, name, focused }: Props) =>
    focused ? (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[90px] min-h-10 mt-4 rounded-full justify-center items-center gap-1"
      >
        <Image source={icon} tintColor={"#151312"} className="size-5" />
        <Text className="text-secondary text-base font-semibold">{name}</Text>
      </ImageBackground>
    ) : (
      <View className=" flex flex-row w-full flex-1 min-w-[90px] min-h-10 mt-4 rounded-full justify-center items-center gap-1">
        <Image source={icon} tintColor={"#A8B5DB"} className="size-5" />
        {/* <Text className="text-base font-semibold text-[#A8B5DB]">{name}</Text> */}
      </View>
    );
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          position: "absolute",
          borderColor: "#0f0d23",
          borderWidth: 1,
        },
        tabBarItemStyle: { justifyContent: "center", alignItems: "center" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>{tabIcon({ icon: icons.home, name: "Home", focused })}</>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>{tabIcon({ icon: icons.search, name: "Search", focused })}</>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>{tabIcon({ icon: icons.save, name: "Saved", focused })}</>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>{tabIcon({ icon: icons.person, name: "Profile", focused })}</>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
