import React from "react";

export const SaveSnackbar: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="w-[288px] fixed bottom-4 left-[50%] ml-[-144px] rounded-lg p-3 bg-slate-900 shadow-dark">
      {children}
    </div>
  );
};
