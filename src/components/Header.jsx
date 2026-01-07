export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e7eb] bg-white px-3 sm:px-10 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="size-8 flex items-center justify-center rounded-lg bg-sky-100 text-blue-600">
          <span className="material-symbols-outlined text-2xl">inventory_2</span>
        </div>
        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Product Management</h2>
      </div>
    </header>
  );
}
