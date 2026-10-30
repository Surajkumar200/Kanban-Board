import React from "react";
import { Search, Filter, RotateCcw } from "lucide-react";

export function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  onReset,
}) {
  const hasActiveFilters =
    searchQuery || priorityFilter !== "All" || statusFilter !== "All";

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-6 flex flex-wrap gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[240px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter size={16} />
          <span className="font-medium">Filter:</span>
        </div>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Columns</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
