import React from "react";
import { ParsedResumeSection } from "@/types/resume";
import {
  FaAward,
  FaBriefcase,
  FaCode,
  FaGraduationCap,
  FaUser,
} from "react-icons/fa";

const MAIN_SECTIONS: Record<string, { icon: React.ReactNode }> = {
  "Contact Information": { icon: <FaUser /> },
  Education: { icon: <FaGraduationCap /> },
  "Professional Experience": { icon: <FaBriefcase /> },
  Projects: { icon: <FaCode /> },
  Awards: { icon: <FaAward /> },
  Skills: { icon: <FaCode /> },
};

const formatDate = (d?: Date) =>
  d?.toLocaleDateString("en-US", { month: "short", year: "numeric" });

const renderSubSection = (section: ParsedResumeSection, depth: number) => {
  // Plain string line – just return a paragraph with subtle indent.
  if (typeof section === "string")
    return (
      <p
        className="ml-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
        key={section}
      >
        {section}
      </p>
    );

  // Structured subsection.
  return (
    <div className="mb-3" key={section.title}>
      <div className="flex justify-between items-baseline">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {section.title}
        </h2>
        {section.startDate && section.endDate && (
          <span className="text-xs tabular-nums text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {formatDate(section.startDate)} – {formatDate(section.endDate)}
          </span>
        )}
      </div>

      <div className="mt-1 ml-4 border-l border-gray-200 dark:border-gray-700 pl-4 space-y-1">
        {section.content.map((item, idx) =>
          typeof item === "string" ? (
            <p
              key={idx}
              className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
            >
              {item}
            </p>
          ) : (
            <React.Fragment key={idx}>
              {helperRender(item, depth + 1)}
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
};

const renderMainSection = (section: ParsedResumeSection) => {
  const sectionInfo = MAIN_SECTIONS[section.title] ?? { icon: null };

  return (
    <section key={section.title} className="mb-8">
      <header className="flex items-center gap-2 mb-4">
        <span className="text-indigo-600 dark:text-indigo-400 text-xl">
          {sectionInfo.icon}
        </span>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          {section.title}
        </h1>
      </header>

      {section.content.map((item, idx) =>
        typeof item === "string" ? (
          <p
            key={idx}
            className="mb-2 text-sm leading-relaxed text-gray-800 dark:text-gray-300"
          >
            {item}
          </p>
        ) : (
          <React.Fragment key={idx}>{helperRender(item, 1)}</React.Fragment>
        )
      )}
    </section>
  );
};

const helperRender = (
  section: ParsedResumeSection,
  depth: number
): React.ReactNode => {
  return depth === 0
    ? renderMainSection(section)
    : renderSubSection(section, depth);
};

export const resumeComponentRender = (resume: ParsedResumeSection[]) => {
  return <div>{resume.map((section) => helperRender(section, 0))}</div>;
};
