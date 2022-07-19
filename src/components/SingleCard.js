import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
	return (
		<div className="card" >
			<div className={flipped ? "flipped" : ""}>
				<img className='front' src={card.src} alt="card front" />
				<img
					className='back'
					src='/img/cover.png'
					alt="card back"
					onClick={() => disabled ? null : handleChoice(card)}
				/>
			</div>
		</div>
	)
}