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
import { useState } from "react";

const randomWords = require('random-words');

const CrosswordBuilder = (props) => {

    // Stored in CrosswordBuilder state
    const [currentWord, setCurrentWord] = useState('first');
    const [newWords, setNewWords] = useState(alphabeticalWords);

    const submitWord = (userWord) => {
        console.log('in crosswordbuilder prev/ current word is: ', props.prevWord.word);
        console.log('in crosswordbuilder userGuess word is: ', userWord);
        if (CheckCorrectness(props.prevWord.word, userWord)) {
            // user guess is correct
            props.dispatch(showLetters(userWord));
            // WordAdder actually just supplies a new set up word object
            const newWordObject = WordAdder(props.prevWord, newWords);
            // console.log('in crosswordbuilder newWordObject is:', newWordObject);
            props.dispatch(addWord(newWordObject));
            setCurrentWord(newWordObject.word);
            collectNewWords();
        } else {
            // user guess is over, therefore end the game.
            console.log('game ogre');
        }
    }

    const collectNewWords = () => {
        // Trying npm random words here:
        setNewWords(randomWords(50).concat(alphabeticalWords));

        // This technique pulls from the random-word-api.herokuapp.com,
        // it works but gives very obscure words and many do not have
        // definitions on my current definition api 
        /*
        fetch('https://random-word-api.herokuapp.com/word?number=50')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.filter(word => word.length > 3) 
        })
        .then(data => setNewWords(data.concat(alphabeticalWords)));
        */
    }

    return (
        <div>
            <GuessInput submitWord={submitWord}/>
            <Definition word={currentWord} />
        </div>
    )
}

// Temporary list of words for testing:
const alphabeticalWords = [
    'apple',
    'beetle',
    'carrot',
    'dragon',
    'eccentric',
    'fountain',
    'giant',
    'hilarious',
    'igloo',
    'jump',
    'kangaroo',
    'licked',
    'mustard',
    'north',
    'orientation',
    'powerful',
    'questions',
    'restaurant',
    'squeeze',
    'trunk',
    'uranium',
    'vibration',
    'wonderful',
    'xylophone',
    'yesterday',
    'zebra'
   ];


const mapStateToProps = (state, props) => {
    console.log('state in mapStateToProps in AllWords is:', state);
    const prevWord = state.words.length > 0? state.words[state.words.length - 1] : null;
    console.log('in mapStateToProps trying to get prevWord', prevWord)
    return { prevWord , doAddWord:state.flags[0].addWord }; 
  }


export default connect(mapStateToProps)(CrosswordBuilder);