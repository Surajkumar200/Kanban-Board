import React, { useState, useEffect, useMemo } from "react";
import { Header } from "./components/Header";
import { SearchAndFilter } from "./components/SearchAndFilter";
import { KanbanBoard } from "./components/KanbanBoard";
import { TaskModal } from "./components/TaskModal";
import { loadTasksFromStorage, saveTasksToStorage } from "./utils/localStorage";

export default function App() {
  const [tasks, setTasks] = useState(loadTasksFromStorage);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Handle task filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;
      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, searchQuery, priorityFilter, statusFilter]);

  // Actions
  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleEditTask = (taskData) => {
    if (!taskToEdit) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === taskToEdit.id ? { ...t, ...taskData } : t)),
    );
    setTaskToEdit(null);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
    );
  };

  const handleOpenAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setPriorityFilter("All");
    setStatusFilter("All");
  };

  const isFiltered =
    searchQuery !== "" || priorityFilter !== "All" || statusFilter !== "All";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Header onOpenAddModal={handleOpenAddModal} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onReset={handleResetFilters}
        />

        <KanbanBoard
          tasks={filteredTasks}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          isFiltered={isFiltered}
        />
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={taskToEdit ? handleEditTask : handleAddTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}
