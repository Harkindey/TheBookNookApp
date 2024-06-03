import { showMessage } from 'react-native-flash-message';

export type NotificationType = 'success' | 'error' | 'warning';

interface INotification {
  alertTitle: string;
  message: string;
  type?: NotificationType;
  onPress?: () => void;
}

export const showSuccessNotification = ({
  alertTitle,
  message,
  onPress,
}: INotification) => {
  showMessage({
    message: alertTitle,
    description: message,
    type: 'success',
    onPress,
    backgroundColor: '#1FAD64',
  });
};

export const showErrorNotification = ({
  message,
  alertTitle,
  onPress,
}: INotification) => {
  showMessage({
    message: alertTitle,
    description: message,
    type: 'danger',
    onPress,
    backgroundColor: '#DB4343',
  });
};

export const showWarningNotification = ({
  message,
  alertTitle,
  onPress,
}: INotification) => {
  showMessage({
    message: alertTitle,
    description: message,
    type: 'danger',
    onPress,
    backgroundColor: '#F38B00',
  });
};

export const showInfoNotification = ({
  message,
  alertTitle,
  onPress,
}: INotification) => {
  showMessage({
    message: alertTitle,
    description: message,
    type: 'info',
    onPress,
    backgroundColor: '#0EA84C',
    duration: 5000,
  });
};
