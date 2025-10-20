import { FlashList, useLayoutState } from "@shopify/flash-list";
import { useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Dummy data for the FlashList
const dummyData = [
  {
    id: "1",
    title: "Beautiful Sunset",
    description: "A stunning view of the sunset over the mountains",
    category: "Nature",
    rating: 4.8,
    image: "https://picsum.photos/100/100?random=1",
  },
  {
    id: "2",
    title: "City Lights",
    description: "Amazing city skyline at night with bright lights",
    category: "Urban",
    rating: 4.5,
    image: "https://picsum.photos/100/100?random=2",
  },
  {
    id: "3",
    title: "Ocean Waves",
    description: "Peaceful waves crashing on a pristine beach",
    category: "Nature",
    rating: 4.9,
    image: "https://picsum.photos/100/100?random=3",
  },
  {
    id: "4",
    title: "Mountain Peak",
    description: "Snow-capped mountain peak under clear blue sky",
    category: "Adventure",
    rating: 4.7,
    image: "https://picsum.photos/100/100?random=4",
  },
  {
    id: "5",
    title: "Forest Trail",
    description: "A winding trail through a lush green forest",
    category: "Nature",
    rating: 4.6,
    image: "https://picsum.photos/100/100?random=5",
  },
  {
    id: "6",
    title: "Desert Dunes",
    description: "Golden sand dunes stretching to the horizon",
    category: "Adventure",
    rating: 4.4,
    image: "https://picsum.photos/100/100?random=6",
  },
  {
    id: "7",
    title: "Lake Reflection",
    description: "Perfect mirror reflection of trees in calm lake",
    category: "Nature",
    rating: 4.8,
    image: "https://picsum.photos/100/100?random=7",
  },
  {
    id: "8",
    title: "Urban Architecture",
    description: "Modern architectural marvel in downtown area",
    category: "Urban",
    rating: 4.3,
    image: "https://picsum.photos/100/100?random=8",
  },
];

// Masonry data
const masonryData = [
  {
    id: "m1",
    title: "Tall Mountain",
    image: "https://picsum.photos/200/280?random=18",
    height: 280,
    span: 2,
  },
  {
    id: "m2",
    title: "Short Beach",
    image: "https://picsum.photos/200/180?random=12",
    height: 180,
    span: 1,
  },
  {
    id: "m3",
    title: "Medium Forest",
    image: "https://picsum.photos/200/220?random=40",
    height: 220,
    span: 3,
  },
  {
    id: "m4",
    title: "Extra Tall City",
    image: "https://picsum.photos/200/320?random=24",
    height: 320,
    span: 5,
  },
  {
    id: "m5",
    title: "Tiny Flower",
    image: "https://picsum.photos/200/160?random=15",
    height: 160,
    span: 2,
  },
  {
    id: "m6",
    title: "Regular Sunset",
    image: "https://picsum.photos/200/240?random=16",
    height: 240,
    span: 1,
  },
  {
    id: "m7",
    title: "Super Tall Waterfall",
    image: "https://picsum.photos/200/350?random=17",
    height: 350,
    span: 4,
  },
  {
    id: "m8",
    title: "Small Desert",
    image: "https://picsum.photos/200/170?random=18",
    height: 170,
    span: 2,
  },
  {
    id: "m9",
    title: "Medium Lake",
    image: "https://picsum.photos/200/200?random=19",
    height: 200,
    span: 3,
  },
  {
    id: "m10",
    title: "Tall Bridge",
    image: "https://picsum.photos/200/300?random=20",
    height: 300,
    span: 2,
  },
  {
    id: "m11",
    title: "Short Garden",
    image: "https://picsum.photos/200/190?random=21",
    height: 190,
    span: 1,
  },
  {
    id: "m12",
    title: "Giant Canyon",
    image: "https://picsum.photos/200/330?random=22",
    height: 330,
    span: 1,
  },
];

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

const sectionData: (string | Product)[] = [
  "Electronics",
  {
    id: "e1",
    title: "Wireless Headphones",
    description: "High-quality sound with noise cancellation",
    price: "$79.99",
    image: "https://picsum.photos/150/150?random=31",
    category: "Electronics",
  },
  {
    id: "e2",
    title: "Smart Watch",
    description: "Track your fitness and stay connected",
    price: "$199.99",
    image: "https://picsum.photos/150/150?random=32",
    category: "Electronics",
  },
  {
    id: "e3",
    title: "Bluetooth Speaker",
    description: "Portable speaker with amazing bass",
    price: "$49.99",
    image: "https://picsum.photos/150/150?random=33",
    category: "Electronics",
  },
  "Fashion",
  {
    id: "f1",
    title: "Designer T-Shirt",
    description: "Comfortable cotton blend fabric",
    price: "$29.99",
    image: "https://picsum.photos/150/150?random=34",
    category: "Fashion",
  },
  {
    id: "f2",
    title: "Denim Jeans",
    description: "Classic fit with premium denim",
    price: "$89.99",
    image: "https://picsum.photos/150/150?random=35",
    category: "Fashion",
  },
  "Home & Kitchen",
  {
    id: "h1",
    title: "Coffee Maker",
    description: "Brew the perfect cup every morning",
    price: "$119.99",
    image: "https://picsum.photos/150/150?random=36",
    category: "Home",
  },
  {
    id: "h2",
    title: "Air Fryer",
    description: "Healthy cooking with less oil",
    price: "$89.99",
    image: "https://picsum.photos/150/150?random=37",
    category: "Home",
  },
  {
    id: "h3",
    title: "Blender",
    description: "Powerful motor for smoothies and more",
    price: "$59.99",
    image: "https://picsum.photos/150/150?random=38",
    category: "Home",
  },
  "Sports & Outdoors",
  {
    id: "s1",
    title: "Running Shoes",
    description: "Lightweight and comfortable for long runs",
    price: "$129.99",
    image: "https://picsum.photos/150/150?random=39",
    category: "Sports",
  },
  {
    id: "s2",
    title: "Yoga Mat",
    description: "Non-slip surface for all yoga practices",
    price: "$39.99",
    image: "https://picsum.photos/150/150?random=40",
    category: "Sports",
  },
];

const relatedItemsData: Record<string, Product[]> = {
  Electronics: [
    {
      id: "re1",
      title: "Phone Case",
      description: "Protective case for smartphones",
      price: "$19.99",
      image: "https://picsum.photos/100/100?random=51",
      category: "Electronics",
    },
    {
      id: "re2",
      title: "Charger",
      description: "Fast charging cable",
      price: "$15.99",
      image: "https://picsum.photos/100/100?random=52",
      category: "Electronics",
    },
    {
      id: "re3",
      title: "Power Bank",
      description: "Portable battery pack",
      price: "$39.99",
      image: "https://picsum.photos/100/100?random=53",
      category: "Electronics",
    },
  ],
  Fashion: [
    {
      id: "rf1",
      title: "Sneakers",
      description: "Comfortable walking shoes",
      price: "$79.99",
      image: "https://picsum.photos/100/100?random=54",
      category: "Fashion",
    },
    {
      id: "rf2",
      title: "Backpack",
      description: "Stylish everyday backpack",
      price: "$49.99",
      image: "https://picsum.photos/100/100?random=55",
      category: "Fashion",
    },
    {
      id: "rf3",
      title: "Sunglasses",
      description: "UV protection eyewear",
      price: "$25.99",
      image: "https://picsum.photos/100/100?random=56",
      category: "Fashion",
    },
  ],
  "Home & Kitchen": [
    {
      id: "rh1",
      title: "Cutting Board",
      description: "Bamboo cutting board",
      price: "$24.99",
      image: "https://picsum.photos/100/100?random=57",
      category: "Home",
    },
    {
      id: "rh2",
      title: "Kitchen Scale",
      description: "Digital food scale",
      price: "$34.99",
      image: "https://picsum.photos/100/100?random=58",
      category: "Home",
    },
  ],
  "Sports & Outdoors": [
    {
      id: "rs1",
      title: "Water Bottle",
      description: "Insulated sports bottle",
      price: "$22.99",
      image: "https://picsum.photos/100/100?random=59",
      category: "Sports",
    },
    {
      id: "rs2",
      title: "Resistance Bands",
      description: "Fitness exercise bands",
      price: "$18.99",
      image: "https://picsum.photos/100/100?random=60",
      category: "Sports",
    },
  ],
};

const HorizontalListItem = ({ item }: { item: Product }) => {
  return (
    <View style={styles.horizontalListItem}>
      <Image source={{ uri: item.image }} style={styles.horizontalListImage} />
      <Text style={styles.horizontalListTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.horizontalListPrice}>{item.price}</Text>
    </View>
  );
};

// Section item component - handles both headers and items
const SectionItem = ({ item }: { item: string | Product }) => {
  // FlashList's useLayoutState for layout optimization
  const [isExpanded, setIsExpanded] = useLayoutState(false);

  const [animation] = useState(new Animated.Value(0));

  if (typeof item === "string") {
    const relatedItems = relatedItemsData[item] || [];

    const rotateInterpolation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    const handleToggle = () => {
      const newExpandedState = !isExpanded;
      setIsExpanded(newExpandedState); // Update FlashList's layout state

      // Animate the visual transition
      Animated.timing(animation, {
        toValue: newExpandedState ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };

    return (
      <View>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={handleToggle}
          activeOpacity={0.7}
        >
          <View style={styles.sectionHeaderContent}>
            <Text style={styles.sectionHeaderText}>{item}</Text>
            <Animated.View
              style={{ transform: [{ rotate: rotateInterpolation }] }}
            >
              <Text style={styles.expandIcon}>▼</Text>
            </Animated.View>
          </View>
        </TouchableOpacity>

        {/* Expanded horizontal list */}
        <Animated.View
          style={[
            styles.expandedContainer,
            {
              height: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 140],
              }),
              opacity: animation,
            },
          ]}
        >
          <FlashList
            data={relatedItems}
            renderItem={({ item }) => <HorizontalListItem item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          />
        </Animated.View>
      </View>
    );
  } else {
    // Rendering product item
    return (
      <View style={styles.horizontalItem}>
        <Image source={{ uri: item.image }} style={styles.horizontalImage} />
        <View style={styles.horizontalContent}>
          <Text style={styles.horizontalTitle}>{item.title}</Text>
          <Text style={styles.horizontalDescription}>{item.description}</Text>
          <View style={styles.horizontalFooter}>
            <Text style={styles.horizontalPrice}>{item.price}</Text>
            <View style={styles.horizontalCategory}>
              <Text style={styles.horizontalCategoryText}>{item.category}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const MasonryItem = ({ item }: { item: (typeof masonryData)[0] }) => {
  return (
    <View style={[styles.masonryItem, { height: item.height }]}>
      <Image source={{ uri: item.image }} style={styles.masonryImage} />
      <View style={styles.masonryOverlay}>
        <Text style={styles.masonryTitle}>{item.title}</Text>
      </View>
    </View>
  );
};

// Item render component for FlashList
const ListItem = ({ item }: { item: (typeof dummyData)[0] }) => {
  return (
    <View style={styles.listItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    </View>
  );
};

// First Screen  with FlashList
const FirstScreen = () => {
  return (
    <View style={styles.flashListContainer}>
      <Text style={styles.screenTitle}>FlashList View</Text>
      <FlashList
        data={dummyData}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        // estimatedItemSize={120}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashListContent}
        onStartReached={() => {
          // console.log("Start reached++++++++++++++");
        }}
        onStartReachedThreshold={0.1}
        onEndReached={() => {
          // console.log("End reached---------------");
        }}
        maxItemsInRecyclePool={2}
        onCommitLayoutEffect={() => {
          // console.log("Layout committed");
        }}
      />
    </View>
  );
};

// Second Screen with Masonry FlashList
const SecondScreen = () => {
  return (
    <View style={styles.flashListContainer}>
      <Text style={styles.screenTitle}>Masonry Grid</Text>
      <FlashList
        data={masonryData}
        renderItem={({ item }) => <MasonryItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.masonryContent}
        overrideItemLayout={(layout, item) => {
          layout.span = item.span;
        }}
        masonry
        // optimizeItemArrangement
      />
    </View>
  );
};

// Section FlashList
const ThirdScreen = () => {
  return (
    <View style={styles.flashListContainer}>
      <Text style={styles.screenTitle}>Product Categories</Text>
      <FlashList
        data={sectionData}
        renderItem={({ item }) => <SectionItem item={item} />}
        keyExtractor={(item, index) => {
          if (typeof item === "string") {
            return `section-${index}`;
          } else {
            return item.id;
          }
        }}
        // getItemType={(item) => {
        //   return typeof item === "string" ? "sectionHeader" : "row";
        // }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashListContent}
      />
    </View>
  );
};

export default function TabTwoScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.container}>
      {/* Top Button Navigation */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeTab === 0 && styles.activeButton]}
          onPress={() => setActiveTab(0)}
        >
          <Text
            style={[
              styles.buttonText,
              activeTab === 0 && styles.activeButtonText,
            ]}
          >
            FlashList
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeTab === 1 && styles.activeButton]}
          onPress={() => setActiveTab(1)}
        >
          <Text
            style={[
              styles.buttonText,
              activeTab === 1 && styles.activeButtonText,
            ]}
          >
            Masonry Grid
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeTab === 2 && styles.activeButton]}
          onPress={() => setActiveTab(2)}
        >
          <Text
            style={[
              styles.buttonText,
              activeTab === 2 && styles.activeButtonText,
            ]}
          >
            Products
          </Text>
        </TouchableOpacity>
      </View>

      {/* Screen Content */}
      <View style={styles.contentContainer}>
        {activeTab === 0 ? (
          <FirstScreen />
        ) : activeTab === 1 ? (
          <SecondScreen />
        ) : (
          <ThirdScreen />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  activeButtonText: {
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  screenContent: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  // FlashList specific styles
  flashListContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  flashListContent: {
    paddingVertical: 10,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  itemContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#007AFF",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  categoryContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2d5a2d",
  },
  // Masonry FlashList styles
  masonryContent: {
    //paddingHorizontal: 5,
    // paddingVertical: 10,
    paddingBottom: 100,
  },
  masonryItem: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  masonryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  masonryOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  masonryTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  // Horizontal list styles
  horizontalItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  horizontalImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  horizontalContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  horizontalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  horizontalDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
  },
  horizontalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horizontalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  horizontalCategory: {
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  horizontalCategoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#007AFF",
  },
  // Section header styles
  sectionHeader: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  sectionHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  expandIcon: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold",
  },
  // Expanded container styles
  expandedContainer: {
    marginHorizontal: 15,
    marginBottom: 8,
    overflow: "hidden",
  },
  horizontalScrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  // Horizontal list item styles
  horizontalListItem: {
    width: 100,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  horizontalListImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
  },
  horizontalListTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
    minHeight: 32,
  },
  horizontalListPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
