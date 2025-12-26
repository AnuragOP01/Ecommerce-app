import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore, Product } from '../../store/cartStore';

// Mock product data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    image: require('../../assets/images/iPhone_15.webp'),
    description: 'High-quality wireless headphones with noise cancellation',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: require('../../assets/images/iPhone_15.webp'),
    description: 'Feature-rich smartwatch with health tracking',
  },
  {
    id: '3',
    name: 'Phone Case',
    price: 24.99,
    image: require('../../assets/images/iPhone_15.webp'),
    description: 'Durable protective case for your smartphone',
  },
  {
    id: '4',
    name: 'Laptop Stand',
    price: 49.99,
    image: require('../../assets/images/iPhone_15.webp'),
    description: 'Ergonomic adjustable laptop stand',
  },
  {
    id: '5',
    name: 'USB-C Cable',
    price: 14.99,
    image: require('../../assets/images/iPhone_15.webp'),
    description: 'Fast charging USB-C cable - 6ft',
  },
  {
    id: '6',
    name: 'Portable Charger',
    price: 39.99,
    image: require('../../assets/images/iPhone_15.webp'),
    description: '20000mAh portable power bank',
  },
];

export default function ProductsScreen() {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Ionicons name="cart" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
