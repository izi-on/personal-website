import { IconType } from "react-icons";
import {
  FaUser,
  FaGraduationCap,
  FaTrophy,
  FaTools,
  FaProjectDiagram,
  FaBriefcase,
} from "react-icons/fa";
import React from "react";
import {
  TitleComponentProps,
  ContentComponentProps,
  AdapterFunction,
  AdapterComponents,
} from "@/types/adapter";
// import { getMostSimilar } from "@/utils/word_semantic";
// TODO: This was rushed, make this cleaner and better

// Define a map from canonical titles to their associated icon and base styling
const sectionConfig: Record<string, { icon: IconType; style: string }> = {
  "Contact Information": { icon: FaUser, style: "text-green-700" },
  Education: { icon: FaGraduationCap, style: "text-blue-700" },
  "Professional Experience": {
    icon: FaBriefcase,
    style: "text-purple-700",
  },
  Projects: { icon: FaProjectDiagram, style: "text-pink-700" },
  Awards: { icon: FaTrophy, style: "text-yellow-700" },
  Skills: { icon: FaTools, style: "text-red-700" },
};

const defaultConfig = { icon: FaUser, style: "text-gray-300" };

// A Title component factory
const makeTitleComponent = (
  depth: number,
  Icon: IconType,
  style: string,
): React.FC<TitleComponentProps> =>
  function TitleComponent({ title }) {
    // Choose heading level based on depth
    const Tag = depth === 0 ? "h1" : depth === 1 ? "h2" : "h3";
    const sizeClass =
      depth === 0 ? "text-3xl" : depth === 1 ? "text-2xl" : "text-xl";

    return (
      <div className={`flex items-center gap-2 mb-2 ${style}`}>
        <Icon />
        <Tag className={`font-bold ${sizeClass}`}>{title}</Tag>
      </div>
    );
  };

// A Content component factory for strings
const makeStringContentComponent = (): React.FC<ContentComponentProps> =>
  function ContentComponent({ content }) {
    if (typeof content === "string") {
      return <p className="ml-4 mb-1 text-base">{content}</p>;
    }
    return null;
  };

export const adapter: AdapterFunction = async (
  rawTitle: string,
  depth: number,
): Promise<AdapterComponents> => {
  // TODO: make a server for this

  // if at the top, we want to get the canonical names
  // const { canonicalTitle, similarity } =
  //   depth === 0
  //     ? await getMostSimilar(rawTitle, canonicalNames)
  //     : { canonicalTitle: rawTitle, similarity: 1 };
  //
  // // only if similar enough, use prediction of canonical title
  // const usedTitle = (similarity > 0.5 ? canonicalTitle : rawTitle).trim();
  const usedTitle = rawTitle.trim();

  const config = sectionConfig[usedTitle] || defaultConfig;

  const TitleComponent = makeTitleComponent(depth, config.icon, config.style);
  const ContentComponent = makeStringContentComponent();

  return {
    TitleComponent,
    ContentComponent,
  };
};
