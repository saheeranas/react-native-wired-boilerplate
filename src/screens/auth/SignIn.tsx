import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useTheme,
  Surface,
  TextInput,
  Title,
  HelperText,
} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {login, getUsers} from '../../services/api';
import {setToken, getToken} from '../../utils/token';
import {useAuth} from '../../hooks/AuthProvider';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import RoundedButton from '../../components/RoundedButton';

interface ValuesType {
  username: string;
  password: string;
}

const initialValues: ValuesType = {
  username: 'demo@demo.com',
  password: '12345678',
};

const LoginSchema = Yup.object().shape({
  username: Yup.string().min(5, 'Too Short!').required('Required'),
  password: Yup.string().min(5, 'Too Short!').required('Required'),
});

const SignIn = () => {
  const {colors} = useTheme();
  const {user, setUser} = useAuth();

  const handleLogin = (values: ValuesType, {setErrors}: any) => {
    // Add grant_type value to obj
    let reqObj: any = Object.assign({}, values, {grant_type: 'password'});
    // Service request
    login(new URLSearchParams(reqObj))
      .then(res => {
        if (res.data?.user?.access_token) {
          const {id, name, email, access_token, refresh_token} = res.data.user;
          setUser({
            id,
            name,
            email,
            token: access_token,
          });
          setToken(access_token, refresh_token);
        }
      })
      .catch(e => {
        if (e.response?.data?.errors) {
          // let result = transformToFormikErrors(e.response.data.errors);
          // setErrors(result);
          console.log(e);
        }
      });
  };

  console.log(user);

  const handleGetToken = () => {
    // console.log('handleGetToken: ');
    let token = getToken();
    console.log(token);
    // console.log('End handleGetToken');
  };

  const fetchUsers = () => {
    getUsers()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={colors.accent}
      />
      <Surface style={styles.surface}>
        <Title>SignIn</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                label="Username"
                placeholder="Username/Email"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                keyboardType="email-address"
                style={styles.input}
                error={Boolean(errors.username && touched.username)}
              />
              <HelperText
                type="error"
                visible={Boolean(errors.username && touched.username)}>
                {errors.username}
              </HelperText>
              <TextInput
                label="Password"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.input}
                secureTextEntry
                error={Boolean(errors.password && touched.password)}
              />
              <HelperText
                type="error"
                visible={Boolean(errors.password && touched.password)}>
                {errors.password}
              </HelperText>
              <RoundedButton mode="contained" onPress={handleSubmit}>
                Sign In
              </RoundedButton>
            </View>
          )}
        </Formik>
        <RoundedButton mode="contained" onPress={handleGetToken}>
          Get Token
        </RoundedButton>
        <RoundedButton mode="contained" onPress={fetchUsers}>
          Fetch Users
        </RoundedButton>
      </Surface>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    width: '90%',
    // height: '100%',
    paddingHorizontal: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  input: {
    width: 250,
    height: 60,
    marginBottom: 10,
  },
});
