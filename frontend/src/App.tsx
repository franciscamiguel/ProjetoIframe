import React, { useEffect, useState } from "react";
import {
  Moon,
  SquareSplitHorizontal,
  SquareSplitVertical,
  Sun,
} from "lucide-react";

// Interfaces
interface Frame {
  id: number;
  order: number;
  html: string;
}

interface Demo {
  id: number;
  name: string;
  frames: Frame[];
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

interface SelectProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: number }[];
  className?: string;
}

// Reusable Components
const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md transition-transform hover:scale-105 ${className}`}
  >
    {children}
  </button>
);

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className,
}) => (
  <select
    value={value}
    onChange={onChange}
    className={`mx-2 px-4 py-2 border rounded-md transition ${className}`}
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default function App() {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState<number>(0);
  const [editableContent, setEditableContent] = useState<string>("");
  const [viewMode, setViewMode] = useState<"stacked" | "sideBySide">("stacked");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth >= 800
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/demos", {
        method: "GET",
      });
      const data = await response.json();
      setDemos(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.body.className = darkMode
      ? "dark bg-background-dark text-text-light"
      : "bg-background-light text-text-dark";
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSelectDemo = (demo: Demo) => {
    const sortedDemo = {
      ...demo,
      frames: [...demo.frames].sort((a, b) => a.order - b.order),
    };
    setSelectedDemo(sortedDemo);
    setSelectedFrameIndex(0);
    setEditableContent(sortedDemo.frames[0]?.html || "");
  };

  const handleFrameChange = (index: number) => {
    if (selectedDemo) {
      setSelectedFrameIndex(index);
      setEditableContent(selectedDemo.frames[index].html);
    }
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditableContent(event.target.value);
  };

  const handleSaveChanges = async () => {
    if (selectedDemo) {
      const frameToUpdate = selectedDemo.frames[selectedFrameIndex];
      frameToUpdate.html = editableContent;

      const response = await fetch(
        `http://localhost:3001/frames/${frameToUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ html: editableContent }),
        }
      );

      if (response.ok) {
        alert("Alterações salvas com sucesso!");
      } else {
        alert("Erro ao salvar as alterações.");
      }
    }
  };

  const handleNextFrame = () => {
    if (selectedDemo && selectedFrameIndex < selectedDemo.frames.length - 1) {
      handleFrameChange(selectedFrameIndex + 1);
    }
  };

  const handlePreviousFrame = () => {
    if (selectedDemo && selectedFrameIndex > 0) {
      handleFrameChange(selectedFrameIndex - 1);
    }
  };

  return (
    <div
      className={`w-full min-h-screen p-8 box-border transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <label className="absolute top-4 right-4 cursor-pointer">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="hidden"
        />
        <span className="block w-14 h-8 bg-gray-700 rounded-full relative transition">
          <span
            className={`block w-6 h-6 absolute top-1 left-1 bg-white rounded-full transition-transform duration-300 ${
              darkMode ? "" : "translate-x-6"
            }`}
          >
            {darkMode ? (
              <Moon className="w-full h-full p-1 text-gray-900" />
            ) : (
              <Sun className="w-full h-full p-1 text-yellow-500" />
            )}
          </span>
        </span>
      </label>

      {!selectedDemo ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {demos.map((demo) => (
            <div
              key={demo.id}
              className={`p-8 rounded-xl border shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl ${
                darkMode
                  ? "border-gray-700 bg-gray-800 shadow-md"
                  : "border-gray-400 bg-white shadow-md"
              } flex flex-col justify-between items-center`}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                {demo.name}
              </h2>
              <Button
                onClick={() => handleSelectDemo(demo)}
                className={`py-2 px-6 mt-auto rounded-full transition-colors ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Visualizar
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() => setSelectedDemo(null)}
              className={
                darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
              }
            >
              Voltar
            </Button>
            <h2 className="text-center text-3xl font-bold flex-1">
              {selectedDemo.name}
            </h2>
          </div>

          <div className="flex justify-center items-center my-4 text-center">
            {isLargeScreen && (
              <span
                className=" cursor-pointer text-sm font-medium text-gray-500"
                onClick={() =>
                  setViewMode(viewMode === "stacked" ? "sideBySide" : "stacked")
                }
                aria-label={
                  viewMode === "stacked"
                    ? "Switch to side by side view"
                    : "Switch to stacked view"
                }
              >
                {viewMode === "stacked" ? (
                  <SquareSplitHorizontal className="w-6 h-6" />
                ) : (
                  <SquareSplitVertical className="w-6 h-6" />
                )}
              </span>
            )}

            <div className="flex items-center justify-center mx-[580px] ">
              <Button
                onClick={handlePreviousFrame}
                className={
                  darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                }
              >
                &lt;
              </Button>

              <Select
                value={selectedFrameIndex}
                onChange={(e) => handleFrameChange(parseInt(e.target.value))}
                options={selectedDemo.frames.map((frame, index) => ({
                  label: `Frame ${frame.order}`,
                  value: index,
                }))}
                className={
                  darkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-300"
                }
              />

              <Button
                onClick={handleNextFrame}
                className={
                  darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                }
              >
                &gt;
              </Button>
            </div>
          </div>

          <div
            className={`flex gap-4 flex-1 transition-all duration-500 ease-in-out ${
              viewMode === "sideBySide" ? "flex-row" : "flex-col"
            }`}
          >
            <iframe
              srcDoc={editableContent}
              title={`Frame ${selectedFrameIndex}`}
              className={`w-full border ${
                darkMode ? "border-gray-700" : "border-gray-300"
              } ${viewMode === "sideBySide" ? "h-screen" : "h-96"}`}
            />
            <textarea
              value={editableContent}
              onChange={handleContentChange}
              className={`w-full rounded-md p-2 transition ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900  border-2 border-gray-600"
              } ${viewMode === "sideBySide" ? "h-screen" : "h-96 mt-4"}`}
            />
          </div>

          <Button
            onClick={handleSaveChanges}
            className="mt-4 self-center py-2 px-6 bg-green-600 text-white rounded-md transition-transform hover:scale-105"
          >
            Salvar Alterações
          </Button>
        </div>
      )}
    </div>
  );
}
