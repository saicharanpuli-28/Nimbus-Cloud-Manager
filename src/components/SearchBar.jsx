import { Search } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-all">
      <Search
        size={18}
        className="text-slate-400"
      />

      <input
        type="text"
        placeholder="Search your files..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent flex-1 ml-3 outline-none text-white placeholder:text-slate-500"
      />
    </div>
  );
}

export default SearchBar;