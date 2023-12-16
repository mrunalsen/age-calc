import './App.scss';
import Home from './app/components/home/Home';
import Header from './app/core/components/navigation/Header';

function App() {
  return (
    <>
      <div className="flex flex-col h-full">
        <Header />
        <div className="overflow-auto h-full">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
