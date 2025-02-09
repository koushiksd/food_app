import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
// import Voice from "@react-native-voice/voice";
const Search = () => {
  let [text, settext] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [err, seterr] = useState("");
//   Voice.onSpeechStart = () => setIsRecording(true);
//   Voice.onSpeechEnd = () => setIsRecording(false);
//   Voice.onSpeechError = (e) => seterr(e);
//   Voice.onSpeechResults = (e) => settext(e.value[0]);
  useEffect(() => {
    console.log({ err });
  }, [err]);
  const stateRec = async () => {
    console.log("Reco");
    try {
      //await Voice.start("en-US");
    } catch (err) {
      seterr(err);
    }
  };

  const stopRec = async () => {
    try {
    // await Voice.stop();
    } catch (err) {
      seterr(err);
    }
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
          onSubmitEditing={()=>{console.log("done")}}
        />
      </View>
      <View>
        <Pressable
          onPress={() => {
            isRecording ? stopRec() : stateRec();
          }}
        >
          <View style={style.micContainer}>
            <Image
              style={style.micImage}
              source={require("../assets/icons/mic.png")}
            />
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
