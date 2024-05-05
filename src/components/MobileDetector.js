import { useWeatherContext } from "../utils/WeatherContext";

const MobileDetector = ({ children }) => {
  const {isMobile, setIsMobile} = useWeatherContext()

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
  }, []);

  return <>{children(isMobile)}</>;
};

export default MobileDetector;
