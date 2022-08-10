// Input form for users' guesses. Should update single source of truth with user's word
// Checks that length matches and could start / end word with correct letter if desired
import React from 'react';
import { useState } from 'react';

const GuessInput = () => {
    const [stateText = 'defaultValue', setText] = useState([]);
    const [formText, setFormText] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        const guess = e.target[0].value;
        setText(guess);
        setFormText(''); // Empty out / reset form after submission
        console.log('user word is: ', guess);
    }

    //jsx for the form users enter their word into
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    className='GuessInput'
                    placeholder="Type your guess here" 
                    type='text' 
                    value={formText}
                    onChange={e => setFormText(e.target.value)}
                />
                <button>
                    I'M SURE
                </button>
            </form>
            <h1> here is the text -| {stateText}</h1>
        </div>
    )

}


export default GuessInput;