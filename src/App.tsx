import './App.scss';
import CoinFlip from './app/components/CoinFlip';
import Home from './app/components/home/Home';
import AgeCalculator from './app/components/home/components/AgeCalculator/AgeCalculator';
import DateCalculator from './app/components/home/components/DateCalculator/DateCalculator';
import Header from './app/core/components/navigation/Header';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route key={location.pathname} path='/' element={<Root />}>
        <Route key={location.pathname} index element={<Home />} />
        <Route key={location.pathname} path='/age-calculator' element={<AgeCalculator />} />
        <Route key={location.pathname} path='/date-calculator' element={<DateCalculator />} />
        <Route key={location.pathname} path='/flip-a-coin' element={<CoinFlip />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider key={location.pathname} router={router} />
    </>
  );
}

const Root = () => {
  return (
    <>
      <AnimatePresence mode='wait' key={location.pathname}>
        <div className="bg-primary text-secondary  transition-all duration-300  flex flex-col h-full">
          <Header />
          <div className="overflow-auto h-full">
            <Outlet key={location.pathname} />
          </div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default App;