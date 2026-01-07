"use client";

import Header from "@/components/Header";
import ProductTable from "@/components/ProductTable";
import AddProductModal from "@/components/AddProductModal";
import EditProductModal from "@/components/EditProductModal";
import Pagination from "@/components/Pagination";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
  });
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 3000);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
        setPagination((prev) => ({
          ...prev,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
        }));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleClearChange = () => {
    setSearchTerm("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        fetchProducts();
        return {
          success: true,
          message: data.message,
          errors: data.errors,
        };
      } else {
        const error = new Error(data.error || "Failed to add product");
        error.errors = data.errors;
        throw error;
      }
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        fetchProducts();
        showNotification("success", data.message || "Product updated successfully");
        return data;
      } else {
        const error = new Error(data.error || "Failed to update product");
        error.errors = data.errors;
        throw error;
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showNotification("error", error.message || "Failed to update product");
      throw error;
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        fetchProducts();
        showNotification("success", data.message || "Product deleted successfully");
      } else {
        showNotification("error", data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("error", "Failed to delete product");
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      {notification.show && (
        <div className="fixed top-4 right-4 z-100 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${notification.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
            <div className="flex items-center gap-2">
              {notification.type === "success" ? <span className="material-symbols-outlined text-green-600">check_circle</span> : <span className="material-symbols-outlined text-red-600">error</span>}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </div>
        </div>
      )}
      <main className="flex-1 flex flex-col items-center py-10 px-6 sm:px-10 lg:px-20">
        <div className="w-full max-w-7xl flex flex-col gap-8">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex min-w-72 flex-col gap-2">
              <h1 className="text-[#111418] text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Inventory Dashboard</h1>
              <p className="text-[#617289] text-base font-normal leading-normal">Manage your product inventory, prices, and stock levels efficiently.</p>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">search</span>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="pl-10 pr-10 py-2 w-full sm:w-64 border border-gray-300 rounded-lg bg-white  text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              {searchTerm && (
                <button onClick={handleClearChange} className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="material-symbols-outlined text-gray-400 hover:text-gray-600 ">close</span>
                </button>
              )}
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-blue-700 hover:bg-sky-500/50 transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="truncate">Add New Product</span>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-gray-300  mb-4">inventory_2</span>
              <h3 className="text-lg font-medium text-gray-900  mb-2">No products found</h3>
              <p className="text-gray-500 ">Get started by adding your first product.</p>
            </div>
          ) : (
            <>
              <ProductTable products={products} onEdit={setEditingProduct} onDelete={handleDeleteProduct} />

              <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} totalItems={pagination.total} itemsPerPage={pagination.limit} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </main>

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddProduct} showNotification={showNotification} />

      {editingProduct && <EditProductModal product={editingProduct} onClose={() => setEditingProduct(null)} onUpdate={handleUpdateProduct} showNotification={showNotification} />}
    </div>
  );
}
