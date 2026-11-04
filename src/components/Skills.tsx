import { ThinkingOrb } from "./Orb";
import Morph from "./Morph";

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
    <section id="skills" className="wrap sec" data-say="Four kinds of tools. Each orb thinks a different way.">
      <div className="sec-head">
        <Morph as="h2" text="Skills & Tools" className="h2" />
      </div>
      <div className="skills" data-stagger>
        {Object.entries(skills).map(([category, items], n) => (
          <div key={category} className="card" style={{ "--n": n } as React.CSSProperties}>
            <h3><span className="orb-pill"><ThinkingOrb state={orbs[category as keyof typeof orbs]} size={20} theme="dark" /></span>{category}</h3>
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
