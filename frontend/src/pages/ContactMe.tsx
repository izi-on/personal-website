import { Button } from "@/components/ui/button";
import { socialLinks } from "@/config/Social.tsx";

function ContactMe() {
  return (
    <div className="w-full min-h-screen">
      <div className="grid place-items-center max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Let's talk!</h1>

        <div className="flex justify-center flex-wrap gap-6 items-center">
          {socialLinks.map((link) => (
            <Button
              variant="ghost"
              onClick={() => window.open(link.url)}
              rel="noopener noreferrer"
              className="flex items-center gap-2
              hover:opacity-80 transition-opacity"
            >
              {link.icon}
              <span>{link.title}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactMe;
