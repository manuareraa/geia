import React, { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";

export default function DefaultCarousel(props) {
  const [imageUrls, setImageUrls] = useState([]);
  const [imageCards, setImageCards] = useState([]);

  const renderImageCards = () => {
    let cardElements = [];
    setImageCards([]);
    imageUrls.forEach((imageUrl, index) => {
      let card = (
        <img
          alt="..."
          src={imageUrl}
          key={index}
          className="rounded-lg lg:w-[800px] w-[60%] object-cover"
        />
      );
      cardElements.push(card);
      setImageCards(cardElements);
    });
  };

  useEffect(() => {
    setImageUrls(props.imageUrls);
  }, [props]);

  useEffect(() => {
    if (imageUrls.length > 0) renderImageCards();
  }, [imageUrls]);

  return <Carousel slide={false}>{imageCards}</Carousel>;
}
