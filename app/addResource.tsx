import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, useRouter } from 'expo-router'
import * as Yup from 'yup';
import {Formik} from 'formik';
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import useAddResource from '@/hooks/useAddResource';



const ResourceSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  group: Yup.string().required("Please assign group"),
  description: Yup.string().required("Please provide short description"),
  link: Yup.string().url().required("Resource link is required")
});

export default function AddResource () {
  const navigation = useNavigation();
  const { mutate } = useAddResource();
  const router = useRouter();
  
  return (
    <Box className='flex-1 p-6 mt-4 '>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Add new Resource</Text>
      <Formik
        initialValues={{
          title: '',
          group: '',
          description: '',
          link: '',
        }}
        validationSchema={ResourceSchema}
        onSubmit={(values, {resetForm}) => {
          // Add the restaurant to the context
          mutate({
            title: values.title,
            group: values.group,
            description: values.description,
            link: values.link,
          });

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
            <Text size='xl' className='mt-2 text-stone-900'>Group</Text>
            <Input variant='outline' size='md' className='bg-white mt-2'>
              <InputField 
                  onChangeText={handleChange('group')}
                  onBlur={handleBlur('group')}
                  value={values.group}
                  placeholder='Enter group name'
              />
            </ Input>
            {touched.group && errors.group && (
              <Text size='sm' className='text-red-500 mt-1'>{errors.group}</Text>
            )}
          </Box>
          <Box className='mb-4'>
            <Text size='xl' className='mt-2 text-stone-900'>Description</Text>
            <Input variant='outline' size='md' className='bg-white mt-2'>
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
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </Box>
      )}  
      </Formik>
    </Box>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
