"use client";

import {useState} from "react";
import {Control, Controller} from "react-hook-form";
import PhoneInput, {Country} from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface componentProps {
  name: string;
  label?: string;
  placeholder: string;
  error?: string;
  type: string;
  control: Control<any>;
  autoComplete?: string;
  allowDecimal?: boolean;
  disabled?: boolean;
  Icon?: React.ComponentType;
  defaultValue?: string | number;
  defaultCountry?: Country;
}

const PhoneNumberInputComponent = ({
  name,
  placeholder,
  error,
  control,
  label,
  Icon,
  defaultValue,
  defaultCountry = "NG",
}: componentProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({field: {onChange, value}}) => (
        <div>
          {label && (
            <label
              htmlFor="input-group-1"
              className={`mb-1 block text-sm font-medium ${
                error ? "text-red-500" : "text-darkGray dark:text-lightGray"
              } `}
            >
              {label}
            </label>
          )}

          <div className="relative text-gray-500">
            {Icon && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Icon />
              </div>
            )}

            <PhoneInput
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              name={name}
              international
              countryCallingCodeEditable={false}
              defaultCountry={defaultCountry}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              className={`font-semiBold placeholder-[#98A2B3] placeholder:font-[400] bg-[#FFFFFF1A] [&>input]:bg-transparent [&>input]:ring-0 [&>input]:outline-none rounded-lg border-[1px] ${
                error
                  ? " border-red-500 bg-red-50 text-sm text-red-900 placeholder-red-700 focus:ring-red-500 bg-[#FFFFFF1A] text-sm text-red-500 placeholder-red-500 focus:border-blue-500"
                  : `${
                      isActive
                        ? "border-blue-500 bg-[#FFFFFF1A] border-[2px]"
                        : "bg-[#FFFFFF1A] focus:outline-none"
                    } text-sm text-gray-900 dark:text-gray-300  focus:outline-blue-500  bg-[#FFFFFF1A]`
              } block w-full ${
                Icon ? "pl-10" : "pl-2.5"
              } p-2.5 [&>input]:focus:outline-none`}
            />
          </div>

          {error && (
            <p className="mt-1 text-xs font-[500] text-red-600 dark:text-red-500">
              <span className="font-medium">Opps!</span> {error}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default PhoneNumberInputComponent;
