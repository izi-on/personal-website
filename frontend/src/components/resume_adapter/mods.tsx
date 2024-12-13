import { AdapterContentMod } from "@/types/adapter";
import { extractUrls } from "@/utils/adapter";
import React from "react";

const applyOnReactElementTreeLeavesString: (
  contentMod: (content: string) => React.ReactNode,
) => AdapterContentMod = (contentMod) =>
  function transform(content: React.ReactNode): React.ReactNode {
    if (typeof content === "string") return contentMod(content);
    if (Array.isArray(content)) return content.map(transform);
    if (React.isValidElement(content)) {
      const { children } = content.props;
      if (!children) return content;
      return React.cloneElement(content, {}, transform(children));
    }
    return content;
  };

export const insertInParagraph: AdapterContentMod = (content) => (
  <p className="ml-4 mb-1 text-base">{content}</p>
);

const linkifyContentHelper = (content: string): React.ReactElement => {
  console.log(content);
  const newComponent: React.ReactElement[] = [];
  let curContent = content;
  extractUrls(content).forEach((url) => {
    const parts = curContent.split(url);
    newComponent.push(<>{parts[0]}</>);
    newComponent.push(
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline"
      >
        {url}
      </a>,
    );
    curContent = parts[1];
  });
  newComponent.push(<>{curContent}</>);
  return <>{newComponent}</>;
};
export const linkifyContent =
  applyOnReactElementTreeLeavesString(linkifyContentHelper);
