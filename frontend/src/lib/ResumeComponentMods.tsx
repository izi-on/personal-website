import {
  addIconToContent,
  linkifyContent,
} from "@/components/resume_adapter/mods";
import { pipe } from "motion/react";

export const resumeComponentMods = (component: JSX.Element) =>
  pipe(linkifyContent, addIconToContent)(component);
