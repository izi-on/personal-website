import React from "react";
import {
  Resume as ResumeType,
  ResumeSection as ResumeSectionType,
} from "@/types/resume";

interface ResumeRendererProps {
  resume: ResumeType;
}

const ResumeSection: React.FC<{
  section: ResumeSectionType;
  level?: number;
}> = ({ section, level = 1 }) => {
  const HeadingTag =
    `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
  // Clone content for possible duration extraction
  let contentItems = section.content;
  // Determine if this section should be rendered as a card (e.g., job/project entry)
  const isCard = level === 2;
  // Default title and no date until we extract one
  const titleText = section.title;
  let dateText: string | null = null;
  if (isCard) {
    // If first content string is a duration (e.g., '2020 - Present', contains year & dash/Present)
    if (contentItems.length > 0 && typeof contentItems[0] === "string") {
      const first = (contentItems[0] as string).trim();
      if (
        /\d{4}/.test(first) &&
        (/[-–]/.test(first) || /Present/i.test(first))
      ) {
        dateText = first;
        contentItems = contentItems.slice(1);
      }
    }
  }
  // Determine if remaining content is just strings
  const allStrings = contentItems.every((item) => typeof item === "string");

  // Render differently if this is a card section (e.g., job/project)
  if (isCard) {
    return (
      <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 border-indigo-500 dark:border-indigo-400">
        <div className="flex justify-between items-start mb-4">
          <HeadingTag className="font-semibold text-xl">{titleText}</HeadingTag>
          {dateText && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {dateText}
            </span>
          )}
        </div>
        {allStrings ? (
          <ul className="list-disc list-inside space-y-1 ml-4">
            {contentItems.map((item, idx) => (
              <li key={idx} className="text-base">
                {item as string}
              </li>
            ))}
          </ul>
        ) : (
          contentItems.map((item, idx) =>
            typeof item === "string" ? (
              <p key={idx} className="text-base mb-2">
                {item}
              </p>
            ) : (
              <ResumeSection key={idx} section={item} level={level + 1} />
            )
          )
        )}
      </div>
    );
  }
  // Default rendering for non-card sections
  return (
    <div className="mb-6">
      <HeadingTag
        className={`font-semibold ${level === 1 ? "text-2xl" : "text-xl"} mb-2`}
      >
        {section.title}
      </HeadingTag>
      {allStrings ? (
        <ul className="list-disc list-inside space-y-1 ml-4">
          {section.content.map((item, idx) => (
            <li key={idx} className="text-base">
              {item as string}
            </li>
          ))}
        </ul>
      ) : (
        section.content.map((item, idx) =>
          typeof item === "string" ? (
            <p key={idx} className="text-base mb-2">
              {item}
            </p>
          ) : (
            <ResumeSection key={idx} section={item} level={level + 1} />
          )
        )
      )}
    </div>
  );
};

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({ resume }) => {
  if (!resume.root || resume.root.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-8">
      {resume.root.map((section, idx) => (
        <ResumeSection key={idx} section={section} />
      ))}
    </div>
  );
};

export default ResumeRenderer;
