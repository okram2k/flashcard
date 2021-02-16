import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import Deck from "./Deck";
import DeckCreate from "./DeckCreate";
import DeckEdit from "./DeckEdit";
import CardCreate from "./CardCreate";
import CardEdit from "./CardEdit";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function Layout() {
  
  return (
    <div>
      
      <Header />
      <div className="container">
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path={'/decks/:deckId/study'}>
          <Study />
        </Route>
        <Route path={'/decks/new'}>
          <DeckCreate />
        </Route>
        <Route path={'/decks/:deckId/cards/:cardId/edit'}>
          <CardEdit />
        </Route>
        <Route path={'/decks/:deckId/cards/new'}>
          <CardCreate />
        </Route>
        <Route path={'/decks/:deckId/edit'}>
          <DeckEdit />
        </Route>
        <Route path={'/decks/:deckId'}>
          <Deck />
        </Route>
        
 
        <Route>
          <NotFound />
        </Route>
      </Switch>      
      </div>
    </div>
  );
}

export default Layout;
