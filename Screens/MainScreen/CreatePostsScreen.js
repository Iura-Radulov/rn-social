import { View, StyleSheet, Text } from 'react-native';

export default function CreatePostScreen() {
  return (
    <View style={styles.container}>
      <Text>Создать пост</Text>
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
