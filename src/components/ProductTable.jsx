"use client";

export default function ProductTable({ products, onEdit, onDelete }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#dbe0e6] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-200">
          <thead>
            <tr className="bg-[#f9fafb]  border-b border-[#dbe0e6] ">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#617289] w-[40%]">Product Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#617289] w-[20%]">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#617289] w-[20%]">Quantity</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#617289] w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dbe0e6] dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                      <span className="material-symbols-outlined">inventory</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#111418] dark:text-white">{product.product_name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#111418] dark:text-gray-200">{formatCurrency(product.amount)}</td>
                <td className="px-6 py-4 text-sm text-[#617289]">{product.qty} units</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(product)} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors" title="Edit">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => onDelete(product.id)} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors" title="Delete">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
