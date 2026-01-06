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
        return data;
      } else {
        const errorMessage = data.errors ? Object.values(data.errors).join(", ") : data.error || "Failed to add product";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      // Lempar error dengan pesan yang jelas
      throw new Error(error.message || "Failed to add product. Please try again.");
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
        return data;
      } else {
        throw new Error(data.errors || data.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
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
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex flex-col items-center py-10 px-6 sm:px-10 lg:px-20">
        <div className="w-full max-w-7xl flex flex-col gap-8">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex min-w-72 flex-col gap-2">
              <h1 className="text-[#111418] dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Inventory Dashboard</h1>
              <p className="text-[#617289] dark:text-gray-400 text-base font-normal leading-normal">Manage your product inventory, prices, and stock levels efficiently.</p>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">search</span>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="pl-10 pr-10 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              {searchTerm && (
                <button onClick={handleClearChange} className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="material-symbols-outlined text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">close</span>
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
              <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">inventory_2</span>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-500 dark:text-gray-400">Get started by adding your first product.</p>
            </div>
          ) : (
            <>
              <ProductTable products={products} onEdit={setEditingProduct} onDelete={handleDeleteProduct} />

              <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} totalItems={pagination.total} itemsPerPage={pagination.limit} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </main>

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddProduct} />

      {editingProduct && <EditProductModal product={editingProduct} onClose={() => setEditingProduct(null)} onUpdate={handleUpdateProduct} />}
    </div>
  );
}
