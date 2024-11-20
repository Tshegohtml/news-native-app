import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Linking } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; 

// API Key
const API_KEY = "9a45d8a7572c4bbeb1cd2e1bd99ae90c";

const Tab = createMaterialTopTabNavigator();

function NewsScreen({ category, setHeaderTitle }) {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setHeaderTitle(category.charAt(0).toUpperCase() + category.slice(1));

    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`);
        setNewsData(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, setHeaderTitle]);

  const addToFavorites = (article) => {
    setFavorites([...favorites, article]);
  };

  const removeFromFavorites = (article) => {
    setFavorites(favorites.filter((fav) => fav.title !== article.title));
  };

  const openArticle = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <View style={styles.newsCard}>
      {item.urlToImage && (
        <TouchableOpacity onPress={() => openArticle(item.url)}>
          <Image source={{ uri: item.urlToImage }} style={styles.image} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Source: {item.source.name}</Text>
      <TouchableOpacity onPress={() => addToFavorites(item)} style={styles.button}>
        <Text style={styles.buttonText}>Add to Favorites</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFavorites = () => (
    <FlatList
      data={favorites}
      renderItem={({ item }) => (
        <View style={styles.newsCard}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity onPress={() => removeFromFavorites(item)} style={styles.button}>
            <Text style={styles.buttonText}>Remove from Favorites</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.title}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top News</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={newsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
          />
          <Text style={styles.header}>Favorites</Text>
          {renderFavorites()}
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const [headerTitle, setHeaderTitle] = useState("Top News");

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Top Headlines"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent', // Transparent background
            elevation: 0, // Remove shadow for a cleaner look
            borderBottomWidth: 0, // Remove bottom border
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#000', // Black text for labels
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#000', // Black indicator color for active tab
            height: 3, // Indicator height
          },
        }}
      >
        <Tab.Screen name="Top Headlines">
          {() => <NewsScreen category="general" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Sports">
          {() => <NewsScreen category="sports" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Technology">
          {() => <NewsScreen category="technology" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Entertainment">
          {() => <NewsScreen category="entertainment" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Business">
          {() => <NewsScreen category="business" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Health">
          {() => <NewsScreen category="health" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Politics">
          {() => <NewsScreen category="politics" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Science">
          {() => <NewsScreen category="science" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Lifestyle">
          {() => <NewsScreen category="lifestyle" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="World News">
          {() => <NewsScreen category="world" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Weather">
          {() => <NewsScreen category="weather" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Finance">
          {() => <NewsScreen category="finance" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Education">
          {() => <NewsScreen category="education" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
        <Tab.Screen name="Local News">
          {() => <NewsScreen category="local" setHeaderTitle={setHeaderTitle} />}
        </Tab.Screen>
      </Tab.Navigator>
      <View style={styles.headerContainer}>
        <Text style={styles.dynamicHeader}>{headerTitle}</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  dynamicHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  newsCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  source: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2e8b57',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  favoritesContainer: {
    marginTop: 20,
  },
  favoritesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  favoritesList: {
    marginTop: 10,
  },
  favoriteItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 10,
  },
  removeButton: {
    backgroundColor: '#d9534f',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Mobile responsiveness
  '@media (max-width: 600)': {
    dynamicHeader: {
      fontSize: 20,
    },
    title: {
      fontSize: 16,
    },
    description: {
      fontSize: 12,
    },
    source: {
      fontSize: 10,
    },
    buttonText: {
      fontSize: 14,
    },
    removeButtonText: {
      fontSize: 14,
    },
  },
});

