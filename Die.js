import React from "react"

export default function Die(props) {
    
    function getDieNumber(num) {
        const arr = ["one","two","three","four","five","six"]
        
        return arr[num - 1]
    }
    
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            <img className="die-img" src={`img/die-${getDieNumber(props.value)}.png`}/>
        </div>
    )
}