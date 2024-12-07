import { ResumeSchema } from "@/types/resume";
import { backendClient } from "@/api/base";

const aiClient = backendClient.withPath("/ai");

export const resumeAPI = () => {
  const getResume = aiClient
    .withPath("sentence-semantic")
    .withResponseValidation(ResumeSchema)
    .apply();

  return {
    getResume,
  };
};
