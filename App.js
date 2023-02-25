import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const diceSound = new Audio("audio/dice.mp3")
    const win = new Audio("audio/win.mp3")
    const click = new Audio("audio/click.mp3")

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [bestRoll, setBestroll] = React.useState(
        () => localStorage.getItem("bestRoll") || 0
    )
    const [rollCount, setRollCount] = React.useState(0)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            win.play()
        }
    }, [dice])
    
    function bestTime() {
        
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            diceSound.play()
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRollCount(-1)
            if(rollCount < bestRoll) {
                setBestroll(rollCount)
                localStorage.setItem("bestRoll", rollCount)
            } else if (bestRoll === 0) {
                setBestroll(rollCount)
                localStorage.setItem("bestRoll", rollCount)
            }
        }
        
        setRollCount(prev => prev + 1)
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
        click.play()
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <p>Your Best Roll : {bestRoll}</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <p>No of Roll : {rollCount}</p>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}