import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ResumeRendererProps, SectionRendererProps } from "@/types/renderer";

export function ResumeSkeleton() {
  return (
    <div className="space-y-10 mt-3">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-5">
          <Skeleton className="h-9 w-1/2 rounded-xl" />
          <div className="space-y-4">
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={idx} className="h-5 w-full" />
            ))}
          </div>
        </div>
      ))}
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
