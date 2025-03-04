import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for handling scroll behavior.
 *
 * - If `dependency` is `null`, the effect does NOT trigger.
 * - If `dependency` is not passed (`undefined`), the effect runs on mount.
 * - If `dependency` is an array, the effect runs when its values change.
 */
const useScroll = (dependency = undefined, tolerance = 2) => {
  const containerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const atBottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= tolerance;
      setIsAtBottom(atBottom);
    }
  };

  const scrollToBottom = (smooth = true) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  const scrollToTop = (smooth = true) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  useEffect(() => {
    if (dependency !== null && isAtBottom) {
      scrollToBottom();
    }
  }, dependency !== null ? [isAtBottom, ...(dependency !== undefined ? (Array.isArray(dependency) ? dependency : [dependency]) : [])] : []);

  return { containerRef, isAtBottom, handleScroll, scrollToBottom, scrollToTop };
};

export default useScroll;
