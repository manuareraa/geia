import React, { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";

export default function DefaultCarousel(props) {
  const [imageUrls, setImageUrls] = useState([]);
  const [imageCards, setImageCards] = useState([]);

  const renderImageCards = () => {
    console.log("renderImageCards");
    let cardElements = [];
    setImageCards([]);
    imageUrls.forEach((imageUrl, index) => {
      let card = (
        <div className="">
          <img
            alt="..."
            src={imageUrl}
            key={index}
            className="rounded-lg lg:w-[100%] w-[100%] md:w-[100%] object-cover"
          />
        </div>
      );
      cardElements.push(card);
      setImageCards(cardElements);
    });
  };

  useEffect(() => {
    console.log("imageUrls", props.imageUrls);
    setImageUrls(props.imageUrls);
  }, [props]);

  useEffect(() => {
    console.log("imageUrls", imageUrls.length);
    if (imageUrls.length > 0) renderImageCards();
  }, [imageUrls]);

  useEffect(() => {
    console.log("imageCards", imageCards.length);
  }, [imageCards]);

  return (
    <Carousel
      slide={false}
      className="lg:h-[40rem] lg:w-[120rem]  md:h-[40rem] h-[30rem] "
    >
      {imageCards}
    </Carousel>
  );
}
