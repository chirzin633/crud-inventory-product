"use client";

import { useState } from "react";

export default function AddProductModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    product_name: "",
    amount: "",
    qty: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.product_name.trim()) {
      newErrors.product_name = "Product name is required";
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.qty || parseInt(formData.qty) < 0) {
      newErrors.qty = "Quantity must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await onAdd({
        product_name: formData.product_name.trim(),
        amount: parseFloat(formData.amount),
        qty: parseInt(formData.qty),
      });

      // Reset form
      setFormData({ product_name: "", amount: "", qty: "" });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ product_name: "", amount: "", qty: "" });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden bg-white dark:bg-card-dark rounded-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transform transition-all">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb] dark:border-gray-800">
          <h3 className="text-lg font-bold text-[#111418] dark:text-white">Add New Product</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#111418] dark:text-gray-200">Product Name *</label>
              <input
                name="product_name"
                value={formData.product_name}
                onChange={(e) => handleChange(e)}
                className={`w-full h-11 px-4 rounded-lg border ${
                  errors.product_name ? "border-red-500 focus:ring-red-500/50" : "border-[#dbe0e6] dark:border-gray-700 focus:ring-primary/50"
                } bg-white dark:bg-[#101822] text-[#111418] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-shadow`}
                placeholder="e.g. Mechanical Keyboard"
                type="text"
                disabled={loading}
              />
              {errors.product_name && <p className="text-xs text-red-500">{errors.product_name}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#111418] dark:text-gray-200">Amount (USD) *</label>
                <input
                  name="amount"
                  value={formData.amount}
                  onChange={(e) => handleChange(e)}
                  className={`w-full h-11 px-4 rounded-lg border ${
                    errors.amount ? "border-red-500 focus:ring-red-500/50" : "border-[#dbe0e6] dark:border-gray-700 focus:ring-primary/50"
                  } bg-white dark:bg-[#101822] text-[#111418] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-shadow`}
                  placeholder="0.00"
                  step="0.01"
                  type="number"
                  min="0"
                  disabled={loading}
                />
                {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#111418] dark:text-gray-200">Quantity *</label>
                <input
                  name="qty"
                  value={formData.qty}
                  onChange={(e) => handleChange(e)}
                  className={`w-full h-11 px-4 rounded-lg border ${
                    errors.qty ? "border-red-500 focus:ring-red-500/50" : "border-[#dbe0e6] dark:border-gray-700 focus:ring-primary/50"
                  } bg-white dark:bg-[#101822] text-[#111418] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-shadow`}
                  placeholder="0"
                  type="number"
                  min="0"
                  disabled={loading}
                />
                {errors.qty && <p className="text-xs text-red-500">{errors.qty}</p>}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-[#e5e7eb] dark:border-gray-800">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-5 h-10 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 h-10 rounded-lg text-sm font-bold text-white bg-blue-500 hover:bg-blue-500/90 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Saving...
                </>
              ) : (
                "Save Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
