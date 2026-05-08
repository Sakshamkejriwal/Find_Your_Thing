import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow block overflow-hidden group">
      <img src={item.image || "https://placehold.co/400x300?text=No+Image"} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{item.name}</h3>
        <span className="inline-block text-xs font-medium bg-[#FFF0E6] text-[#D35400] px-2.5 py-1 rounded-md mb-3">{item.category}</span>
        <div className="text-gray-500 text-sm mb-4 truncate flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {item.location}
        </div>
        <div className="flex items-center justify-between border-t border-gray-50 pt-3">
          <div className="text-gray-400 text-xs truncate pr-2">{item.timestamp}</div>
          <Link to={`/item/${item.id}`} className="text-[#9B1B30] hover:text-[#801527] font-medium text-sm whitespace-nowrap flex items-center gap-1">
            View Details <span className="text-lg leading-none">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
