import React from "react";
import { ImSpinner9 } from "react-icons/im";

const Loader2 = () => {
  return (
    <div className="grid place-items-center h-screen w-screen bg-inherit ">
      <ImSpinner9 className="text-5xl animate-spin" />
    </div>
  );
};

export default Loader2;
