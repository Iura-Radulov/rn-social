import { View, StyleSheet, Text } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
