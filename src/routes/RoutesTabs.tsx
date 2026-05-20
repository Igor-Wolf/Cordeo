import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Home from "../views/Home/Home";
import Second from "../views/Second/Second";
import Dictionary from "../views/Dictionary/Dictionary";
import About from "../views/About/About";

const Tab = createBottomTabNavigator();

export default function RoutesTabs() {
  // Mapeamento dos ícones para cada aba
  const icons: Record<string, { focused: string; unfocused: string }> = {
    Ponteiro: { focused: "gauge", unfocused: "gauge" },
    Faixa: { focused: "waveform", unfocused: "waveform" },
    Dicionario: { focused: "book-open-page-variant", unfocused: "book-open-page-variant-outline" },
  };

  return (
    <Tab.Navigator
      initialRouteName="Ponteiro" // A rota inicial será 'Home'
      screenOptions={({ route }) => ({
        unmountOnBlur: true,

        tabBarIcon: ({ focused, color, size }) => {
          const icon = icons[route.name];

          const iconName = icon
            ? focused
              ? icon.focused
              : icon.unfocused
            : "help-circle-outline";

          if (iconName === "gauge") {
            return <Entypo name="gauge" size={size} color={color} />;
          } else if(iconName==="waveform"){          

            return <MaterialCommunityIcons name="waveform" size={size} color={color} />
          }        
           else if(iconName==="book-open-page-variant"){          

            return <MaterialCommunityIcons name="book-open-page-variant" size={size} color={color} />
          }        
           else if(iconName==="book-open-page-variant-outline"){          

            return <MaterialCommunityIcons name="book-open-page-variant-outline" size={size} color={color} />
          }        
          else {
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "black",
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#00ff88",
        tabBarInactiveTintColor: "gray",

        headerStyle: {
          borderBottomColor: "gray",
          borderWidth: 1,
          backgroundColor: "black",
        },
        headerTintColor: "tomato",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="Ponteiro"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Faixa"
        component={Second}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Dicionario"
        component={Dictionary}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Sobre"
        component={About}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
