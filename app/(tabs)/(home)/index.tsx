import { StyleSheet, SafeAreaView, Platform, FlatList } from "react-native";
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import ResourceCard from "@/components/ResourceCard";
import { useRouter } from "expo-router";
import { useResourceContext } from "@/context/ResourcesContext";

export default function Index() {
  const router = useRouter();
  const Container = Platform.OS === 'web' ? Box : SafeAreaView;

  const { resources } = useResourceContext();

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(resources);

    // Update filteredData whenever resources change
    useEffect(() => {
      setFilteredData(resources);
    }, [resources]);

  function handleSearch(searchQuery: string) {
    setSearchText(searchQuery);

    const results = resources.filter(item => 
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.group.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(results);
  }

  return (
    <Container style={styles.container}>

      <Heading style={styles.homeTitle} size='2xl'>
        Spanish Learning Hub
      </Heading>

      <Input
        style={styles.input}
      >
        <InputField 
          placeholder='Search resources...'
          value = {searchText}
          onChangeText={handleSearch}
        />
      </Input>

      <FlatList
        style={{ marginTop: 15}}
        data={filteredData}
        keyExtractor={(item) => item.title}
        renderItem={({item}) => (
          <ResourceCard
            title={item.title}
            group={item.group}
            description={item.description}
            onPress={() =>
              router.push({
                pathname: '/details',
                params: item,
              })
            }
          />
        )}
      />

    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
    backgroundColor: "f0f0f0",
  },
  homeTitle: {
    marginBottom: 25,
    textAlign: 'center',
    color: '#4903fc',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});