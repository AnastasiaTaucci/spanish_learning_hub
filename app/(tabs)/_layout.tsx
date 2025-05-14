import { Tabs, useRouter } from 'expo-router';
import React from 'react';

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Fab, FabIcon } from '@/components/ui/fab';
import { Box } from '@/components/ui/box';
import { AddIcon } from '@/components/ui/icon';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Box className='flex-1'>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          headerShown: false,
        }}>
        <Tabs.Screen
          name="(home)"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Entypo name="home" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color }) => <AntDesign name="heart" size={24} color={color} />,
          }}
        />
      </Tabs>
      <Fab
        size='lg'
        className='bottom-32 dark:bg-zinc-700'
        onPress={() => router.navigate('/addResource')}
      >
        <FabIcon as={AddIcon} color="white"/>
      </Fab>
    </Box>
  );
}