export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 1-5
  icon?: string;
}

export const skillsData: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', level: 5 },
      { name: 'Java', level: 5 },
      { name: 'JavaScript', level: 4 },
      { name: 'TypeScript', level: 4 },
      { name: 'SQL', level: 4 },
      { name: 'HTML/CSS', level: 5 },
      { name: 'VBA', level: 3 }
    ]
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'React', level: 4 },
      { name: 'Django', level: 4 },
      { name: 'Spring Boot', level: 4 },
      { name: 'PyTorch', level: 4 },
      { name: 'Pandas', level: 5 },
      { name: 'NumPy', level: 5 },
      { name: 'Matplotlib', level: 4 }
    ]
  },
  {
    category: 'Developer Tools',
    skills: [
      { name: 'Git', level: 5 },
      { name: 'GitHub', level: 5 },
      { name: 'Docker', level: 4 },
      { name: 'Postman', level: 4 },
      { name: 'VS Code', level: 5 },
      { name: 'PyCharm', level: 4 },
      { name: 'IntelliJ', level: 4 }
    ]
  },
  {
    category: 'Databases & APIs',
    skills: [
      { name: 'MongoDB', level: 5 },
      { name: 'REST APIs', level: 5 },
      { name: 'SQL Databases', level: 4 },
      { name: 'API Design', level: 4 }
    ]
  },
  {
    category: 'Technologies & Platforms',
    skills: [
      { name: 'Active Directory', level: 4 },
      { name: 'Okta', level: 4 },
      { name: 'ServiceNow', level: 3 },
      { name: 'CrowdStrike', level: 4 },
      { name: 'Itential', level: 3 },
      { name: 'Palo Alto', level: 3 },
      { name: 'Elastic', level: 3 }
    ]
  },
  {
    category: 'Specializations',
    skills: [
      { name: 'Machine Learning', level: 4 },
      { name: 'NLP', level: 4 },
      { name: 'Cybersecurity', level: 4 },
      { name: 'Cloud Engineering', level: 3 },
      { name: 'Data Analysis', level: 5 }
    ]
  }
];

export const getAllSkills = (): string[] => {
  const allSkills: string[] = [];
  skillsData.forEach(category => {
    category.skills.forEach(skill => {
      allSkills.push(skill.name);
    });
  });
  return allSkills;
};
