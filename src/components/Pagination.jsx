"use client";

export default function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-4 gap-4">
      <p className="text-sm text-gray-500 ">
        Showing <span className="font-medium text-[#111418] ">{startItem}</span> to <span className="font-medium text-[#111418] ">{endItem}</span> of <span className="font-medium text-[#111418] ">{totalItems}</span> results
      </p>
      <div className="flex items-center gap-1">
        <button onClick={handlePrevious} disabled={currentPage === 1} className="flex size-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="flex size-9 items-center justify-center text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === page ? "bg-primary text-white shadow-sm shadow-primary/30" : "text-[#111418] hover:bg-gray-100"}`}
            >
              {page}
            </button>
          )
        )}

        <button onClick={handleNext} disabled={currentPage === totalPages} className="flex size-9 items-center justify-center rounded-lg text-gray-500  hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
