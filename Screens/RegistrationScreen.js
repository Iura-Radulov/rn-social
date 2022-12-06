import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';

const initialState = {
  name: '',
  email: '',
  password: '',
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusesPassword, setIsFocusedPassword] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsShowKeyboard(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const onRegistration = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    console.log(state);
    setState(initialState);
  };

  const onInputNameFocus = () => {
    setIsShowKeyboard(true);
    setIsFocusedName(true);
  };
  const onInputEmailFocus = () => {
    setIsShowKeyboard(true);
    setIsFocusedEmail(true);
  };
  const onInputPasswordFocus = () => {
    setIsShowKeyboard(true);
    setIsFocusedPassword(true);
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' && 'padding'}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground style={styles.image} source={require('../assets/Photo-BG.jpg')}>
          <View style={styles.form}>
            <View style={styles.formInside}>
              <View
                style={[
                  styles.photoBlock,
                  {
                    transform: [{ translateX: -50 }],
                  },
                ]}></View>

              <Text style={styles.title}>Регистрация</Text>
              <TextInput
                placeholder='Логин'
                value={state.name}
                onFocus={onInputNameFocus}
                onChangeText={value => setState(prevState => ({ ...prevState, name: value }))}
                onBlur={() => setIsFocusedName(false)}
                style={{ ...styles.input, borderColor: isFocusedName ? '#FF6C00' : '#F6F6F6' }}
              />
              <TextInput
                placeholder='Адрес электронной почты'
                value={state.email}
                onFocus={onInputEmailFocus}
                onChangeText={value => setState(prevState => ({ ...prevState, email: value }))}
                onBlur={() => setIsFocusedEmail(false)}
                style={{ ...styles.input, borderColor: isFocusedEmail ? '#FF6C00' : '#F6F6F6' }}
              />
              <View>
                <TextInput
                  value={state.password}
                  onFocus={onInputPasswordFocus}
                  onChangeText={value => setState(prevState => ({ ...prevState, password: value }))}
                  placeholder='Пароль'
                  secureTextEntry={true}
                  onBlur={() => setIsFocusedPassword(false)}
                  style={{
                    ...styles.input,
                    borderColor: isFocusesPassword ? '#FF6C00' : '#F6F6F6',
                  }}
                />
                <Text style={styles.showPassword}>Показать</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ ...styles.btn, display: isShowKeyboard ? 'none' : 'flex' }}
                onPress={onRegistration}>
                <Text style={styles.btnText}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <View
                style={{
                  ...styles.navigationContainer,
                  display: isShowKeyboard ? 'none' : 'flex',
                }}>
                <Text>Уже есть аккаунт?</Text>
                <Text style={styles.navigationLink} onPress={() => navigation.navigate('Login')}>
                  Войти
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 0.7,
    position: 'relative',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  formInside: {
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
  },

  photoBlock: {
    position: 'absolute',
    top: -160,
    left: '50%',

    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 30,
    fontFamily: 'Roboto-Regular',
    color: ' #212121',
  },
  input: {
    height: 50,
    padding: 10,
    borderWidth: 1,

    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    color: '#BDBDBD',
    marginBottom: 16,
  },
  btn: {
    marginTop: 27,
    textAlign: 'center',
    height: 50,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FF6C00',
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 35,
    color: '#1B4371',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  navigationLink: {
    marginLeft: 10,
    color: '#FF6C00',
  },
  showPassword: { position: 'absolute', top: 16, right: 16, fontSize: 16, color: '#1B4371' },
});
