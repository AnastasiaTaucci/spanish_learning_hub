import { TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import * as Yup from 'yup';
import {Formik} from 'formik';
import { useResourceContext } from '@/context/ResourcesContext';
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Menu, Button } from 'react-native-paper';

const categories = ["Grammar", "Vocabulary", "Listening", "Reading", "Youtube Channel", "Padcast", "Netflix" ];


const ResourceSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  group: Yup.string().required("Please assign group"),
  description: Yup.string().required("Please provide short description"),
  link: Yup.string().url().required("Resource link is required")
});

export default function AddResource () {
  const navigation = useNavigation();
  const { addResource, updateResource, resources } = useResourceContext();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  // if coming from details page to edit
  const params = useLocalSearchParams();
  
  const id = typeof params.id === "string" ? params.id : undefined;
  const isEditing = !!id;     // !!params.id -> a JavaScript trick to convert a value to a boolean.

  const resource = resources.find((item) => item.id === id) // resource might be undefined if there is no match

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 14, marginTop: 36 }}>
        <Box>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {isEditing? "Edit Resource" : "Add new Resource"}
          </Text>
          <Formik
            initialValues={{
              title: resource?.title || "", 
              description: resource?.description || "", 
              group: resource?.group || "", 
              link: resource?.link || "" 
            }}
            validationSchema={ResourceSchema}
            onSubmit={(values, {resetForm}) => {
              // if editing, just update resource. Otherwise, add new
              if (isEditing) {
                updateResource({
                  id,
                  title: values.title,
                  group: values.group,
                  description: values.description,
                  link: values.link,
                });
              } else {
              // Add the restaurant to the context
                addResource({
                  title: values.title,
                  group: values.group,
                  description: values.description,
                  link: values.link,
                });
              }

              // Reset the form
              resetForm();
              // Navigate back to the previous screen
              navigation.goBack();
            }}
          >
          {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
            <Box>
              <Box className='mb-4'>
                <Text size='xl' className='mt-2 text-stone-900'>Name</Text>
                <Input variant='outline' size='md' className='bg-white mt-2 rounded-md'>
                  <InputField 
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                      placeholder='Enter resource name'
                  />
                </ Input>
                {touched.title && errors.title && (
                  <Text size='sm' className='text-red-500 mt-1'>{errors.title}</Text>
                )}
              </Box>
              <Box className='mb-4'>
                <Text size='xl' className='mt-2 text-stone-900'>Category</Text>
                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <Button 
                      mode="outlined" 
                      onPress={() => setMenuVisible(true)} 
                      style={styles.category}    
                      labelStyle={[styles.categoryLabel, {color: values.group ? '#000' : '#888',}]}                  
                    >
                      {values.group || "Select Category"}
                    </Button>
                  }
                >
                  {categories.map((label) => (
                    <Menu.Item
                      key={label}
                      onPress={() => {
                        handleChange("group")(label);
                        setMenuVisible(false);
                      }}
                      title={label}
                    />
                  ))}
                </Menu>
                {touched.group && errors.group && (
                  <Text size='sm' className='text-red-500 mt-1'>{errors.group}</Text>
                )}
              </Box>
              <Box className='mb-4'>
                <Text size='xl' className='mt-2 text-stone-900'>Description</Text>
                <Input variant='outline' size='md' className='bg-white mt-2 text-left'>
                  <InputField 
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                      placeholder='Enter resource name'
                  />
                </ Input>
                {touched.description && errors.description && (
                  <Text size='sm' className='text-red-500 mt-1'>{errors.description}</Text>
                )}
              </Box>
              <Box className='mb-4'>
                <Text size='xl' className='mt-2 text-stone-900'>Link</Text>
                <Input variant='outline' size='md' className='bg-white mt-2'>
                  <InputField 
                      onChangeText={handleChange('link')}
                      onBlur={handleBlur('link')}
                      value={values.link}
                      placeholder='Enter resource name'
                  />
                </ Input>
                {touched.link && errors.link && (
                  <Text size='sm' className='text-red-500 mt-1'>{errors.link}</Text>
                )}
              </Box>

              <TouchableOpacity style={styles.button} onPress={ () => handleSubmit() }>
                <Text style={styles.buttonText}>
                  {isEditing? "Save" : "Add"}
                </Text>
              </TouchableOpacity>
            </Box>
          )}  
          </Formik>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingTop: 12,
    textAlign: 'center',
  },
  backButton: {
    width: 90,
    padding: 8,
    marginBottom: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  backText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  category: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'flex-start',
  },
  categoryLabel: {
    fontSize: 13,
    marginVertical: 6,
    textAlign: 'left',
    width: '95%',
  },
  button: {
    width: '65%',
    marginHorizontal: 'auto',
    backgroundColor: '#0362fc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});
