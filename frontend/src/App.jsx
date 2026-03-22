import { useState, useEffect } from "react";

const services = [
  {
    category: "🖥️ Compute",
    priority: "MUST KNOW",
    color: "#FF6B35",
    items: [
      { name: "EC2", why: "Virtual servers — the core of any cloud infrastructure" },
      { name: "Lambda", why: "Serverless functions — widely used in modern architectures" },
      { name: "Auto Scaling", why: "Automatically scale servers based on traffic demand" },
    ]
  },
  {
    category: "📦 Containers",
    priority: "MUST KNOW",
    color: "#4ECDC4",
    items: [
      { name: "ECS", why: "Run Docker containers on AWS at scale" },
      { name: "ECR", why: "Store and manage Docker images (like DockerHub, but AWS)" },
      { name: "EKS", why: "Managed Kubernetes on AWS — heavily asked in interviews" },
    ]
  },
  {
    category: "🌐 Networking",
    priority: "MUST KNOW",
    color: "#45B7D1",
    items: [
      { name: "VPC", why: "Private cloud network — one of the most common interview topics" },
      { name: "Route 53", why: "DNS management and traffic routing" },
      { name: "CloudFront", why: "CDN for fast global content delivery" },
      { name: "Load Balancer (ALB/NLB)", why: "Distribute incoming traffic across multiple servers" },
    ]
  },
  {
    category: "💾 Storage",
    priority: "MUST KNOW",
    color: "#96CEB4",
    items: [
      { name: "S3", why: "Object storage for artifacts, backups, and static files" },
      { name: "EBS", why: "Block storage volumes attached to EC2 instances" },
    ]
  },
  {
    category: "🔧 Developer Tools / CI-CD",
    priority: "MUST KNOW",
    color: "#FFEAA7",
    items: [
      { name: "CodeCommit", why: "AWS-managed Git repository" },
      { name: "CodeBuild", why: "Continuous Integration — automatically build and test code" },
      { name: "CodeDeploy", why: "Continuous Delivery — automate application deployments" },
      { name: "CodePipeline", why: "Orchestrate the full CI/CD pipeline end-to-end" },
    ]
  },
  {
    category: "📊 Management & Monitoring",
    priority: "GOOD TO KNOW",
    color: "#DDA0DD",
    items: [
      { name: "CloudWatch", why: "Logs, metrics, and alarms — backbone of AWS monitoring" },
      { name: "CloudFormation", why: "Infrastructure as Code (IaC) — native AWS solution" },
      { name: "CloudTrail", why: "Audit trail — track who did what across your AWS account" },
      { name: "Systems Manager", why: "Remotely manage and patch EC2 instances" },
    ]
  },
  {
    category: "🔐 Security & Identity",
    priority: "MUST KNOW",
    color: "#F8B500",
    items: [
      { name: "IAM", why: "Users, roles, and permissions — the foundation of AWS security" },
      { name: "Security Groups", why: "Virtual firewall rules for EC2 instances" },
      { name: "KMS", why: "Create and manage encryption keys for your data" },
    ]
  },
  {
    category: "🗄️ Database",
    priority: "GOOD TO KNOW",
    color: "#FF8C94",
    items: [
      { name: "RDS", why: "Managed relational database service (MySQL, PostgreSQL, etc.)" },
      { name: "DynamoDB", why: "Serverless NoSQL database — fast and highly scalable" },
    ]
  },
];

const projects = [
  {
    title: "🚀 Project 1: End-to-End CI/CD Pipeline",
    difficulty: "Beginner-Friendly",
    color: "#FF6B35",
    description: "Build a complete automated CI/CD pipeline for a Node.js or Python web application deployed on AWS. Every code push triggers an automatic build, test, and deployment cycle.",
    steps: [
      "Push code to a GitHub repository",
      "CodePipeline detects the change and triggers automatically",
      "CodeBuild compiles and runs unit tests",
      "CodeDeploy pushes the build to an EC2 instance",
      "CloudWatch monitors logs and sets up alerts",
      "S3 stores all build artifacts securely"
    ],
    services: ["EC2", "S3", "CodePipeline", "CodeBuild", "CodeDeploy", "IAM", "CloudWatch"],
    interview_value: "CI/CD is asked in almost every DevOps interview — this project gives you a concrete, real-world answer.",
  },
  {
    title: "🐳 Project 2: Containerized Microservice on ECS",
    difficulty: "Intermediate",
    color: "#4ECDC4",
    description: "Containerize a REST API using Docker, push it to ECR, and deploy it on ECS with a Load Balancer and Auto Scaling — a production-grade setup from day one.",
    steps: [
      "Build a simple REST API (Node.js / Python / Java)",
      "Write a Dockerfile and build the container image",
      "Push the image to Amazon ECR",
      "Create an ECS Cluster and define a Task Definition",
      "Attach an Application Load Balancer for traffic routing",
      "Configure Auto Scaling policies for the ECS service",
      "Set up CloudWatch alarms for CPU and memory thresholds"
    ],
    services: ["ECS", "ECR", "ALB", "VPC", "IAM", "CloudWatch", "Auto Scaling"],
    interview_value: "Covers containers, networking, and scaling in one project — three of the most critical DevOps interview topics.",
  }
];

