import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollPositions = new Map<string, number>();

export const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    const savedPosition = navigationType === 'POP'
      ? scrollPositions.get(location.key)
      : 0;

    if (savedPosition === undefined) return;

    const restorePosition = () => {
      window.scrollTo({
        top: savedPosition,
        left: 0,
        behavior: 'instant'
      });
    };

    const frame = window.requestAnimationFrame(restorePosition);
    const timeout = window.setTimeout(restorePosition, 100);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [location.key, navigationType]);

  useEffect(() => {
    const savePosition = () => {
      scrollPositions.set(location.key, window.scrollY);
    };

    window.addEventListener('scroll', savePosition, { passive: true });

    return () => {
      savePosition();
      window.removeEventListener('scroll', savePosition);
    };
  }, [location.key]);

  return null;
};

export default ScrollToTop;
