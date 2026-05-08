import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getItems, CURRENT_USER_ID } from "../data/items";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const allItems = getItems();
    const myItems = allItems.filter(item => item.userId === CURRENT_USER_ID || item.foundBy === "Current User");
    setItems(myItems);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* ─── Hero Section ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-white shadow-sm mb-12 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Lost something? 
            <br />
            <span className="text-[#9B1B30]">Find it here.</span>
          </h1>

          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
            Find your lost belongings on campus. 
            Connect with finders instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/browse"
              className="w-full sm:w-auto bg-[#9B1B30] hover:bg-[#801527] text-white font-medium px-8 py-3.5 rounded-full transition-colors"
            >
              I Lost an Item
            </Link>
            <Link
              to="/report"
              className="w-full sm:w-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-8 py-3.5 rounded-full transition-colors shadow-sm"
            >
              I Found an Item
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Reported Items ─── */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Items You've Reported
            </h2>
            <p className="text-gray-500 font-medium mt-1">Items you have found and reported</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">No items have been reported yet. Be the first!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow block overflow-hidden"
              >
                <div className="relative border-b border-gray-100">
                  <img
                    src={item.image || "https://placehold.co/400x300?text=No+Image"}
                    alt={item.name}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg truncate mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm truncate flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {item.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
