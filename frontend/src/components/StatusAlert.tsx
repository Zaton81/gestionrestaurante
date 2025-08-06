import React from "react";

interface StatusAlertProps {
  message: string;
  type: "success" | "error";
}

const StatusAlert: React.FC<StatusAlertProps> = ({ message, type }) => {
  if (!message) return null;
  return (
    <div className={`alert ${type === "success" ? "alert-success" : "alert-danger"}`}>
      {message}
    </div>
  );
};

export default StatusAlert;