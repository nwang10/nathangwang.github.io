export type TimeTheme = 'morning' | 'day' | 'night';

export const getTimeTheme = (): TimeTheme => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 18) {
    return 'day';
  } else {
    return 'night';
  }
};

export const applyTimeTheme = (): void => {
  const theme = getTimeTheme();
  const html = document.documentElement;

  // Remove existing theme classes
  html.classList.remove('morning', 'day', 'night');

  // Add current theme class
  html.classList.add(theme);
};

export const getThemeDescription = (theme: TimeTheme): string => {
  const descriptions = {
    morning: 'Good morning! ☀️ Starting fresh with warm golden tones.',
    day: 'Good afternoon! 🌤️ Bright and energetic vibes.',
    night: 'Good evening! 🌙 Relaxing with darker tones.'
  };

  return descriptions[theme];
};
