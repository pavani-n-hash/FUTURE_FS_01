// projectsData.js

const projects = [
  {
    id: 1,
    title: "ML Telemetry Dashboard",
    tag: "MLOps • Backend",
    description:
      "Pipeline telemetry dashboard tracking latency, drift signals, and resource usage for ML experiments with near real-time views.",
    tech: ["Node", "Express", "MongoDB", "React", "Charts", "JWT"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "Dev Notes API",
    tag: "Backend • API",
    description:
      "Opinionated notes/snippets API for developers with tagging, search, and rate-limited public endpoints.",
    tech: ["Node", "Express", "MongoDB", "Mongoose", "Testing"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "Interactive Portfolio",
    tag: "Full stack",
    description:
      "Portfolio web app with animated sections, dark mode, and a contact pipeline wired to email notifications.",
    tech: ["React", "Node", "Animations", "SEO"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

module.exports = { projects };
