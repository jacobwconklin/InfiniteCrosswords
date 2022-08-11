// Adds new words, needs to set their absolute position on the screen so they match up... 
// might not be jsx but pure js

const WordAdder = () => {

    // get words from api

    // update single source of truth: stuff like is next word vertical, score, distance etc.

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
}

export default WordAdder;