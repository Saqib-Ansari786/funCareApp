import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from "react-native";

import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import { Video, AVPlaybackStatus } from "expo-av";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";

const Home = () => {
  // Dummy Data
  const navigation = useNavigation();
  const [destinations, setDestinations] = React.useState([]);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getData(
      "http://starter-express-api-git-main-salman36.vercel.app/api/auth/playlandrecord"
    );
  }, []);

  async function getData(url) {
    try {
      setLoading(true);
      const response = await fetch(url);
      const responseData = await response.json();
      setDestinations(responseData);
      dispatch({ type: "SET_PLAYLAND", payload: responseData });
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  function renderDestinations(item, index) {
    return (
      <TouchableOpacity
        style={[
          styles.shadow,
          {
            marginHorizontal: SIZES.base,
            flexDirection: "row",
            height: 100,
            padding: SIZES.base,
            width: SIZES.width * 0.9,
          },
        ]}
        onPress={() => {
          navigation.navigate("DestinationDetail", {
            name: item.playland_name,
            description: item.discription,
            img: images.skiVilla,
            latitude: item.latitude,
            longitude: item.longitude,
            price: item.price,
            discount: item.discount,
            time_open: item.time_open,
            time_close: item.time_close,
            playlandId: item._id,
            location: item.location,
          });
        }}
      >
        <Image
          source={{ uri: item.path_url }}
          resizeMode="cover"
          style={{
            width: SIZES.width * 0.2,
            height: "90%",
            borderRadius: 30,
          }}
        />
        <View style={{ marginLeft: SIZES.base * 2 }}>
          <Text style={{ marginTop: SIZES.base / 2, ...FONTS.h4 }}>
            {item.playland_name}
          </Text>
          <Text
            style={{
              marginTop: SIZES.base / 2,
              ...FONTS.body4,
              color: COLORS.gray,
            }}
          >
            {item.discription}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (navigation.isFocused()) {
          BackHandler.exitApp();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View
        style={{
          flex: 0.5,
          marginTop: SIZES.base,
          paddingHorizontal: SIZES.padding * 0.6,
        }}
      >
        <Video
          ref={video}
          source={require("../assets/playLand.mp4")}
          resizeMode="cover"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          style={{ width: "100%", height: "100%", borderRadius: 20 }}
          shouldPlay
        />
      </View>

      {/* Destination */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            marginTop: SIZES.base * 2,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.base,
            ...FONTS.h2,
          }}
        >
          Nearby PlayLands
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlatList
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              data={destinations}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item, index }) => renderDestinations(item, index)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    borderRadius: 20,
    marginHorizontal: SIZES.base,
    marginVertical: SIZES.base,
    backgroundColor: COLORS.white,
    overflow: "hidden",
  },
});

export default Home;
