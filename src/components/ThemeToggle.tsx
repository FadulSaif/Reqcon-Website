import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800/80 border border-border-custom cursor-pointer p-1 transition-all duration-300 focus:outline-none shrink-0"
      aria-label={isDark ? 'Växla till ljust läge' : 'Växla till mörkt läge'}
    >
      {/* Background indicators */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-text-secondary opacity-60 pointer-events-none">
        <Sun className="w-3.5 h-3.5 text-amber-500" />
        <Moon className="w-3.5 h-3.5 text-sky-400" />
      </div>

      {/* Sliding Switch Thumb */}
      <motion.div
        className="w-5.5 h-5.5 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center z-10 border border-slate-200/50 dark:border-slate-800/50"
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-sky-400" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
