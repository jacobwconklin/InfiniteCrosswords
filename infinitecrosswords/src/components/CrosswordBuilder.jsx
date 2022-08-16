// A component meant to combine components used to build and populate the crossword
// so the GuessInput component, as well as adding functionality for adding words,
// checking if a word is correct, etc. 
import GuessInput from "./guessInput";
import CheckCorrectness from "./CheckCorrectness";
import { showLetters } from "../actions/ShowLetters";
import WordAdder from "./WordAdder";
import { connect } from "react-redux";
import { addWord } from "../actions/AddWord";
import Definition from "./Definition";


const CrosswordBuilder = (props) => {

    // This could better be stored in state with hooks
    let currentWord = 'first';

    const submitWord = (userWord) => {
        console.log('in crosswordbuilder prev/ current word is: ', props.prevWord.word);
        console.log('in crosswordbuilder userGuess word is: ', userWord);
        if (CheckCorrectness(props.prevWord.word, userWord)) {
            // user guess is correct
            props.dispatch(showLetters(userWord));
            // WordAdder actually just supplies a new set up word object
            const newWordObject = WordAdder(props.prevWord);
            // console.log('in crosswordbuilder newWordObject is:', newWordObject);
            props.dispatch(addWord(newWordObject));
            currentWord = newWordObject.word;
        } else {
            // user guess is over, therefore end the game.
            console.log('game ogre');
        }
    }

    return (
        <div>
            <GuessInput submitWord={submitWord}/>
            <Definition word={currentWord} />
        </div>
    )
}



const mapStateToProps = (state, props) => {
    console.log('state in mapStateToProps in AllWords is:', state);
    const prevWord = state.words.length > 0? state.words[state.words.length - 1] : null;
    console.log('in mapStateToProps trying to get prevWord', prevWord)
    return { prevWord , doAddWord:state.flags[0].addWord }; 
  }


export default connect(mapStateToProps)(CrosswordBuilder);