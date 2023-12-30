import { StyleSheet } from 'react-native';
import { Theme } from '../../constant/Theme';

const theme = Theme();
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    width: '90%',
    marginBottom: -20,
  },
  row: {
    width: '90%',
    marginTop: 30,
  },
  loginButton: {
    width: '70%',
    transform: [{ translateX: -10 }],
  },
  loginButtonNotSupported: {
    width: '100%',
    transform: [{ translateX: -10 }],
  },
  fingerButton: {
    width: '20%',
  },
  text: {
    fontSize: theme.window.windowWidth > 600 ? 20 : 16,
  },
  link: {
    color: theme.palette.secondary,
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  errText: {
    textAlign: 'center',
    fontSize: 20,
    color: theme.palette.red,
    marginTop: 20,
    marginBottom: -20,
  },
  headerText: {
    fontSize: 20,
    color: theme.palette.black,
    textAlign: 'center',
    transform: [{ translateY: 30 }],
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'capitalize',
  },
  name: {
    marginBottom: 10,
  },
});
