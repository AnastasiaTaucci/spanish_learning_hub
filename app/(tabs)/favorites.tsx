import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFavoritesContext } from "@/context/FavoritesContext";
import ResourceCard from "@/components/ResourceCard";
import { useRouter } from "expo-router";
import { useResourceContext } from "@/context/ResourcesContext";

export default function FavoritesScreen() {
  const router = useRouter();

  const { resources } = useResourceContext();
  const { favorites, removeFavorite } = useFavoritesContext();

  const favoriteResources = resources.filter((resource) =>
    favorites.includes(resource.id),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Resources</Text>

      {favorites.length === 0 ? (
        <Text style={styles.message}>
          No favorites yet. Add some from the details page!
        </Text>
      ) : (
        <FlatList
          style={{ paddingTop: 10 }}
          data={favoriteResources}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ResourceCard
              title={item.title}
              group={item.group}
              description={item.description}
              remove={() => removeFavorite(item.id)}
              onPress={() =>
                router.push({
                  pathname: "/[id]",
                  params: item,
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 40,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0362fc",
    marginBottom: 4,
  },
  cardGroup: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 16,
    color: "#333",
  },
});
