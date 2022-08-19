const randomWords = require('random-words');
// Now WordAdder has been simplified, it works as a pure js function taking in
// an object for the previous word and finding and and building a new word object
// to return
const WordAdder = (prevWords, newWords) => {

  // console.log('prev words in word adder is:', prevWords);

  if (!prevWords) {
    const word = 'noPrevWord';
    const x = 200;
    const y = 300;
    const orientation = 'Vertical';
    return {word, x, y, orientation, showLetters:true};
  }
  // set up scope of variables used after loop
  let wordCount = -1;
  let connection = null;
  let connectingWord = prevWords[0];
  let randomWord = 'no';
    // This will cycle through the generated words, and is guarenteed to have a match
    // because a word starting with every letter of the alphabet is in the list
    while (!connection) {
      // Cycle through all words in the puzzle not just the last word:
      wordCount = ++wordCount;
      randomWord = getValidRandomWord(prevWords); 
      for (let i = 0; i < prevWords.length && !connection; i++) {
        connectingWord = prevWords[i]
        // console.log('new words in wordAdder are:', newWords);
        console.log('trying to connect to word:', connectingWord.word);
        console.log('in word adder wordCount is:', wordCount);
        console.log('word getting passed into findSlot is:', randomWord);
        connection = findSlot(connectingWord, randomWord, prevWords);
      }
    } 
  const word = randomWord;
  const { newStartX, newStartY } = connection;
  // now the newWord is known and the letter of the prevWord it connects to is known
  // need to create the fields necessary to save the new word. A lot depends on if
  // the prev word is horizontal or vertical so let's go ahead and save that.
  const prevIsVertical = connectingWord.orientation === 'Vertical';
  // orientation = opposite orientaiton of prevWord
  const orientation = prevIsVertical ? 'Horizontal' : 'Vertical';
  // const x = prevIsVertical ? connectingWord.x - newLetter : oldLetter + connectingWord.x; 
  // const y = prevIsVertical ? oldLetter + connectingWord.y : connectingWord.y - newLetter
  return {word, x: newStartX, y: newStartY, orientation, showLetters:false};
}

// Function to determine if a new word passed in can be grafted onto the prev
// word obtained from the redux store. If the word can be atatched, it returns
// the 'nth' letter that the start of the new word matched on the old word
// where 2 <= n < prevWord.length. This is so the new word doesn't get placed
// right up against a previous word If there is no match, -1 is returned.
// All words should be checked to adhere to a length > 3
// Outdated, only attatched new word to outside of last word
/*
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
*/

// Gives a valid random word IE: longer than 3 letters and not already in the existing words
const getValidRandomWord = (allWords) => {
  let isDuplicate = false;
  let randomWord = 'no';
  // Basically a manual do while loop
  while (randomWord.length <= 3 || isDuplicate ) {
    isDuplicate = false;
    randomWord = randomWords();
    // loop through all words to weed out duplicates
    for (let existingWord = 0; existingWord < allWords.length; existingWord++) {
      if (allWords[existingWord].word.toLowerCase() === randomWord.toLowerCase()) {
        isDuplicate = true;
      }
    }
  }
  return randomWord;
}


