import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from "mongodb";

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');

console.log('Attempting to load environment variables from:', envPath);
console.log('File exists:', require('fs').existsSync(envPath));

dotenv.config({ path: envPath });

// Verify MONGODB_URI is loaded
console.log('MONGODB_URI after loading .env.local:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');

// Sample blog posts about tech and cybercrime
const samplePosts = [
  {
    title: "Understanding Cybersecurity Threats in 2025",
    slug: "understanding-cybersecurity-threats-in-2025",
    content: `Cybersecurity threats continue to evolve and become more sophisticated each year. Understanding the landscape of these threats is crucial for businesses and individuals to protect themselves effectively.

## Top Cybersecurity Threats for 2025

### AI-Powered Attacks
Artificial intelligence is being leveraged by cybercriminals to create more targeted and effective attacks. These include:
- Deepfake social engineering attempts
- Automated, intelligent phishing campaigns
- AI-optimized password cracking

### Cloud Security Vulnerabilities
As more organizations move to cloud-based solutions, attackers are targeting misconfigured cloud environments:
- Unsecured storage containers
- Weak identity and access management
- Inadequate encryption practices

### Supply Chain Attacks
Attackers are increasingly targeting third-party vendors and service providers to gain access to multiple organizations at once. These attacks can have devastating effects, as seen in recent high-profile incidents.

## Best Practices for Defense

### Multi-Factor Authentication
Implement MFA wherever possible to add an additional layer of security beyond passwords.

### Zero Trust Architecture
Adopt a Zero Trust security model where no user or device is trusted by default, regardless of their location.

### Regular Updates and Patching
Keep all systems updated with the latest security patches to protect against known vulnerabilities.

## Conclusion

Staying ahead of cybersecurity threats requires constant vigilance and education. Organizations must invest in security training, maintain updated systems, and implement robust security protocols to protect against evolving threats.`,
    excerpt: "Discover the top cybersecurity threats expected in 2025 and learn how to protect yourself and your organization.",
    status: "published",
    tags: ["cybersecurity", "threats", "2025"],
    categories: ["Technology", "Security"],
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date()
  },
  {
    title: "The Rise of Quantum Computing: Implications for Digital Security",
    slug: "rise-of-quantum-computing-implications-digital-security",
    content: `Quantum computing represents a revolutionary advancement in computational power, with the potential to solve complex problems much faster than traditional computers. However, this technological leap also presents significant challenges to current digital security practices.

## How Quantum Computing Works

Quantum computers use quantum bits, or qubits, which can exist in multiple states simultaneously. This allows them to perform calculations in ways that classical computers cannot, potentially making them exponentially more powerful for certain tasks.

## Impact on Current Encryption

### RSA and Public-Key Cryptography
Many of today's encryption methods, including RSA encryption, rely on the computational difficulty of factoring large numbers. Quantum computers, particularly those running Shor's algorithm, could potentially break these encryption methods in a fraction of the time it would take classical computers.

### Symmetric Key Encryption
While quantum computers also pose a threat to symmetric key encryption, the impact is less severe. Grover's algorithm can speed up searches, but only effectively halves the security of symmetric algorithms, meaning AES-256 would still have 128 bits of security.

## Preparing for the Quantum Future

### Post-Quantum Cryptography
Researchers and organizations are developing new cryptographic algorithms that are resistant to quantum computer attacks. These "post-quantum" algorithms are designed to maintain security even in the presence of powerful quantum computers.

### Hybrid Approaches
Many organizations are exploring hybrid approaches that combine classical and quantum-resistant algorithms to ensure security during the transition period.

## Timeline and Expectations

Current estimates suggest that quantum computers capable of breaking today's encryption could be available within 10-20 years. This timeline emphasizes the importance of beginning the transition to quantum-resistant algorithms now.

## Conclusion

The emergence of quantum computing presents both opportunities and challenges. While it promises breakthroughs in fields like medicine and materials science, it also demands a fundamental shift in how we approach digital security. Organizations must start preparing for the quantum future today to ensure the continued protection of sensitive information.`,
    excerpt: "Explore how quantum computing will change digital security and what steps organizations are taking to prepare.",
    status: "published",
    tags: ["quantum computing", "encryption", "digital security"],
    categories: ["Technology", "Security"],
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date()
  },
  {
    title: "AI Ethics: Balancing Innovation with Responsibility",
    slug: "ai-ethics-balancing-innovation-with-responsibility",
    content: `As artificial intelligence becomes increasingly integrated into our daily lives, the ethical implications of these powerful technologies demand careful consideration. Balancing innovation with responsibility is crucial for ensuring AI benefits society as a whole.

## Key Ethical Concerns in AI

### Bias and Fairness
AI systems often reflect and amplify the biases present in their training data. This can result in discriminatory outcomes in areas such as:
- Hiring and employment decisions
- Loan approvals and credit scoring
- Healthcare diagnosis and treatment recommendations
- Criminal justice and risk assessment

### Transparency and Explainability
Many AI systems, particularly deep learning models, operate as "black boxes," making it difficult to understand how they arrive at their decisions. This lack of transparency raises concerns about accountability and trust.

### Privacy and Surveillance
AI systems often require vast amounts of data, raising privacy concerns about how this information is collected, stored, and used. Additionally, AI-powered surveillance technologies can infringe on civil liberties and create a culture of constant monitoring.

### Autonomous Systems and Job Displacement
The automation potential of AI raises questions about economic inequality and the future of work. As AI systems become more capable, they may displace workers across various industries.

## Frameworks for Ethical AI

### Principles-Based Approaches
Many organizations have developed AI ethics principles that include:
- Fairness and non-discrimination
- Transparency and explainability
- Privacy and security
- Accountability and human oversight
- Beneficence and human welfare

### Regulatory Approaches
Governments are beginning to implement regulations to ensure ethical AI development, such as the European Union's proposed AI Act.

## Implementing Ethical AI

### Diverse Development Teams
Including diverse perspectives in AI development can help identify and mitigate potential ethical issues before they become problematic.

### Ethical Impact Assessments
Conducting assessments to evaluate the potential ethical implications of AI systems before deployment can help prevent negative outcomes.

### Continuous Monitoring
AI systems should be continuously monitored for ethical compliance, as ethical issues may emerge over time.

## Conclusion

Developing ethical AI requires a proactive approach that balances the benefits of innovation with the responsibility to protect individuals and society. Through careful consideration of ethical implications, collaboration between technologists and ethicists, and appropriate regulation, we can harness the power of AI while minimizing potential harms.`,
    excerpt: "Examine the ethical challenges posed by AI technology and strategies for responsible development.",
    status: "published",
    tags: ["AI ethics", "artificial intelligence", "responsibility"],
    categories: ["Technology", "Ethics"],
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date()
  },
  {
    title: "The Dark Web: Exploring Hidden Internet Dangers",
    slug: "dark-web-exploring-hidden-internet-dangers",
    content: `The Dark Web represents a hidden portion of the internet that is not indexed by traditional search engines and requires special tools to access. Understanding its structure and dangers is essential for cybersecurity awareness.

## What is the Dark Web?

The Dark Web is part of the Deep Web, which includes all web content not indexed by search engines. Unlike the Surface Web (content accessible through search engines), the Dark Web is intentionally hidden and requires specific tools for access.

### Accessing the Dark Web
- Tor Browser: The most common tool for accessing the Dark Web
- Specialized search engines (like Ahmia or Torch)
- VPNs for additional privacy

## Common Activities on the Dark Web

### Legal Uses
- Whistleblower platforms
- Private communication in oppressive regimes
- Academic research
- Anonymous marketplaces for legal goods

### Illegal Activities
- Illegal drug markets
- Stolen data trading
- Illegal weapons sales
- Malware distribution
- Identity theft services

## Cybersecurity Implications

### Threats to Organizations
- Data breaches and stolen credentials
- Malware distribution
- Advanced persistent threats (APTs)
- Information about organizational vulnerabilities

### Protection Strategies
- Comprehensive threat intelligence
- Dark web monitoring services
- Employee education about dark web dangers
- Strong access controls and credential management

## Real-World Examples

### Notable Dark Web Marketplaces
- Silk Road (shutdown in 2013)
- AlphaBay (shutdown in 2017)
- Hansa Market (shutdown in 2017)

### Law Enforcement Operations
Recent operations have successfully disrupted dark web criminal enterprises, resulting in arrests and seizures of illegal goods and services worth millions of dollars.

## Protecting Yourself from Dark Web Threats

### Individual Protection
- Monitor your digital footprint
- Use strong, unique passwords
- Enable two-factor authentication
- Regularly check if your information has been compromised

### Business Protection
- Implement comprehensive cybersecurity programs
- Use dark web monitoring services
- Regular security assessments
- Employee training on cybersecurity best practices

## Conclusion

While the Dark Web serves legitimate purposes for privacy and anonymity, it also harbors significant risks. Understanding these risks and implementing appropriate protection measures is crucial for both individuals and organizations in the digital age.`,
    excerpt: "A comprehensive look at the Dark Web, its dangers, and how to protect against associated cybersecurity threats.",
    status: "published",
    tags: ["dark web", "cybercrime", "privacy", "tor"],
    categories: ["Cybersecurity", "Technology"],
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date()
  },
  {
    title: "5G Security: New Opportunities, New Risks",
    slug: "5g-security-new-opportunities-new-risks",
    content: `The rollout of 5G technology promises unprecedented speed and connectivity, enabling innovations like autonomous vehicles, smart cities, and advanced IoT applications. However, these capabilities also introduce new security challenges that organizations and governments must address.

## What is 5G?

5G technology represents the 5th generation of mobile networks, offering:
- Up to 100 times faster speeds than 4G
- Ultra-low latency (under 1 millisecond)
- Ability to connect millions of devices per square kilometer
- Enhanced reliability and availability

## Security Opportunities

### Network Slicing
5G allows for virtual network slicing, which can provide isolated network segments for different purposes, potentially improving security by containing breaches to specific slices.

### Enhanced Authentication
5G includes improved authentication mechanisms compared to previous generations.

### Security by Design
5G was designed with better security considerations from the ground up.

## Security Challenges

### Expanded Attack Surface
The increased connectivity and device integration create a much larger attack surface for cybercriminals.

### IoT Vulnerabilities
The massive number of connected IoT devices often have inherent security weaknesses, creating potential entry points for attackers.

### Infrastructure Complexity
The complexity of 5G infrastructure makes it harder to secure and monitor effectively.

### Supply Chain Risks
Global supply chains for 5G equipment create potential vulnerabilities related to hardware and software integrity.

## Specific Threat Vectors

### Network Slicing Security
While network slicing can improve security, misconfigurations can create isolation failures allowing attacks to cross between slices.

### Edge Computing Risks
5G's edge computing capabilities move processing closer to users but also extend potential attack surfaces to these distributed points.

### Denial of Service
The increased connectivity and speed of 5G could potentially amplify the impact of DDoS attacks.

## Government and Industry Responses

### Security Standards
Organizations like 3GPP, GSMA, and NIST have developed new security standards and guidelines for 5G networks.

### International Cooperation
Governments are working together to establish security protocols and address supply chain concerns.

### Private Sector Investment
Telecommunications companies are investing heavily in security solutions for 5G infrastructure.

## Best Practices for 5G Security

### Network Architecture
Implement defense-in-depth strategies with multiple security layers.

### Continuous Monitoring
Employ AI and machine learning for real-time threat detection and response.

### Vendor Assessment
Carefully evaluate and monitor all vendors and their security practices.

### Regular Updates
Maintain current security patches and updates across all network components.

## Impact on End Users

### Consumer Devices
Users should ensure their devices have updated security features and be cautious about connecting to unknown 5G networks.

### Enterprise Considerations
Businesses should evaluate their security architectures as they leverage 5G capabilities.

## Conclusion

5G technology represents a significant leap forward in connectivity and capability, but it also introduces new security challenges that require thoughtful and comprehensive approaches. Success in securing 5G networks will require collaboration between industry, government, and security researchers to address emerging threats while maximizing the benefits of this transformative technology.`,
    excerpt: "An analysis of the security implications of 5G technology, including new opportunities and risks for organizations.",
    status: "published",
    tags: ["5G", "network security", "telecommunications", "IoT"],
    categories: ["Technology", "Security"],
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date()
  }
];

async function seedBlogPosts() {
  console.log('MONGODB_URI environment variable:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');
  if (!process.env.MONGODB_URI) {
    console.log('Available environment variables:', Object.keys(process.env).filter(key => key.includes('MONGO')));
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();
    const postsCollection = db.collection("posts");

    // Check if sample posts already exist
    const existingCount = await postsCollection.countDocuments({
      slug: { $in: samplePosts.map(post => post.slug) }
    });

    if (existingCount > 0) {
      console.log(`${existingCount} sample posts already exist. Skipping seed.`);
      return;
    }

    // Insert sample posts
    const result = await postsCollection.insertMany(samplePosts);
    console.log(`Successfully inserted ${result.insertedCount} sample blog posts.`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

// Run the seeding function
seedBlogPosts();