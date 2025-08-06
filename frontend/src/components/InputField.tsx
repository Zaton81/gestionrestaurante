import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
}

const InputField: React.FC<InputFieldProps> = ({
  label, name, value, onChange, type = "text", required = false, min, max
}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{label}</label>
    <input
      type={type}
      className="form-control"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
    />
  </div>
);

export default InputField;