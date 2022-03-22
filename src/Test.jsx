import { StyleSheet, Text, View } from "react-native";

export default function Test() {
  return (
    <View>
      <Text style={styles.h1}>Test Component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: "auto",
  },
});
