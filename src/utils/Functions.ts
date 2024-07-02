/**
 * @author Himanshu Yadav
 * @email himanshu.yadav@studiographene.com
 * @create date 2023-09-11 11:27:03
 * @modify date 2023-09-11 11:27:13
 * @desc Common utility functions
 */

import {Alert} from 'react-native';
import {Errors, Texts} from '../constants/Strings';
import {FunctionWithOneParam} from '../types/commonTypes';
/**
 * The function `showAlert` displays an alert with a given message.
 */
export const showAlert = (message: string) => {
  Alert.alert(
    Errors.alert,
    message,
    [
      {
        text: Texts.close,
      },
    ],
    {cancelable: false},
  );
};

/**
 * The function `showAlertWithOk` displays an alert with a message and an "OK" button, and optionally
 * executes a callback function when the button is pressed.
 * @param message - The message parameter is a string that represents the content of the alert message
 * that will be displayed to the user.
 * @param [onOkPress] - The `onOkPress` parameter is a callback function that will be executed when the
 * user presses the "OK" button in the alert dialog. It is optional and has a default value of an empty
 * arrow function `() => {}`. You can pass your own function to `onOkPress` if
 */
export const showAlertWithOk = (message: string, onOkPress = () => {}) => {
  Alert.alert(
    Errors.alert,
    message,
    [
      {
        text: Texts.ok,
        onPress: onOkPress,
      },
    ],
    {cancelable: false},
  );
};

/**
 * The function `showAlertWithOkAndCancel` displays an alert with a message and options for the user to
 * press "Ok" or "Cancel", and executes the corresponding callback functions when the buttons are
 * pressed.
 * @param message - The message parameter is a string that represents the message to be displayed in
 * the alert dialog. It can be any text or information that you want to show to the user.
 * @param [onOkPress] - The onOkPress parameter is a function that will be called when the user presses
 * the "Ok" button in the alert dialog. It is optional and has a default value of an empty arrow
 * function. You can pass a custom function to this parameter if you want to perform some action when
 * the "Ok
 * @param onCancelPress - The `onCancelPress` parameter is a function that will be called when the user
 * presses the "Cancel" button in the alert dialog. It is an optional parameter, so if you don't
 * provide a value for it, the "Cancel" button will not be shown in the alert dialog.
 */
export const showAlertWithOkAndCancel = (
  message: string,
  onOkPress: FunctionWithOneParam = () => {},
  onCancelPress: FunctionWithOneParam = () => {},
) => {
  Alert.alert(
    Errors.alert,
    message,
    [
      {
        text: Texts.cancel,
        onPress: onCancelPress,
      },
      {
        text: Texts.yes,
        onPress: onOkPress,
      },
    ],
    {cancelable: false},
  );
};
