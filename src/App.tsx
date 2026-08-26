import { useEffect, useState } from 'react';
import './App.scss';
import CoinFlip from './app/components/CoinFlip';
import Home from './app/components/home/Home';
import AgeCalculator from './app/components/home/components/AgeCalculator/AgeCalculator';
import DateCalculator from './app/components/home/components/DateCalculator/DateCalculator';
import Header from './app/core/components/navigation/Header';
import { SplashScreen } from './components/ui/splash-screen';
import { AnimatedBubblesBackground } from './components/ui/animated-bubbles-background';
import { BUBBLE_BACKGROUNDS, type BubbleBackgroundOption } from './components/ui/bubble-backgrounds';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';

const SPLASH_DURATION = 1400;
const BACKGROUND_STORAGE_KEY = 'pocket-tools:background';

const getInitialBackground = (): BubbleBackgroundOption => {
  const storedId = localStorage.getItem(BACKGROUND_STORAGE_KEY);
  return BUBBLE_BACKGROUNDS.find((option) => option.id === storedId) ?? BUBBLE_BACKGROUNDS[0];
};

const Root = () => {
  const location = useLocation();
  const [background, setBackground] = useState<BubbleBackgroundOption>(getInitialBackground);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleBackgroundChange = (option: BubbleBackgroundOption) => {
    setBackground(option);
    localStorage.setItem(BACKGROUND_STORAGE_KEY, option.id);
  };

  return (
    <div className="flex h-full flex-col text-secondary">
      <AnimatedBubblesBackground option={background} />
      <Header background={background} onBackgroundChange={handleBackgroundChange} />
      <div className="flex-1 overflow-hidden pt-20">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} context={background} />
        </AnimatePresence>
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/age-calculator" element={<AgeCalculator />} />
      <Route path="/date-calculator" element={<DateCalculator />} />
      <Route path="/flip-a-coin" element={<CoinFlip />} />
    </Route>
  )
);

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
