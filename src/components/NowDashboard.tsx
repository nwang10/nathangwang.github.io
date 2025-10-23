import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchLatestCommit, fetchGitHubStats } from '../lib/github';
import { fetchCurrentlyPlaying, type SpotifyTrack } from '../lib/spotify';
import mockData from '../data/now.mock.json';

interface NowDashboardProps {
  mode?: 'modal' | 'page';
  onClose?: () => void;
}

export const NowDashboard: React.FC<NowDashboardProps> = ({ mode = 'page', onClose }) => {
  const [githubData, setGithubData] = useState(mockData.github.lastCommit);
  const [githubStats, setGithubStats] = useState(mockData.github.stats);
  const [spotifyData, setSpotifyData] = useState<SpotifyTrack>(mockData.spotify.currentlyPlaying);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [commit, stats, spotify] = await Promise.all([
          fetchLatestCommit(),
          fetchGitHubStats(),
          fetchCurrentlyPlaying()
        ]);

        setGithubData(commit);
        setGithubStats(stats);
        setSpotifyData(spotify);
      } catch (error) {
        console.warn('Using mock data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* GitHub Card */}
      <motion.div
        className="glass-effect p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </h3>
          <motion.span
            className="text-xs px-2 py-1 rounded-full"
            style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Live
          </motion.span>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <p className="font-semibold mb-2">Latest Commit</p>
            <p className="text-sm mb-1" style={{ color: 'var(--color-secondary)' }}>
              {githubData.message}
            </p>
            <a
              href={githubData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
              style={{ color: 'var(--color-accent)' }}
            >
              {githubData.repo}
            </a>
            <p className="text-xs mt-2" style={{ color: 'var(--color-secondary)' }}>
              {formatTimeAgo(githubData.timestamp)}
            </p>

            <div className="mt-4 pt-4 border-t flex justify-between text-sm" style={{ borderColor: 'var(--color-secondary)' }}>
              <span>{githubStats.publicRepos} repos</span>
              <span>{githubStats.followers} followers</span>
              <span>{githubStats.following} following</span>
            </div>
          </>
        )}
      </motion.div>

      {/* Spotify Card */}
      <motion.div
        className="glass-effect p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            Spotify
          </h3>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <p className="font-semibold mb-2">
              {spotifyData.isPlaying ? 'Currently Playing' : 'Last Played'}
            </p>
            <p className="text-lg font-bold mb-1">{spotifyData.track}</p>
            <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
              {spotifyData.artist}
            </p>
            {spotifyData.isPlaying && (
              <motion.div
                className="flex space-x-1 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-green-500 rounded-full"
                    style={{ height: '20px' }}
                    animate={{ scaleY: [0.5, 1, 0.5] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {/* Status Card */}
      <motion.div
        className="glass-effect p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Status
        </h3>
        <div className="flex items-center space-x-2 mb-4">
          <motion.div
            className="w-3 h-3 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>
            Available for opportunities
          </span>
        </div>
        <p className="text-lg">{mockData.status.message}</p>
        <p className="text-xs mt-2" style={{ color: 'var(--color-secondary)' }}>
          Last updated: {formatTimeAgo(mockData.status.lastUpdated)}
        </p>
      </motion.div>

      {/* Reading Card */}
      <motion.div
        className="glass-effect p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Currently Reading
        </h3>
        <div className="space-y-4">
          {mockData.reading.map((book, i) => (
            <div key={i} className="border-l-4 pl-4" style={{ borderColor: 'var(--color-accent)' }}>
              <p className="font-semibold">{book.title}</p>
              <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
                by {book.author}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${book.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                  />
                </div>
                <span className="text-xs font-semibold">{book.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  if (mode === 'modal') {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 rounded-2xl"
          style={{ backgroundColor: 'var(--color-bg)' }}
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold gradient-text">What I'm Up To Now</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Close dashboard"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {content}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            What I'm Up To Now
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-secondary)' }}>
            Real-time updates from my digital life
          </p>
        </motion.div>
        {content}
      </div>
    </section>
  );
};
