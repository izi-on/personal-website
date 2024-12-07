import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ResumeRendererProps, SectionRendererProps } from "@/types/renderer";

export function ResumeSkeleton() {
  return (
    <div className="flex flex-col space-y-6">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({ sections }) => {
  return (
    <div className="resume-container">
      {sections.map((section, index) => (
        <SectionRenderer key={index} section={section} />
      ))}
    </div>
  );
};

const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  const { TitleComponent, ContentComponent, depth, content } = section;

  return (
    <div className="section-container mb-4">
      <TitleComponent title={section.title} depth={depth} />
      <div className="section-content ml-2">
        {content.map((item, idx) => {
          if (typeof item === "string") {
            return <ContentComponent key={idx} content={item} depth={depth} />;
          }
          return <SectionRenderer key={idx} section={item} />;
        })}
      </div>
    </div>
  );
};
