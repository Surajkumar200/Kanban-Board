import React from "react";
import { Calendar, Edit2, Trash2, ArrowLeft, ArrowRight } from "lucide-react";

const PRIORITY_STYLES = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const COLUMNS = ["Todo", "In Progress", "Completed"];

export function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const currentColumnIndex = COLUMNS.indexOf(task.status);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
              PRIORITY_STYLES[task.priority] ||
              "bg-gray-50 text-gray-600 border-gray-200"
            }`}
          >
            {task.priority} Priority
          </span>

          <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
              title="Edit Task"
            >
              <Edit2 size={15} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
              title="Delete Task"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
          {task.title}
        </h3>
        <p className="text-gray-600 text-xs mb-3 line-clamp-3">
          {task.description}
        </p>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar size={13} />
          <span>{task.dueDate || "No due date"}</span>
        </div>

        {/* Quick Move Buttons */}
        <div className="flex items-center gap-1">
          {currentColumnIndex > 0 && (
            <button
              onClick={() =>
                onStatusChange(task.id, COLUMNS[currentColumnIndex - 1])
              }
              className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-800 cursor-pointer"
              title={`Move to ${COLUMNS[currentColumnIndex - 1]}`}
            >
              <ArrowLeft size={14} />
            </button>
          )}
          {currentColumnIndex < COLUMNS.length - 1 && (
            <button
              onClick={() =>
                onStatusChange(task.id, COLUMNS[currentColumnIndex + 1])
              }
              className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-800 cursor-pointer"
              title={`Move to ${COLUMNS[currentColumnIndex + 1]}`}
            >
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
