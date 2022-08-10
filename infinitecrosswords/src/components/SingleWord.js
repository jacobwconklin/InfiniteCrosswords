// Takes in the string of the word and if it is horizontal or vertical
// then it builds out the visual crossword 

const SingleWord = (props) => {

    const selectClassName = () => {
        return props.orientation ? props.orientation + 'Container' : 'HorizontalContainer';
    }

    return (
        <div>
            <div className={props.orientation + 'Containter'}>
                {
                    props.word ? 
                        props.word.split('').map(letter => ( 
                            <span key={letter} className="Letter">{letter}</span>
                        )) : 
                        <p> Error no props.word </p>    
                }
            </div>
        </div>
    )
}

export default SingleWord;