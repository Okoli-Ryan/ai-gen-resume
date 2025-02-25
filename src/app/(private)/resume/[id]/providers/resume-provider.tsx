import { createContext, useContext, useMemo, useState } from "react";
import { ResumeByIdResponse } from "../db/get-resume-by-id";

type ResumeContextType = {
  resume: ResumeByIdResponse;
};

const ResumeContext = createContext<ResumeContextType>({
  resume: undefined,
});

export const ResumeProvider = ({ children, resume }: { children: React.ReactNode, resume: ResumeByIdResponse }) => {
  

  return <ResumeContext.Provider value={{resume}}>{children}</ResumeContext.Provider>;
};

export const useResume = () => useContext(ResumeContext);
