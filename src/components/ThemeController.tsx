import { useEffect } from 'react';
import { applyTimeTheme } from '../lib/timeTheme';
import { cursorTracker } from '../lib/cursor';

export const ThemeController: React.FC = () => {
  useEffect(() => {
    // Apply time-based theme on mount
    applyTimeTheme();

    // Update theme every minute to catch time changes
    const themeInterval = setInterval(() => {
      applyTimeTheme();
    }, 60000); // Check every minute

    // Start cursor speed tracking
    cursorTracker.start();

    // Cleanup
    return () => {
      clearInterval(themeInterval);
      cursorTracker.stop();
    };
  }, []);

  // This component doesn't render anything
  return null;
};
