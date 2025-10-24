import kbData from '../data/kb.json';
import { getRandomSurprise } from '../data/surprises';

export interface IntentResponse {
  response: string;
  followUp?: string[];
}

export const matchIntent = (userInput: string): IntentResponse => {
  const input = userInput.toLowerCase().trim();

  // Check for greetings
  const greetingKeywords = ['hi', 'hello', 'hey', 'greetings', 'sup', 'yo'];
  if (greetingKeywords.some(keyword => input.includes(keyword) && input.length < 20)) {
    return {
      response: kbData.greetings[Math.floor(Math.random() * kbData.greetings.length)],
      followUp: ['Your projects', 'Your experience', 'Your skills', 'Contact info']
    };
  }

  // Match against intent keywords
  const intentMap: Record<string, string[]> = {
    projects: ['project', 'projects', 'built', 'made', 'created', 'work on'],
    internships: ['internship', 'intern', 'job', 'work', 'experience', 'company', 'companies'],
    experience: ['experience', 'work history', 'jobs', 'career'],
    ai: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'neural', 'pytorch'],
    contact: ['contact', 'email', 'reach', 'linkedin', 'github', 'phone', 'connect'],
    skills: ['skill', 'skills', 'tech', 'technology', 'technologies', 'tools', 'language', 'languages'],
    surprise: ['surprise', 'fun', 'cool', 'easter egg', 'hidden', 'secret'],
    about: ['about', 'who are you', 'tell me about', 'yourself', 'background'],
    education: ['education', 'school', 'university', 'college', 'degree', 'uw', 'wisconsin', 'madison'],
    attentioflow: ['attentioflow', 'attention flow', 'cognitive'],
    fetch: ['fetch', 'prototype'],
    ufo: ['ufo', 'alien', 'sightings']
  };

  // Find the best matching intent
  for (const [intent, keywords] of Object.entries(intentMap)) {
    if (keywords.some(keyword => input.includes(keyword))) {
      const intentData = kbData.intents[intent as keyof typeof kbData.intents];

      if (typeof intentData === 'object' && 'response' in intentData) {
        let response = intentData.response;

        // Handle surprise template
        if (response === '{{surprise}}') {
          response = getRandomSurprise();
        }

        return {
          response,
          followUp: intentData.followUp
        };
      } else if (typeof intentData === 'string') {
        return {
          response: intentData,
          followUp: ['Your projects', 'Your experience', 'Your skills', 'Contact info']
        };
      }
    }
  }

  // Default response if no intent matched
  const defaultResponse = kbData.intents.default;
  return {
    response: defaultResponse.response,
    followUp: defaultResponse.followUp
  };
};

export const getQuickReplies = (): string[] => {
  return ['Projects', 'Internships', 'AI Work', 'Contact', 'Surprise me'];
};
