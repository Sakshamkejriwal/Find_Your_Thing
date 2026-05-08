import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORIES, addItem, getItemById, updateItem } from "../data/items";

function ReportItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const itemToEdit = getItemById(id);
      if (itemToEdit) {
        setFormData({
          name: itemToEdit.name,
          category: itemToEdit.category,
          description: itemToEdit.description,
          location: itemToEdit.location,
        });
        setImagePreview(itemToEdit.image);
      }
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
            width = width * ratio;
            height = height * ratio;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setImagePreview(compressedDataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateItem(id, { ...formData, image: imagePreview });
      navigate(`/item/${id}`);
    } else {
      addItem({ ...formData, image: imagePreview });
      navigate("/browse");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#9B1B30] mb-2">
            {isEditing ? "Edit Found Item" : "Report a Found Item"}
          </h1>
          <p className="text-gray-500 text-sm">Provide details to help the owner identify their item.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 space-y-6 shadow-sm">
          
          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-sm">Item Image</label>
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 relative overflow-hidden transition-colors hover:bg-gray-100">
              {imagePreview ? (
                <div className="relative group">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="bg-white text-gray-900 font-medium px-5 py-2.5 rounded-full shadow-sm cursor-pointer hover:bg-gray-50">
                      Change Image
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 cursor-pointer">
                  <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span className="text-gray-600 font-medium">Click to upload an image</span>
                  <span className="text-gray-400 text-sm mt-1">PNG, JPG up to 5MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2 text-sm">Item Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g. Blue Backpack" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-[#9B1B30] focus:ring-1 focus:ring-[#9B1B30] transition-all" 
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-2 text-sm">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-[#9B1B30] focus:ring-1 focus:ring-[#9B1B30] transition-all cursor-pointer"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2 text-sm">Where did you find it?</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="e.g. Main Library, 2nd floor desk" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-[#9B1B30] focus:ring-1 focus:ring-[#9B1B30] transition-all" 
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2 text-sm">Description / Details</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Add any helpful details about the item's condition or specific location..." 
              rows={4} 
              required 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-[#9B1B30] focus:ring-1 focus:ring-[#9B1B30] transition-all" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#9B1B30] hover:bg-[#801527] text-white font-medium py-3.5 rounded-full transition-colors mt-6"
          >
            {isEditing ? "Save Changes" : "Submit Report"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ReportItem;
