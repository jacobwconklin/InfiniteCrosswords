// Now WordAdder has been simplified, it works as a pure js function taking in
// an object for the previous word and finding and and building a new word object
// to return
const WordAdder = (prevWord, newWords) => {

  if (prevWord == null) {
    const word = 'noPrevWord';
    const x = 200;
    const y = 300;
    const orientation = 'Vertical';
    return {word, x, y, orientation, showLetters:true};
  }

  let connectedLetter = -1;
  // This would call other function to pull random word, for now it wil cycle through
  // my hardcoded words
  let wordCount = -1;
  while (connectedLetter < 0) {
      wordCount = ++wordCount;
      connectedLetter = findLetterMatch(prevWord.word, newWords[wordCount]);
  }
  const word = newWords[wordCount];
  // now the newWord is known and the letter of the prevWord it connects to is known
  // need to create the fields necessary to save the new word. A lot depends on if
  // the prev word is horizontal or vertical so let's go ahead and save that.
  const prevIsVertical = prevWord.orientation === 'Vertical';
  // orientation = opposite orientaiton of prevWord
  const orientation = prevIsVertical ? 'Horizontal' : 'Vertical';
  const x = prevIsVertical ? prevWord.x : connectedLetter * 35 + prevWord.x; 
  const y = prevIsVertical ? connectedLetter * 35 + prevWord.y + 21 : prevWord.y -21 // maybe -21?
  return {word, x, y, orientation, showLetters:false};
}

// Function to determine if a new word passed in can be grafted onto the prev
// word obtained from the redux store. If the word can be atatched, it returns
// the 'nth' letter that the start of the new word matched on the old word
// where 2 <= n < prevWord.length. This is so the new word doesn't get placed
// right up against a previous word If there is no match, -1 is returned.
// All words should be checked to adhere to a length > 3
const findLetterMatch = (prevWord, newWord) => {
  // Save first lettr of newWord (for now only going by first letter not in true
  // crossword style yet)
  console.log('in findlettermatch in wordadder, new word is:', newWord);
  const newFirstLetter = newWord[0];
  // Cycle through the old word from the 3rd letter onword
  for (let letter = 2; letter < prevWord.length; letter++) {
      if (newFirstLetter === prevWord[letter]) return letter;
  }

  return -1;

}

export default WordAdder;


// old notes:


/*


// Adds new words, needs to set their absolute position on the screen so they match up... 
// might not render anything as jsx, however Redux store will still need to be accessed
import { addWord } from "../actions/AddWords";
import { connect } from "react-redux/es/exports";

const WordAdder = (props) => {

  // Check flag in redux store to know if a word needs to be added:
  if (props.doAddWord) {
    console.log('in WordAdder attempting to add new word, props is:', props);
    setTimeout(() => findNewWord(), 6000);
    
  }

    
        // Function to determine if a new word passed in can be grafted onto the prev
        // word obtained from the redux store. If the word can be atatched, it returns
        // the 'nth' letter that the start of the new word matched on the old word
        // where 2 <= n < prevWord.length. This is so the new word doesn't get placed
        // right up against a previous word If there is no match, -1 is returned.
        // All words should be checked to adhere to a length > 3
    
   const findLetterMatch = (prevWord, newWord) => {
    // Save first lettr of newWord (for now only going by first letter not in true
    // crossword style yet)
    const newFirstLetter = newWord[0];
    // Cycle through the old word from the 3rd letter onword
    for (let letter = 2; letter < prevWord.length; letter++) {
        if (newFirstLetter = prevWord[letter]) return letter;
    }

   }

   // Temporary list of words for testing:
   const newWords = [
    'apple',
    'beetle',
    'carrot',
    'dragon',
    'elephant',
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

  
  //  Gets new words that are atempted to be added to the crossword until a working match 
  //  is found. 
  
  const findNewWord = () => {
    // get prevWord from state
    const prevWord = props.prevWord.word;

    if (prevWord == null) {
      const word = 'noPrevWord';
      const x = 200;
      const y = 300;
      const orientation = 'Vertical';
      props.dispatch(addWord(word, x, y, orientation));
      return;
    }


    let connectedLetter = -1;

    // This would call other function to pull random word, for now it wil cycle through
    // my hardcoded words
    let wordCount = -1;

    while (connectedLetter < 0) {
        wordCount = newWords.length % ++wordCount;
        connectedLetter = findLetterMatch(prevWord, newWords[wordCount]);
    }
    // now the newWord is known and the letter of the prevWord it connects to is known
    // need to create the fields necessary to save the new word. A lot depends on if
    // the prev word is horizontal or vertical so let's go ahead and save that.
    const prevIsVertical = props.prevWord.orientation === 'Vertical';
    // orientation = opposite orientaiton of prevWord
    const orientaiton = prevIsVertical ? 'Horizontal' : 'Vertical';
    const x = prevIsVertical ? props.prevWord.x : 5; // NEED TO REPLACE 5 WITH MATH HERE BASED ON CONNECTED LETTER
    
  }

    // get words from api

    // determine which word can slot into previous word and where
    // so save new word and position (position of prev word + distance)
    // for each letter over / down

    // update single source of truth: stuff like is next word vertical, score, distance etc.
    // aka send off new word to redux

    // put in order to add new word to centralized source of all words(redux or context)
    // for each letter over until we have our like "match", add however many pixels to the x
    // if it's horizontal, or to the y if it's vertical to the prev word's position for the next
    // word to match up.
    // maybe I just have to move every word down and to the left a certain amount so that the new word
    // caches in nicely, for horizontal words need to subtract 21 from their height immedieately. Could
    // could have background strips 35px tall 
    //          (MORE LIKE 1000PX that get added in and just sit behind everything above them - these
    //           can have zindex: -1 so they are behind header and have negative starting values for top) 
    // that get added in for each new letter length reached idk. OR 
    // maybe just some floating smaller things in the background that appear at certain lengths.They could
    // be added into a list from here with absolute positions that get adjusted in the same way so we add a new
    // word and if any new objects were reached they get added. 
    // redux would work well where I send action with new lenght needed to be pushed either down or left, 

    // so much easier if I just go to the right and down.. maybe I will just have the user 
    // submission at the bottom right and 
    // I should be able to scroll their screen down and to the right.. 

    const word = 'newWord';
    const x = 125;
    const y = 225;
    const orientation = 'Vertical';

    props.dispatch(addWord(word, x, y, orientation));

}

const mapStateToProps = (state, props) => {
    console.log('state in mapStateToProps in AllWords is:', state);
    const prevWord = state.words.length > 0? state.words[state.words.length - 1] : prevWord = null;
    console.log('in mapStateToProps trying to get prevWord', prevWord)
    return { prevWord , doAddWord:state.flags[0].addWord }; 
  }


export default connect(mapStateToProps)(WordAdder);

*/