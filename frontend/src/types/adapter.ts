import { ResumeSection } from "@/types/resume";
export type TitleComponentProps = {
  title: string;
  depth: number;
};

export type ContentComponentProps = {
  content: string | ResumeSection;
  depth: number;
};

export type AdapterComponents = {
  TitleComponent: React.ComponentType<TitleComponentProps>;
  ContentComponent: React.ComponentType<ContentComponentProps>;
};

export type AdapterFunction = (
  title: string,
  depth: number,
) => Promise<AdapterComponents>;

export type ProcessedResumeSection = {
  depth: number;
  content: Array<string | ProcessedResumeSection>;
  TitleComponent: React.ComponentType<TitleComponentProps>;
  ContentComponent: React.ComponentType<ContentComponentProps>;
} & ResumeSection;
