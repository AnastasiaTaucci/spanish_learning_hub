// app/details.tsx
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFavoritesContext } from '@/context/FavoritesContext';
import { useResourceContext } from '@/context/ResourcesContext';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { EditIcon, FavouriteIcon, TrashIcon } from '@/components/ui/icon';

export default function DetailsScreen() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const title = String(params.title);
  const description = String(params.description);
  const group = String(params.group);
  const link = String(params.link);
  const id = String(params.id);

  const { addFavorite } = useFavoritesContext();
  const { deleteResource } = useResourceContext();
  

  const handleAddToFavorites = () => {
    addFavorite({ title, description, group, link });
  };

  const handleDeleteResource = () => {
    deleteResource(id);

    // Navigate back to the previous screen
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.group}>Group: {group}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={[styles.button, styles.openButton]} onPress={() => Linking.openURL(String(link)) }>
        <Text style={[styles.buttonText, styles.openButtonText]}>Open Resource</Text>
      </TouchableOpacity>

      <Button 
        style={[styles.button, { backgroundColor: '#ff667d' }]}
        action="positive"
        onPress={ handleAddToFavorites }
      >
        <ButtonIcon as={FavouriteIcon} />
        <ButtonText>Add to Favorites</ButtonText>
      </Button>

      <Button 
        style={[styles.button, { backgroundColor: 'grey' }]}
        action="positive"
        onPress={ handleAddToFavorites }
      >
        <ButtonIcon as={EditIcon}/>
        <ButtonText>Edit</ButtonText>
      </Button>

      <Button 
        style={[styles.button, { backgroundColor: '#c20622' }]}
        action="positive"
        onPress={ handleDeleteResource }
      >
        <ButtonIcon as={TrashIcon}/>
        <ButtonText>Delete</ButtonText>
      </Button>

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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  group: {
    fontSize: 20,
    marginBottom: 8,
    color: '#555',
  },
  description: {
    fontSize: 18,
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
    // paddingHorizontal: 'auto',
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  openButton: {
    width: '75%',
    marginBottom: 30,
    marginHorizontal: 'auto',
    backgroundColor: '#0362fc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  openButtonText: {
    fontSize: 20,
  }
});
