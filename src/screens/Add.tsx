import React from 'react';
import {ScrollView, StyleSheet, View, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useTheme,
  Appbar,
  TextInput,
  Text,
  Button,
  HelperText,
} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useQueryClient, useMutation} from '@tanstack/react-query';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

import {createUser} from '../services/api';

export interface UserPayload {
  name: string;
  email: string;
}

const initialValues: UserPayload = {
  name: '',
  email: '',
};

const Schema = Yup.object().shape({
  name: Yup.string().min(1, 'Too Short!').required('Required'),
  email: Yup.string().min(1, 'Too Short!').required('Required'),
});

// Add Screen component
export default function Add({navigation}) {
  const {colors} = useTheme();
  const queryClient = useQueryClient();

  const secondInputRef = React.useRef(null) as React.MutableRefObject<any>;
  const submitButtonRef = React.useRef(null) as React.MutableRefObject<any>;

  //   Create
  const {mutate, isPending, isSuccess} = useMutation({
    mutationKey: ['createUser'],
    mutationFn: createUser,
    onSuccess: data => {
      if (data?.data) {
        const {data: user} = data;
        queryClient.setQueryData(['users'], (prev: any) => {
          return [user, ...prev];
        });
        setTimeout(() => {
          navigation.navigate('Home');
        }, 0);
      }
    },
  });

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.surface}]}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />
      <Appbar.Header>
        <Appbar.Content title="Create User" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={(values, {resetForm}) => {
              mutate(values, {
                onSuccess: () => {
                  Keyboard.dismiss();
                  resetForm();
                },
              });
            }}>
            {({handleChange, handleBlur, handleSubmit, errors, touched}) => (
              <View style={styles.formContent}>
                <View style={styles.inputContainer}>
                  <TextInput
                    mode="outlined"
                    label="Name"
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    onSubmitEditing={secondInputRef?.current?.focus}
                  />
                  <HelperText
                    type="error"
                    visible={Boolean(errors.name && touched.name)}>
                    {errors.name}
                  </HelperText>
                  <TextInput
                    ref={secondInputRef}
                    mode="outlined"
                    label="Email"
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    onSubmitEditing={submitButtonRef?.current?.focus}
                  />
                  <HelperText
                    type="error"
                    visible={Boolean(errors.email && touched.email)}>
                    {errors.email}
                  </HelperText>
                </View>

                <Button
                  ref={submitButtonRef}
                  mode="contained"
                  onPress={() => handleSubmit()}
                  disabled={isPending}
                  style={styles.button}>
                  Add
                </Button>

                {isSuccess && <Text>User created successfully</Text>}
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  formContainer: {
    width: '100%',
    paddingTop: 12,
  },
  formContent: {
    columnGap: 16,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 2,
  },
  button: {
    height: 56,
    justifyContent: 'center',
  },
});
