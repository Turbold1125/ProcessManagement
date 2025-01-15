import React from "react";
import { CheckCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

const StepsComponent = ({ processes, handleProcessClick }) => {
  const completedSteps = processes.filter((process) => process.status === "COMPLETED").length;
  const totalSteps = processes.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-300 rounded-full mb-6">
        <div
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all"
          style={{
            width: `${progressPercentage}%`,
            transition: "width 0.4s ease-in-out",
          }}
        ></div>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between">
        {processes.map((process, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center text-center cursor-pointer group"
            onClick={() => handleProcessClick(index)}
          >
            {/* Step Icon */}
            <div
              className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg transition-transform ${
                process.status === "COMPLETED"
                  ? "bg-green-500 text-white group-hover:scale-110"
                  : process.status === "IN_PROGRESS"
                  ? "bg-blue-500 text-white group-hover:scale-110"
                  : "bg-gray-200 text-gray-400 group-hover:scale-105"
              }`}
            >
              {process.status === "COMPLETED" ? (
                <CheckCircleOutlined className="text-2xl md:text-3xl" />
              ) : (
                <PlayCircleOutlined className="text-2xl md:text-3xl" />
              )}
            </div>

            {/* Step Name */}
            <span
              className={`mt-3 text-sm md:text-base font-medium ${
                process.status === "COMPLETED"
                  ? "text-green-600"
                  : process.status === "IN_PROGRESS"
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {process.processName}
            </span>

            {/* Connector */}
            {index < processes.length - 1 && (
              <div
                className={`absolute top-1/2 left-full h-1 transform -translate-y-1/2 transition-all ${
                  process.status === "COMPLETED"
                    ? "bg-green-500"
                    : process.status === "IN_PROGRESS"
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
                style={{
                  width: "100px", // Adjust spacing between steps
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsComponent;
