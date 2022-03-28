import { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

//-----------------------------------------------> installed
import * as SecureStore from "expo-secure-store";

//-----------------------------------------------> custom components
import { axios } from "./src/utils";
import { Task } from "./src/components";
import { StatusBar } from "expo-status-bar";

//-----------------------------------------------> default export
export default function App() {
  const [res, setRes] = useState({});
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  //  request server, on load App component
  useEffect(() => {
    let isMounted = true;

    //  send request to test-server
    const getRes = async () => {
      try {
        const res = await axios.get("/");
        //get task from local storage
        const savedTodos = await SecureStore.getItemAsync("todos");

        if (isMounted) {
          setRes(res.data);
          setTodos(JSON.parse(savedTodos) || []);
        }
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
  const addTask = async () => {
    try {
      setTodos([...todos, { id: "", task: task, completed: false }]);
      setTask("");

      // save task to local storage
      const stringifyTodos = JSON.stringify(todos);
      await SecureStore.setItemAsync("todos", stringifyTodos);
    } catch (e) {
      console.log(e);
    }
  };

  //  returned component
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Response from server :
        <Text style={{ fontWeight: "bold" }}> {res?.msg}</Text>
      </Text>

      <View style={{ flex: 1 }}>
        <View style={styles.taskViewer}>
          <FlatList data={todos} renderItem={({ item }) => <Task />} />
        </View>

        <View style={styles.taskAdder}>
          <TextInput
            style={styles.taskInput}
            value={task}
            placeholder="Enter Task"
            onChangeText={(text) => setTask(text)}
          />

          <TouchableOpacity style={styles.addBtn} onPress={addTask}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

//-----------------------------------------------> styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  taskViewer: {
    flex: 1,
    minWidth: "100%",
  },
  taskAdder: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "100%",
    height: 60,
    margin: 10,
    paddingHorizontal: 10,
  },
  taskInput: {
    flex: 1,
    height: 50,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#06BCEE",
  },
  addBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#06BCEE",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
