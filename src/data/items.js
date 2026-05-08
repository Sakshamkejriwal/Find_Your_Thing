export const CATEGORIES = [
  "Keys", 
  "ID Card", 
  "Bottle", 
  "Charger/Cable", 
  "EarPods", 
  "Macbook", 
  "Personal", 
  "Ornaments", 
  "Stationary", 
  "Glasses", 
  "Electronics",
  "Wallet/Purse",
  "Clothing",
  "Others"
];

export const CURRENT_USER_ID = "user_123";
const STORAGE_KEY = "fyt_items";

export const getItems = () => {
  try {
    const itemsStr = localStorage.getItem(STORAGE_KEY);
    const parsedItems = itemsStr ? JSON.parse(itemsStr) : [];
    
    // Seed an item from another user to demonstrate the simulation
    // Only if local storage is completely empty
    if (parsedItems.length === 0) {
      const mockItem = {
        id: 999999,
        name: "Silver Water Bottle",
        category: "Personal",
        location: "Cafeteria",
        description: "Found a silver hydroflask on table 4.",
        image: null,
        timestamp: "2 hours ago",
        date: "Today",
        foundBy: "Jane Doe",
        userId: "other_user_456",
        status: "found"
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([mockItem]));
      return [mockItem];
    }
    
    return parsedItems;
  } catch (e) {
    return [];
  }
};

export const addItem = (item) => {
  const items = getItems();
  const newItem = {
    ...item,
    id: Date.now(),
    timestamp: "Just now",
    date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
    foundBy: "You",
    userId: CURRENT_USER_ID,
    status: "found",
  };
  const updatedItems = [newItem, ...items];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (e) {
    console.error("Image size error", e);
    throw e;
  }
  return newItem;
};

export const getItemById = (id) => {
  const items = getItems();
  return items.find((i) => i.id === Number(id));
};

export const updateItem = (id, updatedData) => {
  const items = getItems();
  const updatedItems = items.map((item) => 
    item.id === Number(id) ? { ...item, ...updatedData } : item
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (e) {
    console.error("Storage error:", e);
    alert("Could not update item! The image might be too large for local storage. Try without an image or use a smaller one.");
    throw e;
  }
};

export const deleteItem = (id) => {
  const items = getItems();
  const updatedItems = items.filter((item) => item.id !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
};
