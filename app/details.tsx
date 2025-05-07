// app/details.tsx
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFavoritesContext } from '@/context/FavoritesContext';

export default function DetailsScreen() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const title = String(params.title);
  const description = String(params.description);
  const group = String(params.group);
  const link = String(params.link);

  const { addFavorite } = useFavoritesContext();

  const handleAddToFavorites = () => {
    addFavorite({ title, description, group, link });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.group}>Group: {group}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(String(link)) }>
        <Text style={styles.buttonText}>Open Resource</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#ff667d' }]} onPress={ handleAddToFavorites }>
        <Text style={styles.buttonText}>Add to Favorites</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  group: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '65%',
    marginHorizontal: 'auto',
    backgroundColor: '#0362fc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});
