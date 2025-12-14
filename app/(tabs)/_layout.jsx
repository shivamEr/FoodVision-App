import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../shared/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Meals") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "Progress") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="Home" options={{ title: 'Home' }} />
      <Tabs.Screen name="Meals" options={{ title: 'Meals' }} />
      <Tabs.Screen name="Progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="Profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
