import React from "react";

export const SaveSnackbar: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="fixed flex justify-center left-4 bottom-4 right-4">
      <div className="relative max-w-max rounded-lg p-3 bg-slate-900 shadow-dark">
        {children}
      </div>
    </div>
  );
};
