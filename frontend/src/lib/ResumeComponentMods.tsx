import {
  decorateSpecialKeywords,
  linkifyContent,
  fancifyText,
} from "@/components/resume_adapter/mods";
import { pipe } from "motion/react";

export const resumeComponentMods = (component: JSX.Element) =>
  pipe(linkifyContent, decorateSpecialKeywords, fancifyText)(component);
