import React from "react";

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  textAreaClassName?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label, name, value, onChange, required = false, rows = 3, textAreaClassName = ""
}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{label}</label>
    <textarea
      className={`form-control ${textAreaClassName}`}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
    />
  </div>
);

export default TextAreaField;