const resources = [
  {
    category: "🎥 YouTube Channels",
    color: "#FF6B35",
    items: [
      { name: "TechWorld with Nana", desc: "Best channel for DevOps, Docker & Kubernetes fundamentals", url: "https://www.youtube.com/@TechWorldwithNana", tag: "Top Pick" },
      { name: "Abhishek Veeramalla", desc: "In-depth DevOps series covering AWS, Docker & Kubernetes", url: "https://www.youtube.com/@AbhishekVeeramalla", tag: "Recommended" },
      { name: "AWS Official Channel", desc: "Official AWS tutorials, demos and service deep-dives", url: "https://www.youtube.com/@amazonwebservices", tag: "Official" },
      { name: "TrainWithShubham", desc: "Hands-on DevOps projects with real-world scenarios", url: "https://www.youtube.com/@TrainWithShubham", tag: "Projects" },
    ]
  },
  {
    category: "📚 Free Courses & Docs",
    color: "#4ECDC4",
    items: [
      { name: "AWS Skill Builder", desc: "AWS's official free learning platform with 500+ courses", url: "https://skillbuilder.aws", tag: "Free" },
      { name: "AWS Documentation", desc: "Official docs for every AWS service — the most accurate source", url: "https://docs.aws.amazon.com", tag: "Official" },
      { name: "KodeKloud (Free Tier)", desc: "Interactive hands-on labs for Docker, Kubernetes and Linux", url: "https://kodekloud.com", tag: "Hands-on" },
      { name: "Play with Docker", desc: "Practice Docker directly in your browser — no setup needed", url: "https://labs.play-with-docker.com", tag: "Free" },
    ]
  },
  {
    category: "💰 Paid Courses (Worth Every Penny)",
    color: "#FFEAA7",
    items: [
      { name: "Udemy — Stephane Maarek", desc: "AWS Solutions Architect Associate — industry's #1 rated course", url: "https://www.udemy.com/user/stephane-maarek/", tag: "Best Seller" },
      { name: "Udemy — Mumshad Mannambeth", desc: "CKA Kubernetes Certification — the gold standard prep course", url: "https://www.udemy.com/user/mumshad-mannambeth/", tag: "Kubernetes" },
      { name: "A Cloud Guru", desc: "Structured AWS + DevOps learning paths with labs", url: "https://acloudguru.com", tag: "Full Path" },
    ]
  },
  {
    category: "📝 Certification Roadmap",
    color: "#96CEB4",
    items: [
      { name: "AWS Cloud Practitioner (CLF-C02)", desc: "Start here — foundational concepts, 1–2 months prep time", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", tag: "Start Here" },
      { name: "AWS Solutions Architect Associate", desc: "Most in-demand cert — significantly boosts your resume value", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/", tag: "Must Get" },
      { name: "AWS DevOps Engineer Professional", desc: "Advanced certification — recommended after 1+ year of experience", url: "https://aws.amazon.com/certification/certified-devops-engineer-professional/", tag: "Advanced" },
    ]
  },
  {
    category: "🛠️ Practice & Portfolio",
    color: "#DDA0DD",
    items: [
      { name: "AWS Free Tier", desc: "12 months of free access — build all your projects here", url: "https://aws.amazon.com/free/", tag: "Free 12mo" },
      { name: "LocalStack", desc: "Simulate AWS services locally — no credit card required", url: "https://localstack.cloud", tag: "Local Dev" },
      { name: "GitHub", desc: "Host your projects here — recruiters actively review GitHub profiles", url: "https://github.com", tag: "Portfolio" },
      { name: "Roadmap.sh — DevOps", desc: "Visual, community-driven DevOps learning roadmap", url: "https://roadmap.sh/devops", tag: "Roadmap" },
    ]
  },
];

export default function DevOpsRoadmap() {
  const [activeProject, setActiveProject] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("services");

  const filtered = filter === "ALL" ? services : services.filter(s => s.priority === filter);

  const [backendStatus, setBackendStatus] = useState(null);

useEffect(() => {
  fetch('http://54.196.135.76:3000/health')
    .then(res => res.json())
    .then(data => setBackendStatus(data.status))
    .catch(() => setBackendStatus('offline'));
}, []);

  return (
    <div style={{
      background: "#0a0e1a",
      minHeight: "100vh",
      width: "100%",
      fontFamily: "'Courier New', monospace",
      color: "#e0e0e0",
      boxSizing: "border-box",
      padding: "40px 48px",
      overflowX: "hidden",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "8px", color: "#4ECDC4", textTransform: "uppercase", marginBottom: "12px" }}>
          AWS for DevOps Engineers
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 56px)", fontWeight: "900",
          background: "linear-gradient(135deg, #FF6B35, #4ECDC4, #FFEAA7)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          margin: "0 0 14px 0", lineHeight: 1.1
        }}>
          AWS DevOps Engineer Roadmap
        </h1>
        <p style={{ color: "#6b7280", fontSize: "15px", margin: "0 auto", maxWidth: "600px", lineHeight: "1.6" }}>
          From Zero to Hired — Essential AWS skills, real-world projects & curated resources for aspiring DevOps Engineers
        </p>

        {/* Stats Bar */}
        <div style={{ 
  marginTop: "16px", display: "inline-flex", alignItems: "center", 
  gap: "8px", padding: "6px 16px", borderRadius: "20px",
  background: backendStatus === 'healthy' ? "#4ECDC420" : "#FF6B3520",
  border: `1px solid ${backendStatus === 'healthy' ? "#4ECDC4" : "#FF6B35"}40`
}}>
  <div style={{ 
    width: "8px", height: "8px", borderRadius: "50%",
    background: backendStatus === 'healthy' ? "#4ECDC4" : "#FF6B35",
  }}/>
  <span style={{ fontSize: "11px", color: backendStatus === 'healthy' ? "#4ECDC4" : "#FF6B35", fontWeight: "700" }}>
    Backend: {backendStatus === 'healthy' ? 'Connected ✓' : 'Offline'}
  </span>
</div>
      </div>

      {/* Main Tab Navigation */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "36px", flexWrap: "wrap" }}>
        {[
          { id: "services", label: "☁️ AWS Services" },
          { id: "projects", label: "🚀 Projects" },
          { id: "resources", label: "📚 Learning Resources" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "12px 32px", borderRadius: "28px",
            border: `2px solid ${activeTab === tab.id ? "#4ECDC4" : "#1f2937"}`,
            background: activeTab === tab.id ? "#4ECDC4" : "#111827",
            color: activeTab === tab.id ? "#0a0e1a" : "#6b7280",
            cursor: "pointer", fontFamily: "'Courier New', monospace",
            fontWeight: "700", fontSize: "13px", letterSpacing: "1px", transition: "all 0.2s"
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* AWS Services Tab */}
      {activeTab === "services" && (
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
            {["ALL", "MUST KNOW", "GOOD TO KNOW"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "8px 20px", borderRadius: "18px",
                border: `2px solid ${filter === f ? "#FF6B35" : "#1f2937"}`,
                background: filter === f ? "#FF6B35" : "#111827",
                color: filter === f ? "#fff" : "#6b7280",
                cursor: "pointer", fontFamily: "'Courier New', monospace",
                fontWeight: "700", fontSize: "10px", letterSpacing: "2px", transition: "all 0.2s"
              }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "18px" }}>
            {filtered.map((cat, i) => (
              <div key={i} style={{ background: "#111827", borderRadius: "14px", border: "1px solid #1f2937", overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", background: `${cat.color}12`, borderBottom: `2px solid ${cat.color}35`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "700", fontSize: "14px", color: cat.color }}>{cat.category}</span>
                  <span style={{ fontSize: "9px", padding: "4px 10px", borderRadius: "10px", background: cat.priority === "MUST KNOW" ? "#FF6B3518" : "#DDA0DD18", color: cat.priority === "MUST KNOW" ? "#FF6B35" : "#DDA0DD", border: `1px solid ${cat.priority === "MUST KNOW" ? "#FF6B3540" : "#DDA0DD40"}`, fontWeight: "700", letterSpacing: "1px" }}>
                    {cat.priority}
                  </span>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  {cat.items.map((item, j) => (
                    <div key={j} style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: j < cat.items.length - 1 ? "1px solid #1f2937" : "none" }}>
                      <div style={{ fontWeight: "700", color: "#fff", fontSize: "13px", marginBottom: "4px" }}>▸ {item.name}</div>
                      <div style={{ color: "#6b7280", fontSize: "12px", lineHeight: "1.5" }}>{item.why}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(460px, 1fr))", gap: "24px" }}>
          {projects.map((proj, i) => (
            <div key={i} style={{ background: "#111827", borderRadius: "16px", border: `2px solid ${proj.color}25`, overflow: "hidden", cursor: "pointer", transition: "all 0.3s", boxShadow: activeProject === i ? `0 0 40px ${proj.color}20` : "none" }}
              onClick={() => setActiveProject(activeProject === i ? null : i)}>
              <div style={{ padding: "24px", background: `linear-gradient(135deg, ${proj.color}12, transparent)`, borderBottom: `1px solid ${proj.color}20` }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "17px", fontWeight: "800", color: "#fff", lineHeight: 1.3 }}>{proj.title}</h3>
                <span style={{ fontSize: "10px", padding: "4px 12px", borderRadius: "10px", background: `${proj.color}18`, color: proj.color, fontWeight: "700", letterSpacing: "1px" }}>{proj.difficulty}</span>
              </div>
              <div style={{ padding: "20px 24px" }}>
                <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: "1.7", margin: "0 0 20px 0" }}>{proj.description}</p>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "10px", color: "#6b7280", letterSpacing: "2px", marginBottom: "10px" }}>AWS SERVICES USED:</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {proj.services.map((s, j) => (
                      <span key={j} style={{ padding: "4px 10px", background: "#1f2937", borderRadius: "8px", fontSize: "11px", color: proj.color, fontWeight: "600", border: `1px solid ${proj.color}25` }}>{s}</span>
                    ))}
                  </div>
                </div>
                {activeProject === i && (
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ fontSize: "10px", color: "#6b7280", letterSpacing: "2px", marginBottom: "12px" }}>IMPLEMENTATION STEPS:</div>
                    {proj.steps.map((step, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px", fontSize: "12px", color: "#d1d5db", lineHeight: "1.5" }}>
                        <span style={{ color: proj.color, fontWeight: "800", minWidth: "18px" }}>{j + 1}.</span>{step}
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ padding: "12px 16px", background: "#FFEAA708", borderRadius: "10px", border: "1px solid #FFEAA725", fontSize: "12px", color: "#FFEAA7", lineHeight: "1.6" }}>
                  💡 <strong>Interview Value:</strong> {proj.interview_value}
                </div>
                <div style={{ textAlign: "center", marginTop: "14px", fontSize: "10px", color: "#4b5563", letterSpacing: "1px" }}>
                  {activeProject === i ? "▲ COLLAPSE STEPS" : "▼ VIEW IMPLEMENTATION STEPS"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Learning Resources Tab */}
      {activeTab === "resources" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "20px" }}>
          {resources.map((cat, i) => (
            <div key={i} style={{ background: "#111827", borderRadius: "14px", border: `1px solid ${cat.color}20`, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", background: `${cat.color}10`, borderBottom: `2px solid ${cat.color}30` }}>
                <span style={{ fontWeight: "700", fontSize: "15px", color: cat.color }}>{cat.category}</span>
              </div>
              <div style={{ padding: "14px 20px" }}>
                {cat.items.map((item, j) => (
                  <div key={j} style={{ marginBottom: "14px", paddingBottom: "14px", borderBottom: j < cat.items.length - 1 ? "1px solid #1f2937" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer"
                        style={{ fontWeight: "700", color: "#fff", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = cat.color}
                        onMouseLeave={e => e.target.style.color = "#fff"}>
                        ▸ {item.name} ↗
                      </a>
                      <span style={{ fontSize: "9px", padding: "3px 8px", borderRadius: "8px", background: `${cat.color}18`, color: cat.color, fontWeight: "700", whiteSpace: "nowrap", marginLeft: "10px", letterSpacing: "0.5px" }}>
                        {item.tag}
                      </span>
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "12px", lineHeight: "1.5" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Tip */}
      <div style={{ marginTop: "48px", padding: "28px 40px", background: "#111827", borderRadius: "16px", border: "1px solid #4ECDC425", textAlign: "center" }}>
        <div style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "700", color: "#fff" }}>⚡ The #1 Interview Tip</div>
        <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: "1.8", margin: "0 auto", maxWidth: "640px" }}>
          Don't just study theory — <span style={{ color: "#4ECDC4", fontWeight: "700" }}>build these projects on AWS Free Tier</span> and push them to GitHub with a detailed README explaining your architecture.
          <br />Walking into an interview and saying <span style={{ color: "#FF6B35", fontStyle: "italic", fontWeight: "600" }}>"I have built and deployed this in production"</span> is what separates hired candidates from the rest.
        </p>
      </div>
    </div>
  );
}