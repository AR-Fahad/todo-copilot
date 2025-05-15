"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { useState } from "react";

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Copilot action to add a todo
  useCopilotAction({
    name: "addTodoItem",
    description: "Add a new todo item to the list",
    parameters: [
      {
        name: "todoText",
        type: "string",
        description: "The text of the todo item to add",
        required: true,
      },
    ],
    handler: async ({ todoText }) => {
      setTodos((prev) => [...prev, todoText]);
    },
  });

  // Copilot action to delete a todo item by index (1-based index)
  useCopilotAction({
    name: "deleteTodoItem",
    description: "Delete a todo item by number, name, or relative position",
    parameters: [
      {
        name: "index",
        type: "number",
        description: "The list number (1 = most recent)",
        required: false,
      },
      {
        name: "todoText",
        type: "string",
        description: "The exact text of the todo item to delete",
        required: false,
      },
      {
        name: "position",
        type: "string",
        description: "The relative position: 'first', 'last', or 'middle'",
        required: false,
      },
    ],
    handler: async ({ index, todoText, position }) => {
      let actualIndex = -1;

      if (index !== undefined) {
        // Handle 1-based list number (reversed list)
        actualIndex = todos.length - index;
      } else if (todoText) {
        // Case-insensitive text match
        actualIndex = todos.findIndex(
          (item) => item.toLowerCase() === todoText.toLowerCase()
        );
      } else if (position) {
        const mid = Math.floor(todos.length / 2);
        if (position === "first") actualIndex = 0;
        else if (position === "last") actualIndex = todos.length - 1;
        else if (position === "middle") actualIndex = mid;
      }

      // If we found a valid index, delete it
      if (actualIndex >= 0 && actualIndex < todos.length) {
        setTodos((prev) => prev.filter((_, i) => i !== actualIndex));
      }
    },
  });

  // Copilot action to clear all todos
  useCopilotAction({
    name: "clearAllTodos",
    description: "Clear all todo items from the list",
    parameters: [],
    handler: async () => {
      setTodos([]);
    },
  });

  const handleAddTodo = () => {
    if (todo.trim()) {
      setTodos([...todos, todo.trim()]);
      setTodo("");
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  return (
    <div className="p-5 md:p-10">
      <div className="bg-white w-full p-5 lg:w-[75%] md:p-10 rounded-lg shadow mx-auto">
        <h3 className="text-2xl font-semibold text-center">
          Welcome to{" "}
          <span className="font-bold">
            <span className="text-blue-500">c</span>Todo.
          </span>
        </h3>
        <p className="mb-4 text-sm text-gray-600 italic text-center">
          Stay organized, stay productive. One task at a time ✨
        </p>
        <div className="mb-6">
          <textarea
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter your todo..."
            className="w-full p-3 border border-blue-500 rounded-lg mb-4"
            rows="5"
          />
          <div className="flex gap-3 justify-center items-center">
            <button
              onClick={handleAddTodo}
              className="bg-blue-500 text-white px-4 py-2 rounded-md transition transform hover:bg-blue-700 hover:scale-105"
            >
              Add Todo
            </button>
          </div>
        </div>
      </div>

      <ul className="space-y-2 mt-6">
        {todos
          .slice()
          .reverse()
          .map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-3 rounded shadow"
            >
              <span className="font-medium">
                {index + 1}. {item}
              </span>
              <button
                onClick={() => handleDeleteTodo(todos.length - 1 - index)}
                className="text-red-500 hover:text-red-700 transition transform hover:scale-105"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>

      <div className="flex justify-center items-center mt-4">
        {todos.length > 0 && (
          <button
            onClick={handleClearAll}
            className="bg-red-500 text-white px-4 py-2 rounded-md transition transform hover:bg-red-600 hover:scale-105"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
