/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { ToDoItemComponent } from './components/Dashboard/TodoItem';
import {
  getDBConnection,
  getTodoItems,
  saveTodoItems,
  createTable,
  clearTable,
  deleteTodoItem,
  getTodoData
} from './components/db-service';
import CustomButton from './components/Button/Button';
import { deleteTable } from './components/db-service';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const loadDataCallback = useCallback(async () => {
    try {
      const initTodos = [
        { id: 0, value: 'go to shop' },
        { id: 1, value: 'eat at least a one healthy foods' },
        { id: 2, value: 'Do some exercises' },
      ];
      const db = await getDBConnection();
      await createTable(db);
      const storedTodoItems = await getTodoItems(db);
      if (storedTodoItems.length) {
        setTodos(storedTodoItems);
      } else {
        await saveTodoItems(db, initTodos);
        setTodos(initTodos);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const newTodos = [...todos, {
        id: todos.length ? todos.reduce((acc, cur) => {
          if (cur.id > acc.id) return cur;
          return acc;
        }).id + 1 : 0, value: newTodo
      }];
      setTodos(newTodos);
      const db = await getDBConnection();
      await saveTodoItems(db, newTodos);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };
  const deleteItem = async (id) => {
    console.log('this is id here -->>',id)
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      todos.splice(id, 1);
      setTodos(todos.slice(0));
    } catch (error) {
      console.error(error);
    }
  };
  const customDel = async (id) => {
    try {
      const db = await getDBConnection();
      await deleteTable(db);
    } catch (error) {
      console.error(error);
    }
  };

  const showDatainConsole = async () => {
      const db = await getDBConnection();
      const todoData = await getTodoData(db)
      console.log("todoData",todoData);
  }

  return (
    <SafeAreaView>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View >
          <Text > ToDo Application </Text>
        </View>
        <View>
          <TextInput  style={{borderRadius:1,backgroundColor:'pink',borderWidth:1,marginBottom:10,marginHorizontal:10}} value={newTodo} onChangeText={text => setNewTodo(text)} />
          <CustomButton onPress={addTodo} label="Add Todo" />
        </View>
        <View>
          {todos.map((todo) => (
            <ToDoItemComponent key={todo.id} todo={todo} deleteItem={deleteItem} />
          ))}
        </View>
        <TouchableOpacity onPress={customDel}>
          <Text>getTodoData</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showDatainConsole}>
          <Text>showDatainConsole</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;