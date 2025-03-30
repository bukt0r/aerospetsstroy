import React, { useState } from "react";

const ImageCarusel = ({ blocks = []}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < blocks.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      {/* Отображаем текущий блок */}
      <div>{blocks[currentIndex]}</div>

      {/* Навигация */}
      <div className="flex justify-between items-center mt-auto">
        {/* Пагинация */}
        <div className="text-[24px] font-[400] mb-2">
          <span className="text-[#6095AB]">{currentIndex + 1} / </span>
          <span className="text-[#6095AB] opacity-70">{blocks.length}</span>
        </div>

        {/* Стрелки */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`transition-opacity ${
              currentIndex === 0 ? "opacity-30" : "opacity-100"
            }`}
          >
            <img src="/arrowLeft.svg" alt="<-"/>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === blocks.length - 1}
            className={`transition-opacity ${
              currentIndex === blocks.length - 1 ? "opacity-30" : "opacity-100"
            }`}
          >
            <img src="/arrowRight.svg" alt="->"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCarusel;

