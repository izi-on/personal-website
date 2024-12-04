import { FaLinkedin, FaGithub } from "react-icons/fa";

export type SocialLink = {
  key: string;
  title: string;
  icon: React.ReactNode;
  url: string;
};

export const socialLinks: SocialLink[] = [
  {
    key: "linkedin",
    icon: <FaLinkedin />,
    title: "LinkedIn",
    url: "https://linkedin.com/in/hristo-sandev-7b8059172",
  },
  {
    key: "github",
    icon: <FaGithub />,
    title: "GitHub",
    url: "https://github.com/izi-on",
  },
];
