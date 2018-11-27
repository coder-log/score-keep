import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Players} from './../imports/api/players';
import {Tracker} from 'meteor/tracker';


const renderPlayers = function (playersList) {

  return playersList.map(function (player){
    return <p key={player._id}> {player.name} has {player.score} points </p>;
  });
};

const handleSubmit = function(e) {
  let playerName = e.target.playerName.value;
  e.preventDefault();
  if(playerName) {
   e.target.playerName.value='';
    //insert players
    // Insert new document into players collection
    Players.insert({
      name: playerName,
      score: 0
  });

  console.log(Players.find().fetch());
  }

};

Meteor.startup(function (){
  // STEP 1. INCLUDE
  //Call tracker.autorun
  Tracker.autorun( function () {

    //title -> Account Settings
    // Create a variable called players -> set equal to fetch query
  const players = Players.find().fetch();
  let title='Score Keep';
  let jsx = (
  <div>
    {/* Render h1 tag with title var as text */}
    <h1> {title} </h1>
    <p>Hello!</p>
    {/*Render players to the screen*/}
    {renderPlayers(players)}
    <form onSubmit = {handleSubmit}>
      <input type="text" name = "playerName" placeholder ="Player Name" />
      <button>Add Player</button>
    </form>
  </div>
  );
  ReactDOM.render((jsx), document.getElementById('app'));

  });
});