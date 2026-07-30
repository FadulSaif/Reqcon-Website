import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const isDark = theme === 'dark';
  const isEnglish = i18n.language.startsWith('en');
  const accessibleLabel = isEnglish
    ? isDark ? 'Switch to light mode' : 'Switch to dark mode'
    : isDark ? 'Växla till ljust läge' : 'Växla till mörkt läge';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-gradient-to-r from-accent-secondary/[0.08] to-accent-primary/[0.18] dark:from-accent-secondary/[0.18] dark:to-accent-primary/[0.28] border border-slate-300/80 dark:border-zinc-700/80 cursor-pointer p-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 focus-visible:ring-offset-2 shrink-0 shadow-sm"
      aria-label={accessibleLabel}
    >
      {/* Background indicators */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-text-secondary opacity-90 pointer-events-none">
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
