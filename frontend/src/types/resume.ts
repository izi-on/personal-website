import { z } from "zod";

type _ResumeSection = {
  title: string;
  content: Array<string | ResumeSection>;
};

const ResumeSectionSchema: z.ZodType<_ResumeSection> = z.lazy(() =>
  z.object({
    title: z.string(),
    content: z.array(z.union([z.string(), ResumeSectionSchema])),
  }),
);

export const ResumeSchema = z.object({
  root: z.array(ResumeSectionSchema),
});

export type ResumeSection = z.infer<typeof ResumeSectionSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

export type ParsedResumeSection = ResumeSection & {
  startDate?: Date;
  endDate?: Date;
};
