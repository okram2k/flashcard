import React from "react";
import ListDecks from "./ListDecks";
import { Link } from "react-router-dom";

function Home(){
    return (
        <div>
            <div>
                <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
            </div>
            <br />
            <ListDecks />
        </div>
    );
}
export default Home;