import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://backend-todo-suoo.onrender.com/api/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  const handleAddOrUpdateTask = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (editingTaskId) {
        // Update task
        await axios.put(`https://backend-todo-suoo.onrender.com/api/tasks/${editingTaskId}`, { title }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new task
        await axios.post('https://backend-todo-suoo.onrender.com/api/tasks', { title }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setTitle('');
      setEditingTaskId(null);
      // Refresh the task list
      const response = await axios.get('https://backend-todo-suoo.onrender.com/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to add or update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`https://backend-todo-suoo.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh the task list
      const response = await axios.get('https://backend-todo-suoo.onrender.com/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete task');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editingTaskId ? 'Edit Task' : 'Add New Task'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button
        title={editingTaskId ? "Update Task" : "Add Task"}
        onPress={handleAddOrUpdateTask}
        color="#4CAF50"
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={styles.taskContent}>
              <Text style={styles.taskTitle}> {item.title} </Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => {
              setTitle(item.title);
              setEditingTaskId(item._id);
            }}>
              <Text style={styles.editText}> Edit </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTask(item._id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2, // Shadow effect on Android
    shadowColor: '#000', // Shadow effect on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  editText: {
    color: '#4CAF50',
  },
  deleteText: {
    color: '#FF5733',
  },
});

export default TodoScreen;
