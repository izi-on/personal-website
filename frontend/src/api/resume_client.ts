import { ResumeSchema } from "@/types/resume";
import { backendClient } from "@/api/base";

const resumeClient = backendClient.withPath("/resume");

export const resumeAPI = () => {
  const getResume = resumeClient.withResponseValidation(ResumeSchema).apply();

  return {
    getResume,
  };
};
