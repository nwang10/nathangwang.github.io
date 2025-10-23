export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  dates: string;
  github?: string;
  demo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'attentioflow',
    title: 'AttentioFlow AI',
    description: 'An adaptive AI system for cognitive optimization that performs real-time inference using PyTorch to predict distraction onset and deploy proactive nudges.',
    technologies: ['Python', 'PyTorch', 'psutil', 'pynput', 'plyer', 'Tkinter'],
    highlights: [
      'Real-time inference with PyTorch Neural Network',
      'Engineered temporal features from digital interaction data',
      'Proactive AI nudges for attentional regulation',
      'Custom deep learning models for cognitive state inference',
      'Tkinter-based user interface'
    ],
    dates: 'Oct 2024 – Present',
    github: 'https://github.com/nwang10/attentioflow-ai'
  },
  {
    id: 'fetch-prototype',
    title: 'Fetch Product Prototype',
    description: 'Rapid product workflow prototype built and demoed to Fetch CEO and Chief of Staff, showcasing rapid iteration and executive communication skills.',
    technologies: ['React', 'TypeScript', 'Mobile Development'],
    highlights: [
      'Demoed directly to CEO and Chief of Staff',
      'Rapid prototyping and iteration',
      'User-facing mobile application',
      'Executive stakeholder communication',
      'Product-focused development workflow'
    ],
    dates: '2024',
    demo: 'Available upon request'
  },
  {
    id: 'ufo-analysis',
    title: 'UFO Sightings Analysis',
    description: 'Comprehensive NLP analysis of 80,000+ UFO sighting descriptions using advanced machine learning techniques for clustering, sentiment analysis, and predictive analytics.',
    technologies: ['Python', 'NLTK', 'SQL', 'scikit-learn', 'Pandas', 'Matplotlib'],
    highlights: [
      'NLP analysis on 80,000+ UFO descriptions',
      'K-Means clustering for pattern detection',
      'Sentiment analysis with Naive Bayes, Logistic Regression, SVM',
      'Predictive analytics using linear regression',
      'Geospatial coordinate analysis'
    ],
    dates: 'Sept 2022 – May 2023',
    github: 'https://github.com/nwang10/ufo-sightings-analysis'
  }
];
