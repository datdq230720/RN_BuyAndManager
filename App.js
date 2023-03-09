import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Navigation } from './src/screens/navigation/Navigation'
import { ProductContextProvider } from './src/screens/product/ProductContext';
import { UserContextProvider } from './src/screens/user/UserContext';

export default function App() {
  return (
    <UserContextProvider>
    <ProductContextProvider>
      <Navigation />
    </ProductContextProvider>
  </UserContextProvider>
  );
}

const styles = StyleSheet.create({
});
