import { Card } from "@/components/ui/card";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  title: string;
  description: string;
  group: string;
  onPress: () => void;
  remove?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export default function ResourceCard({
  title,
  description,
  group,
  onPress,
  remove,
  onToggleFavorite,
  isFavorite,
}: Props) {
  return (
    <Card style={styles.stepContainer}>
      <View style={styles.header}>
        <Text style={styles.itemTitle}>{title}</Text>
        {remove ? (
          <Pressable onPress={remove} hitSlop={25}>
            <FontAwesome5 name="heart-broken" size={26} color="#c20622" />
          </Pressable>
        ) : (
          <Pressable onPress={onToggleFavorite} hitSlop={25}>
            <AntDesign
              name={isFavorite ? "heart" : "hearto"}
              size={26}
              color={isFavorite ? "#c20622" : "#888"}
            />
          </Pressable>
        )}
      </View>
      <Text style={styles.itemGroup}>{group}</Text>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {description}
      </Text>
      <TouchableOpacity onPress={onPress} hitSlop={25}>
        <Text style={styles.itemLink}>See Details</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  itemTitle: {
    maxWidth: "80%",
    fontSize: 20,
    fontWeight: "700",
    color: "#0362fc",
  },
  itemGroup: {
    fontSize: 13,
    color: "#888",
    marginBottom: 4,
    paddingLeft: 2,
  },
  itemDescription: {
    lineHeight: 20,
    fontSize: 15,
    marginBottom: 8,
    fontWeight: "500",
    color: "#2a9d8f",
    paddingLeft: 2,
  },
  itemLink: {
    color: "#1e90ff",
    textDecorationLine: "underline",
    fontSize: 14,
    paddingLeft: 2,
    fontWeight: "600",
    marginTop: 4,
  },
});