// The function that finds a location a new word can slot into the puzzle, should favor adding to the
// words in the order that they are added, so earlier words are connected to as much as possible as the puzzle
// progresses. 
// returns the nth letter of the old word that the new word can atatch to or -1 if no match
const findSlot = (oldWord, newWord, allWords) => {
  
  // cycle through old word
  for (let oldLetter = 0; oldLetter < oldWord.word.length; oldLetter++) {
    // could potentially check for adjacent words here making algorithm
    // more efficient...
    // cycle through new word
    for (let newLetter = 0; newLetter < newWord.length; newLetter++) {
      // Need to check: 
      // 1) if the letters match
      // 2) if there is already a different word there
      // 3) if placing Horizontal if there is a horizontal word one above or below
      // that would touch
      //    if placing Vertical if there is a vertical word one to the right or left
      // that would touch
      // 4) if another word does intersect, check if intersecting letter matches
      // 5) if everything matches up return {oldLetter:number newLetter:number}
      // so the new position can be calculated 
      if (oldWord.word[oldLetter].toLowerCase() === newWord[newLetter].toLowerCase()) {
        // Having a grid would make this much easier, just would cycle through all of the new letters being
        // placed into the grid and check for collsions / neighbors.
        let obstruction = false;
        let badIntersection = false;
        const placingVertical = oldWord.orientation === 'Horizontal';
        const newStartX = placingVertical ? oldWord.x + oldLetter : oldWord.x - newLetter;
        const newStartY = placingVertical ? oldWord.y - newLetter : oldWord.y + oldLetter;
        for (let existingWord = 0; existingWord < allWords.length; existingWord++) {
          const checkWord = allWords[existingWord];
          if (checkWord.word.toLowerCase() === oldWord.word.toLowerCase()) {
            continue;
          }
          const checkIsVertical = checkWord.orientation === 'Vertical';
          // Checks for horizontal adjacencies when placing a horizontal word
          if (!placingVertical && !checkIsVertical && checkWord.y >= newStartY -1 && checkWord.y <= newStartY + 1 
            && // check if newWord's start or end falls within checkWord
            (((newStartX <= checkWord.x + checkWord.word.length && newStartX >= checkWord.x -1) || 
            ( newStartX + newWord.length >= checkWord.x -1 && 
              newStartX + newWord.length <= checkWord.x + checkWord.word.length)) || 
              // check if checkWord's start or end fall within newWord
            ((checkWord.x <= newStartX + newWord.length && checkWord.x >= newStartX -1) || 
            (checkWord.x + checkWord.word.length <= newStartX + newWord.length && 
              checkWord.x + checkWord.word.length >= newStartX -1)))
              // With this method would also have to check if the start of checkword and then end of
              // check word fall within newword to truly test all possibilities. 
              ) {
              obstruction = true;
          }
          // Checks for words just off the front or end of the new word
          // when placing a horizontal word
          if (!placingVertical && (checkWord.x === newStartX + newWord.length 
            || checkWord.x === newStartX - 1 || (!checkIsVertical && checkWord.x + 
            checkWord.word.length === newStartX)) //know it's x is bad, see if it's y is bad
            && ( (newStartY >= checkWord.y && newStartY < checkWord.y + checkWord.word.length ) 
            || (!checkIsVertical && checkWord.y === newStartY) )) {
              obstruction = true;
            }
          //Checks for vertical adjacencies when placing a vertical word
          if (placingVertical && checkIsVertical && checkWord.x >= newStartX -1 && checkWord.x <= newStartX + 1 
            && ( ( (newStartY <= checkWord.y + checkWord.word.length && newStartY >= checkWord.y -1) || 
              ( newStartY + newWord.length >= checkWord.y -1 && 
                newStartY + newWord.length <= checkWord.y + checkWord.word.length) )  || 
                // check if checkWord's start or end fall within newWord
              ((checkWord.y <= newStartY + newWord.length && checkWord.y >= newStartY -1) || 
              (checkWord.y + checkWord.word.length <= newStartY + newWord.length && 
                checkWord.y + checkWord.word.length >= newStartY -1))) ) {
              obstruction = true;
          }
          // Checks for words just off the top or bottom of the new word
          // when placing a vertical word
          if (placingVertical && (checkWord.y === newStartY + newWord.length 
            || checkWord.y === newStartY - 1 || (checkIsVertical && checkWord.y + 
            checkWord.word.length === newStartY)) 
            && ( (newStartX >= checkWord.x && newStartX < checkWord.x + checkWord.word.length ) 
            || (!checkIsVertical && checkWord.x === newStartX ))) {
              obstruction = true;
            }
          // Checks for intersection and correct letter if there is one
          if (placingVertical && !checkIsVertical && newStartX < checkWord.x + checkWord.word.length 
            && newStartX >= checkWord.x && newStartY <= checkWord.y && newStartY + newWord.length > checkWord.y ) {
              // use newStartX to determine letter of checkword, and check.y to determine letter of newword
              if(newWord[checkWord.y - newStartY].toLowerCase() !== 
                checkWord.word[newStartX - checkWord.x].toLowerCase()) {
                  badIntersection = true;
                }
            }
          if (!placingVertical && checkIsVertical && newStartY < checkWord.y + checkWord.word.length 
            && newStartY >= checkWord.y && newStartX <= checkWord.x && newStartX + newWord.length > checkWord.x) {
              // use newStartX to determine letter of checkword, and check.y to determine letter of newword
              if(newWord[checkWord.x - newStartX].toLowerCase() !== 
                checkWord.word[newStartY - checkWord.y].toLowerCase()) {
                  badIntersection = true;
                }
            }
          // For placing verticals: check for horizontals ending off to the left or starting one to the right
          if (placingVertical && !checkIsVertical && (newStartX === checkWord.x + checkWord.length || 
            newStartX + 1 === checkWord.x) && checkWord.y >= newStartY && 
            checkWord.y < newStartY + newWord.length) {
              obstruction = true;
            }
          // For placing horizontals: check for verticals ending one above or starting one below
          if (!placingVertical && checkIsVertical && (newStartY === checkWord.y + checkWord.length || 
            newStartY + 1 === checkWord.y)  && checkWord.x >= newStartX && 
            checkWord.x < newStartX + newWord.length ) {
              obstruction = true;
            }
        } // end of loop through allwords for conlicts
        if (!obstruction && !badIntersection) {
          return {newStartX, newStartY};
        }
      } // if oldLetter and newLetter match
    } // loop through new word letters
  } // loop through old word letters
  // if old word is vertical, make sure there is not a word that is vertical that is
  // oldword'x + new word's length away and in the same y zone. Vice-versa for horizontal.
  // also if vertical check that 
  return null;
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