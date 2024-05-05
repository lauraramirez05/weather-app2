import { useEffect } from 'react';
import { useWeatherContext } from './WeatherContext';

const useMobileDetector = () => {
  const { setIsMobile } = useWeatherContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    // Initial check
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Add window to the dependency array
};

export default useMobileDetector;
