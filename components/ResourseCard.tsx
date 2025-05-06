import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Card } from '@/components/ui/card';

type Props = {
  title: string;
  description: string;
  group: string;
  onPress: () => void;
};

export default function ResourceCard({ title, description, group, onPress }: Props) {
  return (
    <Card style={styles.stepContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemGroup}>{group}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>{description}</Text>
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.itemLink}>See Details</Text>
        </TouchableOpacity> 
    </Card>
  );
}

const styles = StyleSheet.create({
    stepContainer: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0362fc',
        marginBottom: 8
    },
    itemGroup: {
        fontSize: 14,
        color: '#777',
        marginBottom: 4,
        paddingLeft: 6
    },
    itemDescription: {
        fontSize: 16,
        marginBottom: 6,
        fontWeight: '600',
        color: 'darkblue',
        paddingLeft: 6
    },
    itemLink: {
        color: '#1e90ff',
        textDecorationLine: 'underline',
        fontSize: 14,
        paddingLeft: 20
    }
});
