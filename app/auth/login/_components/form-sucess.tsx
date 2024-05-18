import { FaCheckCircle } from "react-icons/fa";

import React from "react";

const FormSucess = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <FaCheckCircle className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormSucess;
