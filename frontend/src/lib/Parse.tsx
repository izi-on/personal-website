import { ParsedResumeSection, ResumeSection } from "@/types/resume";

function extractDuration(resume: ResumeSection) {
  let startDate: Date | undefined;
  let endDate: Date | undefined;

  const newContent: Array<string | ResumeSection> = resume.content
    .map((item) => {
      if (typeof item === "string") {
        if (item.includes("Duration")) {
          // extract the duration from the string
          const durationRegex = /Duration: (\d{2}\/\d{4}) – (\d{2}\/\d{4})/;
          const match = item.match(durationRegex);

          if (match) {
            const [, start, end] = match;
            const startMonth = parseInt(start.split("/")[0]);
            const startYear = parseInt(start.split("/")[1]);
            const endMonth = parseInt(end.split("/")[0]);
            const endYear = parseInt(end.split("/")[1]);
            startDate = new Date(startYear, startMonth, 1);
            endDate = new Date(endYear, endMonth, 1);
          }
          return undefined;
        }
        return item;
      } else {
        return extractDuration(item);
      }
    })
    .filter((item) => item !== undefined);

  return {
    ...resume,
    content: newContent,
    startDate,
    endDate,
  };
}

export const parseResume = (resume: {
  root: ResumeSection[];
}): ParsedResumeSection[] => {
  const res = resume.root.map((resumeSection) =>
    [extractDuration].reduce((acc, fn) => fn(acc), resumeSection)
  );
  return res;
};
