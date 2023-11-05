import React from "react";
import "./SingleCard.css";
const SingleCard = ({ card, handleChoise, flipped, disabled, time }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoise(card);
    }
  };
  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt='card front' className='front-image' />
        <img
          src='./images/cover.jpg'
          onClick={handleClick}
          alt='card back'
          className='back-image'
        />
      </div>
    </div>
  );
};

export default SingleCard;
