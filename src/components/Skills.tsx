import { ThinkingOrb } from "./Orb";

const skills = {
  "Product Skills": ["Product lifecycle management", "Roadmap planning", "Requirements & PRD writing", "Prioritisation (RICE, MoSCoW)", "Metrics & KPI definition", "User research & discovery", "0-to-1 product development"],
  Methodologies: ["Agile / Scrum", "Design thinking", "OKRs", "Jobs-to-be-done (JTBD)", "Multi-tenant SaaS architecture", "API-first product design"],
  "Technical Fluency": ["Java / Spring Boot", "Python", "JavaScript", "GenAI / LLM / RAG", "SQL / SAP HANA", "Cloud & microservices", "REST APIs", "Bash / automation scripting"],
  Tools: ["Jira", "Confluence", "Figma", "SQL", "SAP BTP / HANA Cloud", "Git / GitHub"],
};
// each kind of skill gets the orb that moves like it
const orbs = { "Product Skills": "shaping", Methodologies: "weaving", "Technical Fluency": "solving", Tools: "working" } as const;

export default function Skills() {
  return (
    <section id="skills" className="sec" data-say="Four kinds of tools. Each orb thinks a different way.">
      <div className="sec-head" data-reveal>
        <h2 className="display h2">Skills &amp; Tools</h2>
      </div>
      <div className="skills" data-reveal>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="panel">
            <h3><ThinkingOrb state={orbs[category as keyof typeof orbs]} size={20} theme="dark" /> {category}</h3>
            <div className="chips">
              {items.map((skill, i) => (
                <span key={skill} className={`chip${i > 3 ? " d60" : ""}`}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
