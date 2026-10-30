import React from "react";
import { TaskCard } from "./TaskCard";

const COLUMN_COLORS = {
  Todo: "bg-slate-500",
  "In Progress": "bg-blue-500",
  Completed: "bg-emerald-500",
};

export function KanbanColumn({
  title,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="flex flex-col bg-gray-50 rounded-2xl border border-gray-200/80 p-4 h-[calc(100vh-220px)] min-h-[450px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${COLUMN_COLORS[title] || "bg-gray-400"}`}
          />
          <h2 className="font-bold text-gray-800 text-base">{title}</h2>
        </div>
        <span className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Task List Container */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl text-center p-4">
            <p className="text-gray-400 text-xs font-medium">
              No tasks in {title}
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
