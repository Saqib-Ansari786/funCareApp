import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Appbar } from "react-native-paper";

const BookingScreen = () => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Product 1",
      description: "Product 1 description",
      price: 10,
      status: "pending",
    },
    {
      id: 2,
      title: "Product 2",
      description: "Product 2 description",
      price: 20,
      status: "confirmed",
    },
    {
      id: 3,
      title: "Product 3",
      description: "Product 3 description",
      price: 70,
      status: "pending",
    },
    {
      id: 4,
      title: "Product 3",
      description: "Product 3 description",
      price: 70,
      status: "pending",
    },
    {
      id: 5,
      title: "Product 3",
      description: "Product 3 description",
      price: 70,
      status: "pending",
    },
  ]);

  const handlePayment = (productId) => {
    // Implement payment logic here
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          status: "confirmed",
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const pendingProducts = products.filter(
    (product) => product.status === "pending"
  );
  const confirmedProducts = products.filter(
    (product) => product.status === "confirmed"
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "pending" && styles.activeTab]}
          onPress={() => setSelectedTab("pending")}
        >
          <Text style={styles.tabText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "confirmed" && styles.activeTab]}
          onPress={() => setSelectedTab("confirmed")}
        >
          <Text style={styles.tabText}>Confirmed</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === "pending" ? (
        <ScrollView>
          {pendingProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productDescription}>
                {product.description}
              </Text>
              <Text style={styles.productPrice}>{`$${product.price}`}</Text>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => handlePayment(product.id)}
              >
                <Text style={styles.payButtonText}>Pay</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView>
          {confirmedProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productDescription}>
                {product.description}
              </Text>
              <Text style={styles.productPrice}>{`$${product.price}`}</Text>
              <Text style={styles.confirmedText}>Confirmed</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  activeTab: {
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  payButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  payButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  confirmedText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default BookingScreen;
