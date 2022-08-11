// Holds all background objects rendering them behind the crossword puzzle

const AllBackgroundObjects = () => {

    const allBackgroundObjects = [<div style={{
        width: 30, 
        height: 60, 
        backgroundColor: 'blue',
        position: 'absolute',
        top: 300,
        left: 150
    }}>HI</div>,
    <div style={{
        width: 30, 
        height: 1000, 
        backgroundColor: 'blue',
        position: 'absolute',
        top: -100,
        left: 300,
        zIndex: -1
    }}>HI</div>
    ]

    return (
        <div>
            {allBackgroundObjects}
        </div>
    )
}

export default AllBackgroundObjects;