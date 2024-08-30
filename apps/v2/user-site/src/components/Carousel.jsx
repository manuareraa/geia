import React from "react";

function Carousel(props) {
  return (
    <div className="w-full carousel">
      {props.imageUrls.map((imageUrl, index) => {
        return (
          <div
            id={`slide${index + 1}`}
            key={index}
            className="relative w-full carousel-item"
          >
            <img
              src={
                imageUrl ||
                "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
              }
              className="w-full h-auto max-h-[75vh] object-cover"
            />

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={
                  index === 0
                    ? `#slide${props.imageUrls.length}`
                    : `#slide${index}`
                }
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={
                  index === props.imageUrls.length - 1
                    ? `#slide1`
                    : `#slide${index + 2}`
                }
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Carousel;
