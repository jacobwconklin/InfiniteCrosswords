// To render and contain the entire header, which will be fixed to the 
// screen to follow the user if they scroll
import CrosswordBuilder from "./CrosswordBuilder"

const FixedHeader = () => {

    return (
        <div 
            className="FixedHeader" 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                background: 'silver',
                border: '3px solid gold'
            }}
        >
            <CrosswordBuilder />
        </div>
    ) 
}

// Add start button to fire off first word... 

export default FixedHeader