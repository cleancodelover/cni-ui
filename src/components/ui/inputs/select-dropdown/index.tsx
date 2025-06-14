"use client";

import React, {useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import Select from "react-select";
import NonSSRWrapper from "../../../../../NonSSRWrapper";
// import NonSSRWrapper from '@/components/shared/non-ssr-wrapper'

type OptionType = {
  label: string;
  value: string;
};

interface componentProps {
  options: OptionType[] | [];
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
  setValue?: any;
  onFocus?: () => void;
  onBlur?: () => void;
}

const DropDownSelectComponent = ({
  options,
  placeholder,
  defaultValue,
  setValue,
  name,
  control,
  error,
  label,
  loading,
  multiple,
  disabled,
  onScrollToBottom,
  onScrollToTop,
  onInputValueChange,
  onBlur,
  onFocus,
}: componentProps) => {
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      setMenuPortalTarget(document.body);
    }
  }, []);

  return (
    <NonSSRWrapper>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({field: {onChange, value}}) => (
        <div>
          {label && (
            <div className={``}>
              <h2
                className={`mb-1 block font-medium ${
                  error ? "text-red-900" : "text-gray-50"
                } `}
              >
                {label}
              </h2>
            </div>
          )}
          <Select
            className="my-react-select-container"
            classNamePrefix="my-react-select"
            options={options}
            defaultValue={defaultValue}
            placeholder={placeholder}
            value={value}
            onChange={(val)=>{
              onChange(val);
              if (setValue) {
                setValue(name, val);
              }
            }}
            onInputChange={onInputValueChange}
            isLoading={loading}
            isClearable
            onMenuScrollToBottom={onScrollToBottom}
            onMenuScrollToTop={onScrollToTop}
            isMulti={multiple}
            isDisabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            styles={{
              placeholder: base =>({ ...base, color: '#98A2B3'}),
              input: base =>({...base, color: '#FFFFFF1A'}),
              menuPortal: base => ({
                ...base,
                zIndex: 9999,
                color: "#98A2B3",
                fontSize: "14px",
                backgroundColor:"#FFFFFF1A",
                background: "#FFFFFF1A",
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "100%",
                minHeight: "42px",
                borderRadius: "7px",
                borderColor: error
                  ? "#f03030"
                  : state.isFocused
                  ? "#9ca3af"
                  : "#FFFFFF1A",
                background: error
                  ? `rgba(255, 0, 0, 0.05)`
                  : disabled
                  ? "#FFFFFF1A"
                  : "#FFFFFF1A",
                fontSize: "14px",
              }),
            }}
            menuPortalTarget={menuPortalTarget}
          />
          {error && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-500">
              <span className="font-medium">Opps!</span> {error}
            </p>
          )}
        </div>
      )}
    />
    </NonSSRWrapper>
  );
};

export default DropDownSelectComponent;
