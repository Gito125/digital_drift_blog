const Categories = [
  // Original Categories
  {
    name: "Web Development",
    slug: "web-development",
    description:
      "Articles about web technologies, frameworks, and best practices",
  },
  {
    name: "AI & Machine Learning",
    slug: "ai-ml",
    description:
      "Exploring artificial intelligence and machine learning applications",
  },
  {
    name: "Cloud Computing",
    slug: "cloud-computing",
    description: "Cloud architectures, services, and deployment strategies",
  },
  {
    name: "DevOps",
    slug: "devops",
    description: "DevOps practices, CI/CD, automation, and infrastructure",
  },
  {
    name: "Cybersecurity",
    slug: "cybersecurity",
    description: "Security best practices, threats, and protection strategies",
  },
  {
    name: "Data Science",
    slug: "data-science",
    description: "Data analysis, visualization, and scientific methodologies",
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description: "iOS, Android, and cross-platform mobile applications",
  },
  {
    name: "Blockchain",
    slug: "blockchain",
    description:
      "Distributed ledger technology, cryptocurrencies, and smart contracts",
  },
  {
    name: "Game Development",
    slug: "game-development",
    description: "Game design, engines, and interactive experiences",
  },
  {
    name: "Internet of Things",
    slug: "iot",
    description: "Connected devices, sensors, and smart systems",
  },
  {
    name: "Quantum Computing",
    slug: "quantum-computing",
    description: "Emerging quantum technologies and applications",
  },
  {
    name: "Software Architecture",
    slug: "software-architecture",
    description: "Design patterns, system design, and architectural principles",
  },
  {
    name: "API Development",
    slug: "api-development",
    description: "Building and consuming APIs, REST, GraphQL, and more",
  },
  {
    name: "Testing",
    slug: "testing",
    description: "Unit tests, integration tests, and quality assurance",
  },
  {
    name: "Performance",
    slug: "performance",
    description: "Optimization techniques and performance monitoring",
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux",
    description: "User interface and user experience design principles",
  },
  {
    name: "Frontend Frameworks",
    slug: "frontend-frameworks",
    description: "React, Vue, Angular, and other frontend technologies",
  },
  {
    name: "Backend Technologies",
    slug: "backend-technologies",
    description: "Server-side technologies, databases, and infrastructure",
  },
  {
    name: "Emerging Tech",
    slug: "emerging-tech",
    description: "Cutting-edge technologies and future trends",
  },

  // New Categories Based on 2024-2025 Trends
  {
    name: "WebAssembly",
    slug: "webassembly",
    description:
      "High-performance web applications and portable binary instruction format",
  },
  {
    name: "Edge Computing",
    slug: "edge-computing",
    description:
      "Distributed computing at network edges for low-latency applications",
  },
  {
    name: "Serverless Architecture",
    slug: "serverless",
    description:
      "Function-as-a-Service, event-driven computing, and serverless patterns",
  },
  {
    name: "Rust Programming",
    slug: "rust",
    description:
      "Memory-safe systems programming and performance-critical applications",
  },
  {
    name: "Python Development",
    slug: "python",
    description: "Python frameworks, libraries, and application development",
  },
  {
    name: "TypeScript",
    slug: "typescript",
    description: "Type-safe JavaScript development and modern tooling",
  },
  {
    name: "Go Programming",
    slug: "golang",
    description: "Go language for cloud-native and scalable systems",
  },
  {
    name: "Low-Code/No-Code",
    slug: "low-code-no-code",
    description:
      "Visual development platforms and rapid application development",
  },
  {
    name: "Progressive Web Apps",
    slug: "pwa",
    description: "Native-like web experiences and offline-first applications",
  },
  {
    name: "Container Orchestration",
    slug: "containers",
    description: "Docker, Kubernetes, and container deployment strategies",
  },
  {
    name: "Microservices",
    slug: "microservices",
    description: "Distributed systems architecture and service-oriented design",
  },
  {
    name: "GraphQL",
    slug: "graphql",
    description: "Query language for APIs and efficient data fetching",
  },
  {
    name: "JAMstack",
    slug: "jamstack",
    description: "JavaScript, APIs, and Markup for modern web architecture",
  },
  {
    name: "Platform Engineering",
    slug: "platform-engineering",
    description: "Building internal developer platforms and tooling",
  },
  {
    name: "AI Code Assistants",
    slug: "ai-coding-tools",
    description: "GitHub Copilot, ChatGPT, and AI-powered development tools",
  },
  {
    name: "Natural Language Processing",
    slug: "nlp",
    description: "Text analysis, language models, and conversational AI",
  },
  {
    name: "Computer Vision",
    slug: "computer-vision",
    description: "Image processing, object detection, and visual AI",
  },
  {
    name: "MLOps",
    slug: "mlops",
    description:
      "Machine learning operations, model deployment, and monitoring",
  },
  {
    name: "AR/VR Development",
    slug: "ar-vr",
    description: "Augmented and virtual reality applications and experiences",
  },
  {
    name: "Embedded Systems",
    slug: "embedded-systems",
    description: "IoT, firmware development, and hardware programming",
  },
  {
    name: "Real-Time Applications",
    slug: "real-time-apps",
    description: "WebSockets, streaming data, and live communication",
  },
  {
    name: "Observability",
    slug: "observability",
    description: "Monitoring, logging, tracing, and system insights",
  },
  {
    name: "Infrastructure as Code",
    slug: "iac",
    description: "Terraform, Pulumi, and automated infrastructure management",
  },
  {
    name: "API Security",
    slug: "api-security",
    description: "OAuth, JWT, and secure API development practices",
  },
  {
    name: "Database Technologies",
    slug: "databases",
    description: "SQL, NoSQL, NewSQL, and database design patterns",
  },
  {
    name: "Distributed Systems",
    slug: "distributed-systems",
    description: "Scalable architectures, consistency, and fault tolerance",
  },
  {
    name: "Event-Driven Architecture",
    slug: "event-driven",
    description: "Message queues, event streaming, and asynchronous patterns",
  },
  {
    name: "Green Computing",
    slug: "green-computing",
    description:
      "Energy-efficient code, sustainable tech, and carbon-aware computing",
  },
  {
    name: "Web3 Technologies",
    slug: "web3",
    description: "Decentralized web, dApps, and blockchain applications",
  },
  {
    name: "Developer Tools",
    slug: "dev-tools",
    description: "IDEs, version control, and productivity enhancement tools",
  },
  {
    name: "Code Quality",
    slug: "code-quality",
    description: "Best practices, refactoring, and maintainable code",
  },
  {
    name: "Accessibility",
    slug: "accessibility",
    description:
      "Inclusive design, WCAG compliance, and assistive technologies",
  },
  {
    name: "Cross-Platform Development",
    slug: "cross-platform",
    description: "Flutter, React Native, and multi-platform frameworks",
  },
  {
    name: "Functional Programming",
    slug: "functional-programming",
    description: "Immutability, pure functions, and functional paradigms",
  },
  {
    name: "System Design",
    slug: "system-design",
    description: "Scalability, reliability, and architectural decision-making",
  },
  {
    name: "Tech Leadership",
    slug: "tech-leadership",
    description:
      "Engineering management, team building, and technical strategy",
  },
];

export default Categories;