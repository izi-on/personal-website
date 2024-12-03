import { motion } from "motion/react";

function Home() {
  return (
    <div className="w-full min-h-screen">
      <div className="grid place-items-center max-w-4xl mx-auto p-8 z-0">
        <motion.h1
          className="text-4xl font-bold mb-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Hi, I'm Hristo{" "}
          <motion.span
            animate={{
              rotate: [0, 20, -20, 20, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{
              display: "inline-block",
              originX: 0.7,
              originY: 0.7,
            }}
          >
            👋
          </motion.span>
        </motion.h1>

        <div className="space-y-6">
          <p className="text-lg">
            I'm a computer science student passionate about finding elegant
            solutions to complex problems. This personal website is a small
            project. It's built with React, Tailwind CSS, and Vite.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">What I'm Learning</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Full-stack Development</li>
                <li>Cloud Computing</li>
                <li>Software Design</li>
                <li>System Design</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Current Focus</h2>
              <p>
                When I'm not studying, you'll find me working on personal
                projects, reading up on something, at the gym, or spoiling my
                girlfriend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
