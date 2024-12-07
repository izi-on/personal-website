import { ProcessedResumeSection } from "@/types/adapter";

export type ResumeRendererProps = {
  sections: ProcessedResumeSection[];
};

export type SectionRendererProps = {
  section: ProcessedResumeSection;
};
