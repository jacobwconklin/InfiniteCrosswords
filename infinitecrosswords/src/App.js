import './App.css';
import GuessInput from './components/guessInput';
// import SingleWord from './components/SingleWord';
import AllWords from './components/AllWords';
import AllBackgroundObjects from './components/AllBackgroundObjects';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to infinite crossroaaaads!
        </p>
      </header>
      <GuessInput />
      <button> RESET </button>
      {/* <SingleWord word='Dictionary' orientation='VerticalWord'/> */}
      <AllBackgroundObjects />
      <AllWords />
    </div>
  );
}

export default App;
