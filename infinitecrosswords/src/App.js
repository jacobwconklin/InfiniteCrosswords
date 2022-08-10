import './App.css';
import GuessInput from './components/guessInput';
import SingleWord from './components/SingleWord';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to infinite crossroaaaads!
        </p>
      </header>
      <GuessInput />
      <SingleWord word='Dictionary'/>
    </div>
  );
}

export default App;
