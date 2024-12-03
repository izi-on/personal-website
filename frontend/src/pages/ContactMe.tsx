import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function ContactMe() {
  return (
    <div className="w-full min-h-screen">
      <div className="grid place-items-center max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Let's talk!</h1>

        <div className="flex gap-6 items-center">
          <Button
            variant="ghost"
            onClick={() =>
              window.open("https://linkedin.com/in/hristo-sandev-7b8059172")
            }
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <FaLinkedin className="w-8 h-8" />
            <span>LinkedIn</span>
          </Button>

          <Button
            variant="ghost"
            onClick={() => {
              window.open("https://github.com/izi-on");
            }}
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <FaGithub className="w-8 h-8" />
            <span>GitHub</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactMe;
