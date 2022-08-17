// Contains all single words
 import React from "react"
 import SingleWord from "./SingleWord"
 import { connect } from "react-redux";

const AllWords = (props) => {
    // Maybe pull all words from somewhere like redux store or context, so whenever they are updated
    // they update here, but there they can each have their specific position assigned by wordadder

    // get all words from redux store
    const words = props.words.reverse();;

    // console.log('props in AllWords is now:', words);

    return (
        <div className='AllWordsContainer'>
            <p> all words: </p>
            {
                /* For each word pulled from the Redux Store create a new SingleWord to be rendered */
                words.map(word => (
                    // Check each object in words to see that they are word objects and not flags
                    word.word && 
                    <SingleWord 
                        word={word.word}
                        key={word.word} 
                        orientation={word.orientation}
                        x={word.x}
                        y={word.y}
                        showLetters={word.showLetters}
                    />
                ))
            }
        </div>
    )

}

const mapStateToProps = (state, props) => {
    // ('state in mapStateToProps in AllWords is:', state);
    return { words:state.words }; 
  }
  
  export default connect(mapStateToProps)(AllWords);

// export default AllWords;


/* example if three hardcoded singlewords are wanted: but need to change position to just x and y not an encasing object

//temporary example
    // maybe position could just be another prop idk
    // keys can just be the word since I can also make sure there aren't repeats during. 
    // more likely list will just be of objects, {word, orientation, and position} and here I will
    // have to create the SingleWord objects by mapping the list so in the render!!!
    const firstWord = <SingleWord 
        word='firstWord' 
        key={'1'} 
        orientation='Vertical'
        position={{x: 0, y: 200}}
        showLetters={true}
    />
    const secondWord = <SingleWord 
        word='secondWord' 
        key={'2'} 
        orientation='Horizontal' 
        position={{x: 0, y: 326}}
    />
    // magic number 21 that horizontals have to be lowered by
    const thirdWord = <SingleWord 
        word='thirdWord' 
        key={'3'} 
        orientation='Vertical'
        position={{x: 280, y: 200}}
    />

    const allWords = [firstWord, secondWord, thirdWord];
    
*/