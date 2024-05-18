import { FaExclamationTriangle } from "react-icons/fa";

import React from "react";

const FormError = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <FaExclamationTriangle className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
