import { ResumeSection } from "@/types/resume";
import { IconType } from "react-icons";
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

// const sectionConfig: Record<string, { icon: IconType; style: string }> = {
//   "Contact Information": { icon: FaUser, style: "text-green-700" },
//   Education: { icon: FaGraduationCap, style: "text-blue-700" },
//   "Professional Experience": {
//     icon: FaBriefcase,
//     style: "text-purple-700",
//   },
//   Projects: { icon: FaProjectDiagram, style: "text-pink-700" },
//   Awards: { icon: FaTrophy, style: "text-yellow-700" },
//   Skills: { icon: FaTools, style: "text-red-700" },
// };
//
export type ResumeTitle =
  | "Contact Information"
  | "Education"
  | "Professional Experience"
  | "Projects"
  | "Awards"
  | "Skills";

type TitleStyle = {
  icon: IconType;
  style: string;
};

export type SectionConfigType = Record<ResumeTitle, TitleStyle>;

export type AdapterContentMod = (comp: React.ReactNode) => React.ReactNode;
