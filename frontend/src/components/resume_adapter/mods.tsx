import React, { isValidElement, ReactNode } from "react";
import {
  FaPython,
  FaReact,
  FaJava,
  FaDocker,
  FaGithub,
  FaJs,
  FaCode,
} from "react-icons/fa";
import {
  SiTypescript,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiGo,
  SiOcaml,
  SiFastapi,
  SiPydantic,
  SiGin,
  SiAngular,
} from "react-icons/si";
import shopifyLogo from "@/assets/shopify.svg";

/**
 * Recursively traverse a JSX tree.
 * @param node   A ReactNode (JSX returned from a component or `<Component />` itself)
 * @param onText Callback invoked for every string / number encountered
 */
export function walkText(
  node: ReactNode,
  onText: (txt: string) => ReactNode,
): ReactNode {
  if (node === null || node === undefined || typeof node === "boolean") {
    return node; // nothing to do
  }

  // Plain text (string | number) –‑ you've arrived
  if (typeof node === "string") {
    return onText(String(node));
  }

  // Fragment, list‐render, or any other array of children
  if (Array.isArray(node)) {
    return node.map((child) => walkText(child, onText));
  }

  // Regular JSX element
  if (isValidElement(node)) {
    // Recursively process children
    const processedChildren = walkText(node.props.children, onText);
    // Clone the element with the processed children
    return React.cloneElement(node, node.props, processedChildren);
  }

  // Handle other potential node types if necessary, or return the node as is
  return node;
}

type contentMod = (content: ReactNode) => ReactNode;

export const linkifyContent: contentMod = (content) => {
  return walkText(content, (txt) => {
    // find url with regex, doesnt need to start with http
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urls = txt.match(urlRegex);

    if (!urls) return txt;

    const urlElems = urls.map((url) => {
      return (
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      );
    });

    // split the string into parts, and replace the urls with <a> tags
    const parts = txt.split(urlRegex);

    const result = [];
    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i]);
      if (i < urlElems.length) {
        result.push(urlElems[i]);
      }
    }
    return result;
  });
};

export const fancifyText: contentMod = (content) => {
  //
  // for big boy stuff
  const jobElems: Record<
    string,
    { text_color: string; icon: React.ReactElement }
  > = {
    Shopify: {
      text_color: "text-green-500",
      icon: <img src={shopifyLogo} width="16" height="16" />,
    },
  };
  return walkText(content, (txt) => {
    // Create a regex pattern to match any of the tech keywords
    const jobKeywords = Object.keys(jobElems).join("\\b|\\b");
    const jobRegex = new RegExp(`\\b${jobKeywords}\\b`, "g");

    const matches = txt.match(jobRegex);

    if (!matches) return txt;

    // Map the matches to elements with icons
    const techElems = matches.map((tech) => {
      return (
        <div className="flex flex-row items-center">
          <span
            style={{
              marginRight: "4px",
              display: "inline-flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            {jobElems[tech].icon}
          </span>
          <div className={jobElems[tech].text_color}>{tech}</div>
        </div>
      );
    });

    // Split the text by tech keywords and combine with the new elements
    const parts = txt.split(jobRegex);

    const result: React.ReactNode[] = [];
    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i]);
      if (i < techElems.length) {
        result.push(techElems[i]);
      }
    }

    return result;
  });
};

export const decorateSpecialKeywords: contentMod = (content) => {
  return walkText(content, (txt) => {
    // Define technology keywords and their corresponding icons
    const techIcons: Record<string, React.ReactElement> = {
      Angular: <SiAngular />,
      Python: <FaPython />,
      FastAPI: <SiFastapi />,
      Pydantic: <SiPydantic />,
      Typescript: <SiTypescript />,
      Javascript: <FaJs />,
      React: <FaReact />,
      PostgreSQL: <SiPostgresql />,
      Postgres: <SiPostgresql />,
      Redis: <SiRedis />,
      MongoDB: <SiMongodb />,
      Golang: <SiGo />,
      Gin: <SiGin />,
      Java: <FaJava />,
      OCaml: <SiOcaml />,
      DevOps: <FaCode />,
      Docker: <FaDocker />,
      "GitHub Actions": <FaGithub />,
    };

    // Create a regex pattern to match any of the tech keywords
    const techKeywords = Object.keys(techIcons).join("\\b|\\b");
    const techRegex = new RegExp(`\\b${techKeywords}\\b`, "g");

    const matches = txt.match(techRegex);

    if (!matches) return txt;

    // Map the matches to elements with icons
    const techElems = matches.map((tech) => {
      return (
        <span
          key={tech}
          style={{
            display: "inline-flex",
            alignItems: "center",
            position: "relative",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              marginRight: "4px",
              display: "inline-flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            {techIcons[tech]}
          </span>
          <span
            style={{
              position: "relative",
              top: "0.125em", // Adjust the text downward instead
            }}
          >
            {tech}
          </span>
        </span>
      );
    });

    // Split the text by tech keywords and combine with the new elements
    const parts = txt.split(techRegex);

    const result: React.ReactNode[] = [];
    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i]);
      if (i < techElems.length) {
        result.push(techElems[i]);
      }
    }

    return result;
  });
};
