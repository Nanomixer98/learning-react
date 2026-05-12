import { Bell, MessageSquare, Search, Settings } from "lucide-react";
import React, { useRef, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router";

export const AdminHeader: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const searchQuery = searchParams.get("query") || "";
  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    const query = inputRef.current?.value;
    const newSearchParams = new URLSearchParams();
    if (!query) {
      newSearchParams.delete("query");
    } else {
      newSearchParams.set("query", inputRef.current?.value || "");
    }
    setSearchParams(newSearchParams);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-18">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              onKeyDown={handleSearch}
              defaultValue={searchQuery}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            className="relative p-2 text-gray-400 cursor-not-allowed rounded-lg transition-colors"
            disabled
          >
            <Bell size={20} />
          </button>

          <button
            className="p-2 text-gray-400 cursor-not-allowed rounded-lg transition-colors"
            disabled
          >
            <MessageSquare size={20} />
          </button>

          <button
            className="p-2 text-gray-400 cursor-not-allowed rounded-lg transition-colors"
            disabled
          >
            <Settings size={20} />
          </button>

          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};
