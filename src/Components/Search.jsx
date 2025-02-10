import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { searchString, setSearch } from "../Store/food";
import Entypo from "@expo/vector-icons/Entypo";
const Search = () => {
  let serchText = useSelector(searchString);
  let dispatch = useDispatch();
  let nav = useNavigation();
  let [text, settext] = useState();
  const [isRecording, setIsRecording] = useState(false);

  useSpeechRecognitionEvent("start", () => setIsRecording(true));
  useSpeechRecognitionEvent("end", () => setIsRecording(false));
  useSpeechRecognitionEvent("result", (event) => {
    settext(event.results[0]?.transcript);
    dispatch(setSearch(event.results[0]?.transcript));
    nav.navigate("products", { search: text });
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });

  useEffect(() => {
    settext(serchText);
    // console.log()
  }, [serchText]);
  const onSubmit = () => {
    let router = nav.getState().routes;
    if (router[router.length - 1].name == "home" && text == "") {
    } else {
      dispatch(setSearch(text));
      nav.navigate("products", { search: text });
    }
  };

  const handleStart = async () => {
    ExpoSpeechRecognitionModule.getPermissionsAsync().then((result) => {
      console.log("Status:", result.status);
      console.log("Granted:", result.granted);
      console.log("Can ask again:", result.canAskAgain);
      console.log("Expires:", result.expires);
    });

    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    console.log(result)
    // // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
   
    });
  };
  return (
    <View style={style.mainContainer}>
      <View style={style.searchMainContiner}>
        <Image
          style={style.micImage}
          source={require("../assets/icons/search.png")}
        />
        <TextInput
          returnKeyType={"done"}
          style={style.input}
          onChangeText={settext}
          value={text}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View>
        <Pressable
          onPress={() => {
            isRecording ? ExpoSpeechRecognitionModule.stop() : handleStart();
          }}
        >
          <View style={style.micContainer}>
            {!isRecording ? (
              <Image
                style={style.micImage}
                source={require("../assets/icons/mic.png")}
              />
            ) : (
              <Entypo name="dots-three-horizontal" size={20} color="white" />
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
  },
  micContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#129575",
  },
  searchMainContiner: {
    flex: 1,
    borderWidth: 1,
    marginRight: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    flexDirection: "row",
    borderColor: "#D9D9D9",
    alignItems: "center",
  },
  input: {
    height: 40,

    padding: 10,
    flex: 1,
  },
  micImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
export default Search;
