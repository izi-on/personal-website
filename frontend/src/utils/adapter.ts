import { Resume, ResumeSection } from "@/types/resume";
import { AdapterFunction, ProcessedResumeSection } from "@/types/adapter";

async function preprocessSection(
  section: ResumeSection,
  depth: number,
  adapter: AdapterFunction,
): Promise<ProcessedResumeSection> {
  const { TitleComponent, ContentComponent } = await adapter(
    section.title,
    depth,
  );

  const processedContent: Array<string | ProcessedResumeSection> = [];
  for (const item of section.content) {
    if (typeof item === "string") {
      processedContent.push(item);
    } else {
      // Recursively preprocess child sections
      const childSection = await preprocessSection(item, depth + 1, adapter);
      processedContent.push(childSection);
    }
  }

  return {
    title: section.title,
    depth,
    TitleComponent,
    ContentComponent,
    content: processedContent,
  };
}

export const preprocessResume = async (
  adapter: AdapterFunction,
  resume: Resume,
): Promise<ProcessedResumeSection[]> =>
  Promise.all(
    resume.root.map((section) => preprocessSection(section, 0, adapter)),
  );

export function extractUrls(text: string) {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  return text.match(urlRegex) || [];
}
