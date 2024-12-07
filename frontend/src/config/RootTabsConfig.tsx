import ContactMe from "@/pages/ContactMe";
import Home from "@/pages/home/Home";

export type Tabs = {
  key: string;
  title: string;
  component: React.ReactNode;
};

export const tabs: Tabs[] = [
  {
    key: "",
    title: "Home",
    component: <Home />,
  },
  {
    key: "contact",
    title: "Contact",
    component: <ContactMe />,
  },
];
