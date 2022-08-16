// Maybe this could be a pure js file that returns the definition, idk
const Definition = (props) => {

    const getDefinition = () => {
        return 'the definition of ' + props.word + ' is obvious.';
    }


    return (
        <div>
            <h3>{getDefinition()}</h3>
        </div>
    )
}

export default Definition;