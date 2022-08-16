import './App.css';
// import SingleWord from './components/SingleWord';
import AllWords from './components/AllWords';
import AllBackgroundObjects from './components/AllBackgroundObjects';
import CrosswordBuilder from './components/CrosswordBuilder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to infinite crossroaaaads!
        </p>
      </header>
      <CrosswordBuilder />
      <button> RESET </button>
      {/* <SingleWord word='Dictionary' orientation='Vertical'/> */}
      <AllBackgroundObjects />
      <AllWords />
    </div>
  );
}

export default App;
