import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

//-----------------------------------------------> installed
import * as SecureStore from "expo-secure-store";

//-----------------------------------------------> custom components
import Test from "./src/Test";
import { axios } from "./src/utils";
import { StatusBar } from "expo-status-bar";

//-----------------------------------------------> default export
export default function App() {
  const [res, setRes] = useState({});
  const [input, setInput] = useState({
    key: "",
    value: "",
  });
  const [result, setResult] = useState("none");

  //  request server, on load App component
  useEffect(() => {
    let isMounted = true;

    //  send request to test-server
    const getRes = async () => {
      try {
        const res = await axios.get("/");
        isMounted && setRes(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getRes();

    return () => {
      isMounted = false;
    };
  }, []);

  //  save entered key value pair
  const save = async (key, val) => {
    try {
      await SecureStore.setItemAsync(key, val);
    } catch (e) {
      console.log(e);
    }
  };

  //  get value of entered key
  const getVal = async (key) => {
    try {
      const response = await SecureStore.getItemAsync(key);
      setResult(response || "Invalid Key");
    } catch (e) {
      console.log(e);
    }
  };

  //  on change input handler
  const onChangeHandler = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  //  returned component
  return (
    <View style={styles.container}>
      <Test />

      {/* set key value pairs */}
      <TextInput
        style={styles.input}
        placeholder="Enter key"
        value={input.key}
        onChangeText={(value) => onChangeHandler("key", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter value"
        value={input.value}
        onChangeText={(value) => onChangeHandler("value", value)}
      />

      <Button
        title="save"
        onPress={() => {
          save(input.key, input.value);
          setInput({ key: "", value: "" });
        }}
      />

      {/* get value of entered key */}
      <Text style={styles.h1}>Get Value</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter key"
        onSubmitEditing={(e) => getVal(e.nativeEvent.text)}
      />
      <Text>
        Value of Entered Key : <Text style={styles.result}>{result}</Text>{" "}
      </Text>

      <Text>
        Response from server : <Text style={styles.result}>{res?.msg}</Text>
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

//-----------------------------------------------> styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "auto",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 55,

    marginHorizontal: "auto",
    marginVertical: 20,
    paddingHorizontal: 10,

    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
  },
  h1: {
    marginTop: 20,
    marginHorizontal: "auto",
    fontSize: 20,
    fontWeight: "bold",
  },
  result: {
    fontWeight: "bold",
  },
});
