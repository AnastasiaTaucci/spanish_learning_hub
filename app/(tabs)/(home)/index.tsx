import ResourceCard from "@/components/ResourceCard";
import { Heading } from "@/components/ui/heading";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { useResourceContext } from "@/context/ResourcesContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const { resources } = useResourceContext();
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(resources);

  // Update filteredData whenever resources change
  useEffect(() => {
    setFilteredData(resources);
  }, [resources]);

  function handleSearch(searchQuery: string) {
    setSearchText(searchQuery);

    const results = resources.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(results);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Heading style={styles.homeTitle} size="2xl">
          Spanish Learning Hub
        </Heading>

        <Input style={styles.input}>
          <InputIcon as={SearchIcon} />
          <InputField
            placeholder="Search resources..."
            value={searchText}
            onChangeText={handleSearch}
          />
        </Input>

        <FlatList
          style={{ paddingTop: 10 }}
          data={filteredData}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => {
            const isFavorite = favorites.includes(item.id);

            return (
              <ResourceCard
                title={item.title}
                group={item.group}
                description={item.description}
                onPress={() =>
                  router.push({
                    pathname: "/[id]",
                    params: item,
                  })
                }
                isFavorite={isFavorite}
                onToggleFavorite={() => {
                  if (isFavorite) {
                    removeFavorite(item.id);
                  } else {
                    addFavorite(item.id);
                  }
                }}
              />
            );
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f9f9f9",
  },
  homeTitle: {
    marginBottom: 25,
    textAlign: "center",
    color: "#4903fc",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
