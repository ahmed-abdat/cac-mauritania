import { useState } from 'react';

const useCarousel = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  return { currentIndex, goToIndex, goToNext, goToPrevious };
};

export default useCarousel;
