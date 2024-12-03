import { forwardRef } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Tabs } from "@/config/RootTabsConfig";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const baseNavBtnStyle = "text-sm font-medium";

const ifSelectedStyle =
  "rounded-none border-b-2 border-b-black dark:border-b-white";

interface NavigationButtonProps {
  path: string;
  children?: React.ReactNode;
  className?: string; // Make className optional
}

const NavigationButton = forwardRef<HTMLButtonElement, NavigationButtonProps>(
  ({ path, children, className }, ref) => {
    const navigate = useNavigate();
    const isSelected = useLocation().pathname.substring(1) === path;
    return (
      <Button
        variant="ghost"
        ref={ref}
        onClick={() => navigate(path)}
        className={cn(
          baseNavBtnStyle,
          className,
          isSelected && ifSelectedStyle,
        )}
      >
        {children}
      </Button>
    );
  },
);
export function Navbar({ tabs }: { tabs: Tabs[] }) {
  const NavItems = tabs.map((tab) => (
    <NavigationButton path={tab.key}>{tab.title}</NavigationButton>
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
