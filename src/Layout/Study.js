import React, {useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {readDeck} from "../utils/api/index"

function Study(){
    const params = useParams();
    const deckId = params.deckId
    const [front, setFront] = useState(true);
    const [cardNumber, setCardNumber] = useState(0);
    const [cards, setCards] = useState({});
    const [deck, setDeck] = useState({});
    useEffect(() => {
        setCards( {} );
        async function loadData() {
           try {
            const dataFromAPI = await readDeck(deckId);
            setDeck(dataFromAPI);
            setCards(dataFromAPI.cards);
           
          } catch (error) {
            if (error.name === "AbortError") {
              // Ignore `AbortError`
              console.log("Aborted");
          } else {
              throw error;
            }
        }
      }
      loadData();
    }, [deckId]);

    function flipCard(){
        setFront(!front);
        
    }
    const history = useHistory();
    function nextCard(){
        if (cardNumber + 1 < cards.length){
            setCardNumber(cardNumber + 1);
            setFront(true);
        } else {
            const result = window.confirm(`Restart cards?
            
            Click 'cancel' to return to the home page.`);
      if (result) {
        setCardNumber(0);
        setFront(true);
        } else {
            history.push("/");
        }
        
        }
    }

    function Breadcrumb(){
        return(
<           div className="navigation">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item" key="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="2">Study</li>
                    </ol>
                </nav>
            </div>
    );
    }
    if (cards.length > 2){
        console.log(cards[0].front);
        return (
            <div>
                <Breadcrumb />
                <h2>Study: {deck.name}</h2>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Card {cardNumber + 1} of {cards.length}</h5>
                        <p className="card-text">{(front) ? `${cards[cardNumber].front}` : `${cards[cardNumber].back}`}</p>
                        <button className="btn btn-secondary" onClick={flipCard}>Flip</button> &nbsp;
                        {(front) ? " " : <button className="btn btn-primary" onClick={nextCard}>Next</button>}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Breadcrumb />
                <h2>Study: {deck.name}</h2>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Not Enough Cards.</h5>
                        <p className="card-text">You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Study;