import React, {useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import CardForm from "./CardForm"
import {readDeck, readCard, updateCard} from "../utils/api/index"

function CardEdit(){
    const params = useParams();
    const deckId = params.deckId;
    const cardId = params.cardId;
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    useEffect(() => {
        setDeck( {} );
        async function loadData() {
           try {
           const dataFromAPI = await readDeck(deckId);
           setDeck(dataFromAPI);
           const datafromApie2 = await readCard(cardId);
           setCard(datafromApie2);              
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
    }, [deckId, cardId]);


    const handleChange = ({ target }) => {
        const value = target.value;
       setCard({
       ...card,
       [target.name]: value,
     });
    };
    const history = useHistory();
    const handleSubmit = (event) => {
        let output = [];
        event.preventDefault();
        console.log("Submitted:", card);
        async function updateData() {
           try {
           const dataFromAPI = await updateCard(card);

           history.push(`/decks/${deckId}`);
          } catch (error) {
            if (error.name === "AbortError") {
              // Ignore `AbortError`
              console.log("Aborted");
          } else {
              throw error;
          }
        }
      }
      updateData(); 
      };
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item" key="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page" key="2">Edit Card {cardId}</li>
                </ol>
            </nav>
            <br />
            
            <h2>Edit Card</h2>
            
            <form onSubmit={handleSubmit}>
                <CardForm formData={card} handleChange={handleChange} />
                <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link> &nbsp;
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}
export default CardEdit;