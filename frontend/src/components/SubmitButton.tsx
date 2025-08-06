import React from "react";

interface SubmitButtonProps {
  loading: boolean;
  text: string;
  loadingText?: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading, text, loadingText = "Enviando...", className = "btn btn-danger"
}) => (
  <button type="submit" className={className} disabled={loading}>
    {loading ? loadingText : text}
  </button>
);

export default SubmitButton;