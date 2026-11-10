"use client";

import { createContext, useContext, useMemo } from "react";
import * as BaseInputPhone from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { IconSelector, IconWorld } from "@tabler/icons-react";
import {
  Combobox,
  type ComboboxOption,
} from "@/components/composite/search-select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputPhoneSize = "sm" | "default" | "lg";
const InputPhoneContext = createContext<{
  size: InputPhoneSize;
  invalid: boolean;
}>({ size: "default", invalid: false });

export function InputPhone({
  value,
  onValueChange,
  size = "default",
  invalid,
  className,
  inputProps,
  ...props
}: Omit<
  BaseInputPhone.Props<typeof BaseInputPhone.default>,
  | "onChange"
  | "value"
  | "variant"
  | "countrySelectComponent"
  | "flagComponent"
  | "inputComponent"
> & {
  value?: BaseInputPhone.Value;
  onValueChange?: (value: BaseInputPhone.Value | undefined) => void;
  size?: InputPhoneSize;
  invalid?: boolean;
  inputProps?: React.ComponentProps<"input"> & { "data-slot"?: string };
  placeholder?: string;
}) {
  return (
    <InputPhoneContext.Provider
      value={{
        size,
        invalid: Boolean(invalid || inputProps?.["aria-invalid"]),
      }}
    >
      <BaseInputPhone.default
        {...props}
        value={value || undefined}
        onChange={(next) => onValueChange?.(next)}
        numberInputProps={{
          ...inputProps,
          "aria-invalid": invalid || inputProps?.["aria-invalid"] || undefined,
        }}
        className={cn(
          "flex min-w-0",
          invalid &&
            "[&_[data-slot=combobox-trigger]]:border-destructive [&_input]:border-destructive [&_input]:text-destructive",
          className,
        )}
        countrySelectComponent={CountrySelect}
        flagComponent={FlagComponent}
        inputComponent={PhoneNumberInput}
        smartCaret={false}
      />
    </InputPhoneContext.Provider>
  );
}

type CountryEntry = {
  label: string;
  value: BaseInputPhone.Country | undefined;
};
type CountrySelectProps = {
  disabled?: boolean;
  value: BaseInputPhone.Country;
  options: CountryEntry[];
  onChange: (country: BaseInputPhone.Country) => void;
};

function CountrySelect({
  disabled,
  value: selectedCountry,
  options,
  onChange,
}: CountrySelectProps) {
  const { size, invalid } = useContext(InputPhoneContext);
  const filteredCountries = useMemo(
    () => options.filter((country) => country.value),
    [options],
  );
  const selectedLabel = options.find(
    ({ value }) => value === selectedCountry,
  )?.label;
  const comboboxOptions: ComboboxOption[] = filteredCountries.map(
    ({ label, value }) => ({
      value: value!,
      label,
      description: `+${BaseInputPhone.getCountryCallingCode(value!)}`,
      icon: <FlagComponent country={value!} countryName={label} />,
    }),
  );

  return (
    <div className="flex min-w-0 items-center">
      <Combobox
        options={comboboxOptions}
        value={selectedCountry || ""}
        onValueChange={(country) => {
          if (typeof country === "string")
            onChange(country as BaseInputPhone.Country);
        }}
        aria-label={
          selectedLabel
            ? `${selectedLabel} calling code`
            : "Choose country calling code"
        }
        placeholder=""
        searchPlaceholder="Search countries..."
        disabled={disabled}
        invalid={invalid}
        className={cn(
          "w-28 shrink-0 [&_[role=combobox]]:rounded-r-none [&_[role=combobox]]:border-r-0",
          size === "sm" && "[&_[role=combobox]]:h-8",
          size === "default" && "[&_[role=combobox]]:h-10",
          size === "lg" && "[&_[role=combobox]]:h-11",
        )}
        displayValue={
          selectedCountry
            ? `+${BaseInputPhone.getCountryCallingCode(selectedCountry)}`
            : ""
        }
        leadingIcon={
          selectedCountry ? (
            <FlagComponent
              country={selectedCountry}
              countryName={selectedCountry}
            />
          ) : (
            <IconWorld className="size-4" />
          )
        }
        triggerIcon={
          <IconSelector className="size-4 shrink-0 text-muted-foreground" />
        }
        renderOption={(option) => (
          <>
            {option.icon}
            <span className="min-w-0 flex-1 truncate">{option.label}</span>
            <span className="text-xs text-muted-foreground">
              {option.description}
            </span>
          </>
        )}
      />
    </div>
  );
}

function PhoneNumberInput({
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: React.ComponentProps<typeof Input>) {
  const { size } = useContext(InputPhoneContext);
  return (
    <Input
      {...props}
      type="tel"
      aria-invalid={ariaInvalid}
      className={cn(
        "min-w-0 flex-1",
        size === "sm" && "h-8 rounded-s-none",
        size === "default" && "rounded-s-none",
        size === "lg" && "h-11 rounded-s-none",
        className,
      )}
    />
  );
}

function FlagComponent({ country, countryName }: BaseInputPhone.FlagProps) {
  const Flag = flags[country];
  return (
    <span
      className="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-[3px] [&_svg]:size-full"
      aria-label={countryName}
    >
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <IconWorld
          aria-hidden="true"
          className="size-4 text-muted-foreground"
        />
      )}
    </span>
  );
}
