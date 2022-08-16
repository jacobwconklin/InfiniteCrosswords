// Takes in the string of the word and if it is horizontal or vertical
// then it builds out the visual crossword 
import React from "react";

const SingleWord = (props) => {

    //const selectClassName = () => {
    //    return props.orientation ? props.orientation + 'Container' : 'HorizontalContainer';
    //}
    const orientation = props.orientation || 'Vertical';
    const showLetters = props.showLetters || false;
    // Flag to make first letter always be visible
    let isFirstLetter = true;

    // Want to make the first letter always visible
    const checkFirstLetter = () => {
        if (isFirstLetter) {
            isFirstLetter = false;
            return true;
        }
        return false;
    };

    console.log('props in single word are:', props);

    return (
        <div>
            <div className={orientation} style={{
                position: 'absolute', 
                top: props.position.y + 'px', 
                left: props.position.x + 'px'
            }}>
                <br />
                {
                    /* Decided to make each first letter visible, can change if words get 
                        atatched by other letters so that each subsequent word goes behind
                        the previous word instead */
                    props.word ? 
                        props.word.split('').map(letter => ( 
                            <span key={Math.random().toString()} className="Letter">
                                {(checkFirstLetter() || showLetters) && letter}
                            </span>
                        )) : 
                        <p> Error no props.word </p>    
                }
            </div>
        </div>
    )
}

export default SingleWord;