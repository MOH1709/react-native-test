import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

//-----------------------------------------------> custom components
import Test from "./src/Test";
import { axios } from "./src/utils";
import { StatusBar } from "expo-status-bar";

//-----------------------------------------------> default export
export default function App() {
  const [res, setRes] = useState({});

  //request server, on load App component
  useEffect(() => {
    let isMounted = true;

    //send request to test-server
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

  //returned component
  return (
    <View style={styles.container}>
      <Test />
      <Text>{res?.msg}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

//-----------------------------------------------> styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
