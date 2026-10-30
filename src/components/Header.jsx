import React from "react";
import { Plus, Layout } from "lucide-react";

export function Header({ onOpenAddModal }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Layout size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Kanban Board</h1>
            <p className="text-xs text-gray-500">
              Manage tasks across progress stages
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <Plus size={18} />
          Add New Task
        </button>
      </div>
    </header>
  );
}
