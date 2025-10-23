export interface TimelineNode {
  id: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
  skills: string[];
  xp: number;
  type: 'work' | 'project' | 'milestone';
}

export const timelineData: TimelineNode[] = [
  {
    id: 'att-2025',
    title: 'Software Engineer Intern',
    company: 'AT&T',
    location: 'Dallas, TX',
    dates: 'June 2025 – Aug 2025',
    bullets: [
      'Migrated 100M+ documents to INLAP using Spring Boot and MongoDB, increasing insertion speed by 70%',
      'Engineered Python automation integrating with Microsoft Outlook to extract and process PDFs, reducing manual effort by 90%',
      'Invented patent-pending AI network analyzer to automate incident response and enable proactive defense'
    ],
    skills: ['Java', 'Spring Boot', 'MongoDB', 'Python', 'AI/ML'],
    xp: 500,
    type: 'work'
  },
  {
    id: 'lumen-2024',
    title: 'Software Developer Intern',
    company: 'Lumen Technologies',
    location: 'Remote',
    dates: 'May 2024 – Aug 2024',
    bullets: [
      'Built robust REST APIs using Django and Python for dashboards and automation projects',
      'Optimized backend scripts to audit systems, logging 10,000+ errors into MongoDB database',
      'Designed MongoDB databases to enhance API interactions and streamline data storage'
    ],
    skills: ['Python', 'Django', 'REST APIs', 'MongoDB'],
    xp: 400,
    type: 'work'
  },
  {
    id: 'uw-2024',
    title: 'Cybersecurity Analyst Intern',
    company: 'UW–Madison Office of Cybersecurity',
    location: 'Remote',
    dates: 'Feb 2024 – May 2024',
    bullets: [
      'Deployed and configured Palo Alto firewalls and Panorama management systems',
      'Utilized Elastic to conduct vulnerability assessments, identifying critical exposures',
      'Directed 150+ incident response operations, leveraging Cherwell for incident management'
    ],
    skills: ['Palo Alto', 'Elastic', 'Cherwell', 'Cybersecurity'],
    xp: 350,
    type: 'work'
  },
  {
    id: 'exact-2023',
    title: 'Cybersecurity Engineering Intern',
    company: 'Exact Sciences Corporation',
    location: 'Madison, WI',
    dates: 'May 2023 – Dec 2023',
    bullets: [
      'Developed CrowdStrike API-driven Python script automating 500+ device decommissions',
      'Designed VBA-based macro integrating Okta and Active Directory, contributing to $140K cost reduction',
      'Collaborated with Cloud Engineering and ServiceNow Development teams for security automation'
    ],
    skills: ['Python', 'CrowdStrike', 'Okta', 'Active Directory', 'VBA'],
    xp: 400,
    type: 'work'
  },
  {
    id: 'attentioflow-2024',
    title: 'AttentioFlow AI',
    company: 'Personal Project',
    location: 'Madison, WI',
    dates: 'Oct 2024 – Present',
    bullets: [
      'Architected adaptive AI system performing real-time inference with PyTorch Neural Network',
      'Engineered temporal features from digital interaction data training custom deep learning models',
      'Deployed proactive AI nudges for attentional regulation through adaptive human-computer interaction'
    ],
    skills: ['Python', 'PyTorch', 'AI/ML', 'Tkinter'],
    xp: 300,
    type: 'project'
  },
  {
    id: 'ufo-2023',
    title: 'UFO Sightings Analysis',
    company: 'Academic Project',
    location: 'Madison, WI',
    dates: 'Sept 2022 – May 2023',
    bullets: [
      'Executed NLP analysis on 80,000+ UFO descriptions with Python, NLTK, and K-Means clustering',
      'Developed ML models for sentiment analysis using Naive Bayes, Logistic Regression, and SVM',
      'Modeled predictive analytics using linear regression to forecast UFO encounters'
    ],
    skills: ['Python', 'NLTK', 'ML', 'NLP', 'SQL'],
    xp: 250,
    type: 'project'
  },
  {
    id: 'milestone-graduation',
    title: 'UW–Madison Graduation',
    company: 'University of Wisconsin–Madison',
    location: 'Madison, WI',
    dates: 'May 2026',
    bullets: [
      'Bachelor of Business Administration in Computer Science and Business',
      'Specialized in Big Data Systems, AI, and Mobile Application Development',
      'Ready to build the future!'
    ],
    skills: ['Achievement Unlocked'],
    xp: 1000,
    type: 'milestone'
  }
];

export const getTotalXP = (): number => {
  return timelineData.reduce((total, node) => total + node.xp, 0);
};

export const getLevel = (xp: number): number => {
  return Math.floor(xp / 500) + 1;
};
