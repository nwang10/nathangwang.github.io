import { NowDashboard } from '../components/NowDashboard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Now: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24">
      <motion.div
        className="container mx-auto px-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 hover:text-accent transition-colors"
          style={{ color: 'var(--color-secondary)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </button>
      </motion.div>

      <NowDashboard mode="page" />
    </div>
  );
};
