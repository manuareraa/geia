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
            className="w-[100%] rounded-lg object-cover md:w-[100%] lg:w-[100%]"
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
      className="h-[30rem] md:h-[40rem]  lg:h-[40rem] lg:w-[120rem] "
    >
      {imageCards}
    </Carousel>
    // <Carousel slide={false}>
    //   <img
    //     src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
    //     alt="..."
    //   />
    //   <img
    //     src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
    //     alt="..."
    //   />
    //   <img
    //     src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
    //     alt="..."
    //   />
    //   <img
    //     src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
    //     alt="..."
    //   />
    //   <img
    //     src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
    //     alt="..."
    //   />
    // </Carousel>
  );
}
