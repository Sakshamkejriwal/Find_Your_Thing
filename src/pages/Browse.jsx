import { useState, useEffect } from "react";
import { CATEGORIES, getItems } from "../data/items";
import ItemCard from "../components/ItemCard";

function Browse() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setItems(getItems());
  }, []);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(item.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
          <h3 className="font-semibold text-gray-900 mb-6 text-lg border-b border-gray-50 pb-3">Filters</h3>
          
          <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Categories</p>
          <div className="space-y-1">
            {CATEGORIES.map((cat) => (
              <label key={cat} className={`flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-colors ${selectedCategories.includes(cat) ? "bg-[#FFF0E6] text-[#D35400]" : "hover:bg-gray-50 text-gray-600"}`}>
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(cat)} 
                  onChange={() => toggleCategory(cat)} 
                  className="hidden" 
                />
                <span className="font-medium text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </aside>

          {/* Main */}
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#9B1B30] mb-2">Lost Items Feed</h1>
              <p className="text-gray-500 text-sm">Browse items found across campus.</p>
            </div>

            <div className="mb-8">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for items by name or description..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-12 pr-6 py-3.5 rounded-full border border-gray-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:border-[#9B1B30] focus:ring-1 focus:ring-[#9B1B30] transition-all" 
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 font-medium text-lg">No items match your search.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </main>
      </div>
    </div>
  );
}

export default Browse;
