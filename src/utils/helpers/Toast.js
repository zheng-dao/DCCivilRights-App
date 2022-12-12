import { ToastAndroid } from 'react-native'
import Toast from 'react-native-simple-toast';

export default function showErrorAlert(message) {
  if (Platform.OS == "android") {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Toast.show(message, Toast.LONG)
  }
}