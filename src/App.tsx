import './App.scss';
import CoinFlip from './app/components/CoinFlip';
import Home from './app/components/home/Home';
import AgeCalculator from './app/components/home/components/AgeCalculator/AgeCalculator';
import DateCalculator from './app/components/home/components/DateCalculator/DateCalculator';
import Header from './app/core/components/navigation/Header';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/age-calculator' element={<AgeCalculator />} />
        <Route path='/date-calculator' element={<DateCalculator />} />
        <Route path='/flip-a-coin' element={<CoinFlip />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const Root = () => {
  return (
    <>
      <div className="bg-primary text-secondary  transition-all duration-300  flex flex-col h-full">
        <Header />
        <div className="overflow-auto h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;