// Contains all single words
 import React from "react"
 import SingleWord from "./SingleWord"

const AllWords = () => {
    // Maybe pull all words from somewhere like redux store or context, so whenever they are updated
    // they update here, but there they can each have their specific position assigned by wordadder

    //temporary example
    // maybe position could just be another prop idk
    // keys can just be the word since I can also make sure there aren't repeats during. 
    // more likely list will just be of objects, {word, orientation, and position} and here I will
    // have to create the SingleWord objects by mapping the list so in the render!!!
    const firstWord = <SingleWord 
        word='firstWord' 
        key={'1'} 
        orientation='VerticalWord'
        position={{x: 0, y: 200}}
    />
    const secondWord = <SingleWord 
        word='secondWord' 
        key={'2'} 
        orientation='HorizontalWord' 
        position={{x: 0, y: 326}}
    />
    // magic number 21 that horizontals have to be lowered by
    const thirdWord = <SingleWord 
        word='thirdWord' 
        key={'3'} 
        orientation='VerticalWord'
        position={{x: 780, y: 200}}
    />

    const allWords = [firstWord, secondWord, thirdWord];

    return (
        <div className='AllWordsContainer'>
            <p> all words: </p>
            {allWords}
        </div>
    )

}

export default AllWords;