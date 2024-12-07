import { useTheme } from "@/hooks/theme";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

// Component with icon toggle
function ThemeToggle() {
  const { setTheme, isDark } = useTheme();
  const onClick = () => {
    setTheme(isDark() ? "light" : "dark");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={onClick}
    >
      <Sun
        className="h-5 
        w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        className="absolute 
        h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;
