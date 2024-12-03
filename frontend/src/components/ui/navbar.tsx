import { forwardRef } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Tabs } from "@/config/RootTabsConfig";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { UnderlineOnSelection } from "./UnderlineOnSelection";

const baseNavBtnStyle = "text-sm font-medium";

interface NavigationButtonProps {
  path: string;
  children?: React.ReactNode;
  className?: string; // Make className optional
}

const NavigationButton = forwardRef<HTMLButtonElement, NavigationButtonProps>(
  ({ path, children, className }, ref) => {
    const navigate = useNavigate();
    return (
      <Button
        variant="ghost"
        ref={ref}
        onClick={() => navigate(path)}
        className={cn(baseNavBtnStyle, className)}
      >
        {children}
      </Button>
    );
  },
);

export function Navbar({ tabs }: { tabs: Tabs[] }) {
  const location = useLocation();
  const isSelected = (key: string) => () =>
    location.pathname.substring(1) === key;
  const NavItems = tabs.map((tab) => (
    <UnderlineOnSelection isSelected={isSelected(tab.key)}>
      <NavigationButton path={tab.key}>{tab.title}</NavigationButton>
    </UnderlineOnSelection>
  ));
  return (
    <nav className="border-b">
      <div className="relative flex h-16 items-center justify-center mx-4">
        {/* Logo */}
        <div className="absolute flex items-center left-0">
          <img
            src="https://github.com/izi-on.png"
            alt="GitHub Profile Picture"
            width={40}
            height={40}
            className="rounded-full" // Makes the image circular
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 mx-6">
          {NavItems}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden mx-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">{NavItems}</SheetContent>
          </Sheet>
        </div>

        {/* Right side items (optional) */}
        <div className="absolute right-0 hidden md:flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
