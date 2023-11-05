import React, { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./component/SingleCard";
import Confetti from "react-confetti";
const cardImages = [
  { src: "/images/image-1.jpeg", mached: false },
  { src: "/images/image-2.jpeg", mached: false },
  { src: "/images/image-3.jpeg", mached: false },
  { src: "/images/image-4.jpg", mached: false },
  { src: "/images/image-5.jpg", mached: false },
  { src: "/images/image-6.jpg", mached: false },
];
const acText = [
  "One of the defining features of the Assassin's Creed franchise is its dedication to historical accuracy. The game developers go to great lengths to recreate historical settings, landmarks, and characters with meticulous attention to detail. From Renaissance Italy to Revolutionary America, players are immersed in rich, historically-inspired worlds. This commitment to historical authenticity not only provides players with an educational experience but also adds depth to the narrative by intertwining real historical events and figures with a fictional, secret war between Assassins and Templars. In Assassin's Creed Brotherhood, the franchise introduced a multiplayer mode where players could play as Assassins or Templars in an online environment, bringing a unique dynamic and strategy to the game.",
  "The Assassin's Creed series has evolved significantly in terms of gameplay since its inception. Initially focusing on stealth and parkour mechanics, the franchise has expanded to include naval combat, role-playing elements, and open-world exploration. Parkour, or the art of free-running, is a signature element that allows players to navigate the game's urban environments with fluidity and grace, making for exciting and cinematic gameplay experiences. This evolution of gameplay mechanics keeps the series fresh and engaging for long-time fans and new players alike. The Assassin's Creed games are inspired by real historical landmarks such as the Leaning Tower of Pisa, Notre-Dame Cathedral, the Great Pyramids, and more, with precise digital recreations of these historical buildings.",
  "Alongside the historical settings, the Assassin's Creed franchise features a modern-day storyline that ties all the games together. Players take on the role of characters who are part of a secretive organization known as the Assassins, fighting against the Templars in the present day. This overarching narrative creates a unique and immersive storytelling experience as players explore both the past and present, working to uncover hidden secrets and prevent the Templars from achieving their nefarious goals. In many games of the series, players can discover hidden messages and symbols left by Subject 16, a previous Animus subject who leaves clues and secrets for players to uncover.",
  "Assassin's Creed games are renowned for their cinematic quality and epic musical scores. The series often features breathtaking visuals and captivating cutscenes that draw players into the game's world. In addition, the music, composed by talents like Jesper Kyd and Lorne Balfe, adds emotional depth and atmosphere to the gameplay. The combination of stunning visuals and evocative music contributes to the franchise's cinematic appeal, making it an immersive and memorable gaming experience. The Assassin's Creed franchise often connects historical events, characters, and periods with fictional plots and conspiracies, providing a unique storytelling approach.",
  "Beyond the mainline games, the Assassin's Creed franchise has expanded into various media, including novels, comics, and an animated series. These additional sources of storytelling contribute to the lore of the series and offer fans a deeper understanding of the world, its characters, and the overarching conflict. The franchise's expansive universe continues to grow, allowing fans to explore and enjoy the Assassin's Creed mythos in various formats and mediums. Assassin's Creed games frequently feature easter eggs, which are hidden and quirky elements within the game, such as references to other games, books, movies, or interesting surprises for fans.",
];

let acRandomText;
const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime")
      ? parseInt(localStorage.getItem("bestTime"))
      : null
  );
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [startGame, setStatGame] = useState(false);
  // shuffle and duplicate cards

  const shuffleCards = () => {
    const duplicateCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(duplicateCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsGameOver(false);
    setTime(0);
    setStatGame(true);
    acRandomText = acText[Math.floor(Math.random() * acText.length)];
  };

  // set choseOne to be equal choseTwo

  const handleChoise = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  // compare cards

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, mached: true };
            } else {
              return card;
            }
          });
        });
        continueGame();
      } else {
        setTimeout(() => {
          continueGame();
        }, 1200);
      }
    }
  }, [choiceOne, choiceTwo]);
  //  start game when page loaded

  const continueGame = () => {
    setTurns((prevTurn) => prevTurn + 1);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setIsGameOver(false);
  };

  useEffect(() => {
    const cardMach = cards.every((card) => card.mached);
    if (cardMach) {
      setIsGameOver(true);
      bestWinTime();
    }
  }, [cards]);

  // bestTime

  const bestWinTime = () => {
    if (!bestTime || time < bestTime) {
      localStorage.setItem("bestTime", time);
      setBestTime(time);
    }
    setIsGameOver(true);
  };

  // setTime inerval

  useEffect(() => {
    let timeInterval;
    if (!isGameOver) {
      timeInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timeInterval);
    };
  }, [isGameOver]);

  // useEffect(() => {
  //   shuffleCards();
  // }, []);

  return (
    <div className='memory'>
      {startGame && !isGameOver ? (
        <div>
          <h1>AC memory game</h1>
          <h3>
            Time: {time} <small>s</small>
          </h3>
          <div className='game'>
            <div className='card-grid'>
              {cards.map((card) => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoise={handleChoise}
                  disabled={disabled}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.mached
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ) : !startGame ? (
        <div>
          <h1>AC memory game</h1>
          <button onClick={shuffleCards}>Start game</button>
          <p>
            Assassin's Creed is an open-world, action-adventure, and stealth
            game franchise published by Ubisoft and developed mainly by its
            studio Ubisoft Montreal using the game engine Anvil and its more
            advanced derivatives. Created by Patrice Désilets, Jade Raymond, and
            Corey May, the Assassin's Creed video game series depicts a
            fictional millennia-old struggle between the Order of Assassins, who
            fight for peace and free will, and the Knights Templar, who desire
            peace through order and control. The series features historical
            fiction, science fiction, and fictional characters intertwined with
            real-world historical events and historical figures.
          </p>
          <img src='/images/banner.jpg' className='banner' alt='banner' />
          <p>
            In most games, players control a historical Assassin while also
            playing as an Assassin Initiate or someone caught in the
            Assassin–Templar conflict in the present-day framing story.
            Considered a spiritual successor to the Prince of Persia series,
            Assassin's Creed took inspiration from the novel Alamut by the
            Slovenian writer Vladimir Bartol, based on the historical Hashashin
            sect of the medieval Middle East
          </p>
        </div>
      ) : (
        <div>
          <h1>AC memory game</h1>
          <div className='d-flex'>
            <h3>Turns: {turns}</h3>
            <h3>Time: {time}</h3>
            <h3>Best Time: {bestTime}</h3>
          </div>
          <p>{acRandomText}</p>
          <button onClick={shuffleCards}>New game</button>
          <div className='gallery'>
            <img src='images/img-1.jpeg' alt='img-1' />
            <img src='images/img-2.jpeg' alt='img-2' />
            <img src='images/img-3.jpeg' alt='img-3' />
            <img src='images/img-4.jpeg' alt='img-4' />
          </div>
          <Confetti recycle={false} />
        </div>
      )}
    </div>
  );
};

export default App;
