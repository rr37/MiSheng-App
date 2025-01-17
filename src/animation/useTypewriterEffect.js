import { useState, useEffect } from 'react';

/**
 * Custom hook for typewriter effect.
 * @param {string} text - The text to display with typewriter effect.
 * @param {number} speed - Typing speed in milliseconds per character.
 * @returns {string} displayText - The text currently displayed with typewriter effect.
 */

export const useTypewriterEffect = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  // Reset the typewriter effect when the text changes
  useEffect(() => {
    if (text) {
      setDisplayText('');
      setCharIndex(0);
    }
  }, [text]);

  // Typewriter effect logic
  useEffect(() => {
    if (text && charIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, text, speed]);

  return displayText;
};
