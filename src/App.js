import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
	{ "src": "/img/helmet-1.png", matched: false },
	{ "src": "/img/potion-1.png", matched: false },
	{ "src": "/img/ring-1.png", matched: false },
	{ "src": "/img/scroll-1.png", matched: false },
	{ "src": "/img/shield-1.png", matched: false },
	{ "src": "/img/sword-1.png", matched: false },
]

function App() {
	const [cards, setCards] = useState([])
	const [turn, setTurn] = useState(0)
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)
	const [disabled, setDisabled] = useState(false)

	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }))
		
		setChoiceOne(null)
		setChoiceTwo(null)
		setCards(shuffledCards)
		setTurn(0)
	}

	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
		console.log(card);
	}

	useEffect(() => {
		if(!choiceTwo) return

		setDisabled(true)

		if (choiceOne.src === choiceTwo.src & choiceOne.id !== choiceTwo.id) {
			setCards(prevCards => prevCards.map(card =>  {
				if(card.src === choiceOne.src) return {...card, matched: true}
				else return card
			}))

			resetTurn()
		} else setTimeout(() => resetTurn(), 1000)

	}, [choiceTwo])

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurn(prevTurn => prevTurn + 1)
		setDisabled(false)
	}

	useEffect(() => {
		shuffleCards()
	}, [])

	return (
		<div className="App">
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>
			
			<div className='card-grid'>
				{cards.map((card) => (
					<SingleCard 
						key={card.id} 
						card={card} 
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>

			<p>Turn: {turn}</p>
		</div>
	);
}

export default App;
