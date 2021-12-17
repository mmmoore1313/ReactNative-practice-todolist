import { Formik } from 'formik'
import React from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Input } from 'react-native-elements/dist/input/Input'

export default function NewScreen () {
  const { getItem, setItem } = useAsyncStorage('todo')
  
  function newTask (values) {
    if (!values.title) {
      Toast.show({
        type: 'error',
        text1: 'Title is required',
        position: 'top'
      })
      return
    }
  }
  
  getItem() // get todo array from storage
    .then((todoJSON) => {
      let todo = todoJSON ? JSON.parse(todoJSON) : []
      todo.push({
        id: uuid.v4(),
        title: values.title
      })
    })
  
  
  
  return (
    <Formik
      initialValues={{title: ''}}
      onSubmit={newTask}
    >
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View style={style.container}>
          <Text h4>New Todo Item</Text>
          <Input
            placeholder="Example: Cook, Clean, etc..."
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            style={style.input}
          />
          <Button 
            title="Add"
            onPress={handleSubmit}
            style={style.button}
          />
        </View>
      )}
    </Formik>
  )
}

const style = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10
  },
  input: {
    marginTop: 10
  },
  button: {
    backgroundColor: '#228CDB'
  }
})