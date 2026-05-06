import React, { useState, useEffect } from "react";
import {
  fetchProducts,
  addProduct as uploadToDb,
  deleteProduct as deleteFromDb,
} from "../../api/productAp"; // API helpers
import { useUser } from "../context/UserContext";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersSent] = useState(128); // Mock metric
  const { logout } = useUser();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "0",
    image: "",
    fit: "",
    category: "Jeans",
    gender: "",
    sizes: "30, 32, 34, 36",
    description: "Premium denim archive piece.", // Added for database consistency
  });

  // 1. LOAD PRODUCTS FROM DATABASE ON MOUNT
  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to sync with registry", err);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  // 2. SEND NEW PRODUCT TO MONGODB
const handleSubmit = async (e) => {
  e.preventDefault();

  const productToUpload = {
    name: newProduct.name,
    image: newProduct.image,
    description: newProduct.description,
    gender: newProduct.gender,
    category: newProduct.category || "Jeans",
    fit: newProduct.fit,
    price: parseFloat(newProduct.price),
    stock: parseInt(newProduct.stock),
    // Clean up the size array
    sizes: newProduct.sizes
      ? newProduct.sizes.split(",").map((s) => s.trim())
      : [],
  };

  try {
    // Logic for sending to MongoDB
    const { data } = await uploadToDb(productToUpload);
    setProducts([data, ...products]);

    // Reset Form Protocol
    setNewProduct({
      name: "",
      price: "",
      stock: "0",
      image: "",
      fit: "Slim Fit",
      category: "Jeans",
      gender: "",
      sizes: "30, 32, 34, 36",
      description: "Premium denim archive piece.",
    });

    alert("PRODUCT ARCHIVED SUCCESSFULLY");
  } catch (err) {
    console.error("Mongoose Validation Error:", err.response?.data);
    alert(err.response?.data?.message || "CHECK GENDER AND FIT SELECTIONS");
  }
};

  // 3. DELETE FROM DATABASE (TERMINATE PROTOCOL)
  const terminateProduct = async (id) => {
    if (window.confirm("CONFIRM TERMINATION OF ITEM?")) {
      try {
        await deleteFromDb(id);
        setProducts(products.filter((item) => item._id !== id));
      } catch (err) {
        alert("TERMINATION FAILED");
      }
    }
  };

  if (loading)
    return (
      <div className="bg-black text-white h-screen p-24">
        SYNCING ADMIN CENTER...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24 font-['Inter']">
      <div className="flex items-center justify-between mb-8 pr-4">
        <h1 className="text-4xl font-black italic border-b-2 border-red-600 inline-block">
          ADMIN DASHBOARD
        </h1>
        <button
          onClick={logout}
          className="text-[10px] font-black tracking-[0.3em] border border-zinc-800 px-6 py-3 hover:border-red-600 hover:text-red-600 transition-all"
        >
          LOGOUT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-[#111] p-6 border border-zinc-800">
          <p className="text-zinc-500 text-[10px] tracking-[0.2em] mb-1">
            REGISTRY TOTAL
          </p>
          <p className="text-2xl font-bold">{products.length} ITEMS</p>
        </div>
        <div className="bg-[#111] p-6 border border-zinc-800">
          <p className="text-zinc-500 text-[10px] tracking-[0.2em] mb-1">
            DISPATCHED UNITS
          </p>
          <p className="text-2xl font-bold text-red-600">{ordersSent}</p>
        </div>
      </div>

      <section className="bg-[#0f0f0f] border border-zinc-800 p-8 mb-12">
        <h2 className="text-xs font-black tracking-[0.4em] mb-8 text-zinc-400">
          NEW PRODUCT PROTOCOL
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* LEFT COLUMN: Name, Image, Price, Stock */}
          <div className="space-y-4">
            <input
              required
              placeholder="Product Name"
              className="w-full bg-black border border-zinc-800 p-4 text-xs outline-none focus:border-red-600"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <input
              required
              placeholder="Image URL"
              className="w-full bg-black border border-zinc-800 p-4 text-xs outline-none focus:border-red-600"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <div className="flex gap-4">
              <input
                required
                type="number"
                placeholder="Price"
                className="w-1/2 bg-black border border-zinc-800 p-4 text-xs outline-none"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <input
                required
                type="number"
                placeholder="Stock"
                className="w-1/2 bg-black border border-zinc-800 p-4 text-xs outline-none"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Sizes, Fit, Gender, Category */}
          <div className="space-y-4">
            <input
              placeholder="Sizes (30, 32, 34)"
              className="w-full bg-black border border-zinc-800 p-4 text-xs outline-none"
              value={newProduct.sizes}
              onChange={(e) =>
                setNewProduct({ ...newProduct, sizes: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                required
                className="bg-black border border-zinc-800 p-4 text-xs text-zinc-400 outline-none"
                value={newProduct.fit}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, fit: e.target.value })
                }
              >
                <option value="" disabled>Select Fit</option>
                <option value="Slim Fit">Slim Fit</option>
                <option value="Oversized">Oversized</option>
                <option value="Straight Leg">Straight Leg</option>
              </select>
              <select
                required
                className="bg-black border border-zinc-800 p-4 text-xs text-zinc-400 outline-none"
                value={newProduct.gender}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, gender: e.target.value })
                }
              >
                <option value="" disabled>Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>
            <input
              placeholder="Category (Jeans, Jackets)"
              className="w-full bg-black border border-zinc-800 p-4 text-xs outline-none"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
          </div>

          {/* THE CENTERED POCKET BUTTON: Below both but between them */}
          <div className="md:col-span-2 flex justify-center -mt-2">
            <button className="w-full md:w-1/3 bg-red-600 py-4 text-[10px] font-black tracking-[0.3em] hover:bg-white hover:text-black transition-all">
              UPLOAD TO CATALOG
            </button>
          </div>
        </form>
      </section>

      <div className="space-y-2">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex items-center justify-between bg-[#111] p-4 border border-zinc-900 group"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.image}
                alt=""
                className="w-12 h-12 object-cover border border-zinc-800"
              />
              <div>
                <p className="text-sm font-bold">{p.name}</p>
                <p className="text-[10px] text-zinc-500 uppercase">
                  {p.fit} | {p.sizes?.join(", ")}
                </p>
              </div>
            </div>
            <button
              onClick={() => terminateProduct(p._id)}
              className="text-[12px] font-bold hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              TERMINATE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
