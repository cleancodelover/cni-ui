"use client";

import React from "react";
import {Controller} from "react-hook-form";

interface componentProps {
  options: string[] | [];
  placeholder?: string;
  defaultValue?: any | any[] | null;
  control?: any;
  name: string;
  error?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  onScrollToBottom?: () => void;
  onScrollToTop?: () => void;
  onInputValueChange?: (value: string) => void;
  multiple?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const RadioButtonsSelectComponent = ({
  options,
  defaultValue,
  name,
  control,
  error,
  label,
}: componentProps) => {
  return (
    <div>
      {label && (
        <div className={``}>
          <p
            className={`text-xl font-normal mb-4 text-gray-50 ${
              error ? "text-red-900" : "text-blue-500"
            } `}
          >
            {label}
          </p>
        </div>
      )}

      <div className="flex gap-4 gap-x-4 w-full">
        {options.map((option, index) => (
          <Controller
            key={`${option}${index}`}
            name={name}
            control={control}
            render={({field}) => (
              <label
                className={`${
                  error ? "border-red-500 bg-red-50" : "border-gray-700"
                } flex flex-1 items-center bg-gray-700 p-4 hover:bg-gray-600 cursor-pointer  h-[44px] rounded-lg`}
              >
                <input
                  {...field}
                  id={option}
                  type="radio"
                  value={option}
                  className={`${
                    error ? "border-red-500" : "bg-gray-100 border-gray-700"
                  } w-4 h-4 text-blue-500 `}
                />

                <span
                  // htmlFor={option}
                  className={`w-full py-4 ms-2 text-xs font-semibold ${
                    error ? "text-red-700" : "text-gray-300 "
                  }`}
                >
                  {option}
                </span>
              </label>
            )}
          />
        ))}
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-500">
          <span className="font-medium">Opps!</span> {error}
        </p>
      )}
    </div>
  );
};

export default RadioButtonsSelectComponent;
