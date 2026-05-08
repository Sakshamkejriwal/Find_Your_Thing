import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getItemById, deleteItem, CURRENT_USER_ID } from "../data/items";

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notified, setNotified] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(getItemById(id));
  }, [id]);

  if (!item) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found or loading...</h2>
        <Link to="/browse" className="text-blue-600 hover:underline">Go Back to Browse</Link>
      </div>
    );
  }

  const handleContactOwner = () => {
    setNotified(true);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you returned this item to its owner?")) {
      deleteItem(id);
      navigate("/browse");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/browse" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 font-medium transition-colors">
          &larr; Back to Browse
        </Link>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm grid md:grid-cols-2 overflow-hidden">
            {/* Image */}
            <div className="bg-gray-50 flex items-center justify-center p-6 sm:p-10 border-b md:border-b-0 md:border-r border-gray-100">
               <img 
                 src={item.image || "https://placehold.co/800x600?text=No+Image"} 
                 alt={item.name} 
                 className="w-full h-full object-cover max-h-[400px] rounded-2xl shadow-sm" 
               />
            </div>

            {/* Details */}
            <div className="p-8 sm:p-10 flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-[#FFF0E6] text-[#D35400] font-medium px-3 py-1 text-xs rounded-md">
                  {item.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h1>
              <p className="text-gray-600 mb-8 flex-1 leading-relaxed">{item.description}</p>

              <div className="space-y-4 mb-8 bg-[#F8F9FA] p-5 rounded-2xl border border-gray-100">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</p>
                    <p className="text-gray-800 font-medium">{item.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reported on</p>
                    <p className="text-gray-800 font-medium">{item.date}</p>
                  </div>
                </div>
              </div>

              {/* Only show contact info if we didn't report it */}
              {(item.userId !== CURRENT_USER_ID && item.foundBy !== "Current User") && (
                notified ? (
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center mb-4">
                    <p className="text-green-800 font-medium">Notification sent! They will reach out shortly.</p>
                  </div>
                ) : (
                  <button 
                    onClick={handleContactOwner} 
                    className="w-full bg-[#9B1B30] hover:bg-[#801527] text-white font-medium py-3.5 rounded-full transition-colors mb-4 flex items-center justify-center gap-2"
                  >
                    Contact who found it
                  </button>
                )
              )}

              {/* Edit / Delete Options Only for our own items */}
              {(item.userId === CURRENT_USER_ID || item.foundBy === "Current User") && (
                <div className="border-t border-gray-100 pt-6 mt-2">
                  <p className="text-xs text-gray-400 mb-4 font-semibold uppercase tracking-wider">Manage Your Report</p>
                  <div className="flex gap-3">
                    <Link 
                      to={`/edit/${item.id}`}
                      className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-center py-2.5 rounded-full transition-colors"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={handleDelete}
                      className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 font-medium text-center py-2.5 rounded-full transition-colors"
                    >
                      Got to the owner
                    </button>
                  </div>
                </div>
              )}

            </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
