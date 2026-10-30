import React from "react";
import { KanbanColumn } from "./KanbanColumn";
import { Inbox } from "lucide-react";

const COLUMNS = ["Todo", "In Progress", "Completed"];

export function KanbanBoard({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  isFiltered,
}) {
  if (tasks.length === 0 && isFiltered) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-8 shadow-xs">
        <div className="inline-flex p-3 bg-gray-100 text-gray-400 rounded-full mb-3">
          <Inbox size={32} />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          No matching tasks found
        </h3>
        <p className="text-xs text-gray-500">
          Try adjusting your search query or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {COLUMNS.map((columnStatus) => {
        const columnTasks = tasks.filter(
          (task) => task.status === columnStatus,
        );
        return (
          <KanbanColumn
            key={columnStatus}
            title={columnStatus}
            tasks={columnTasks}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        );
      })}
    </div>
  );
}
