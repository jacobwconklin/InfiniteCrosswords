// Takes in the string of the word and if it is horizontal or vertical
// then it builds out the visual crossword 
import React from "react";

const SingleWord = (props) => {

    //const selectClassName = () => {
    //    return props.orientation ? props.orientation + 'Container' : 'HorizontalContainer';
    //}
    const orientation = props.orientation || 'VerticalWord';

    if (props.position) {
        console.log('in singleword if for props.position it is:', props.position);
        
    }

    return (
        <div>
            <div className={orientation} style={{
                position: 'absolute', 
                top: props.position.y + 'px', 
                left: props.position.x + 'px'
            }}>
                <br />
                {
                    props.word ? 
                        props.word.split('').map(letter => ( 
                            <span key={Math.random().toString()} className="Letter">{letter}</span>
                        )) : 
                        <p> Error no props.word </p>    
                }
            </div>
        </div>
    )
}

export default SingleWord;