'use client';

import React, { useState } from 'react';

const Certificates = ({ data = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна
  const [modalImage, setModalImage] = useState(''); // Состояние для изображения, которое будет отображаться в модальном окне

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true); // Открываем модальное окно
  };

  const closeModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
    setModalImage(''); // Сбрасываем выбранное изображение
  };

  return (
    <div className="text-[#111111CC]">
      {data.map((item, index) => (
        <div key={index}>
          <p className="mb-[16px]">{item.description}</p>
          <div className="grid grid-cols-2 gap-[10px]">
            {item.images.map((image, imgIndex) => (
              <div key={imgIndex} className="flex flex-col items-center">
                <img
                  src={image}
                  alt={`Certificate ${index + 1}-${imgIndex + 1}`}
                  className="mb-[32px] w-full cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => openModal(image)} // Открытие модального окна по клику на картинку
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Модальное окно с увеличенным изображением */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white w-[90%] h-[90%] p-[10px] relative">
            <span
              onClick={closeModal}
              className="absolute top-0 right-0 text-black cursor-pointer text-2xl p-2"
            >
              &times;
            </span>
            <img
              src={modalImage}
              alt="Enlarged Certificate"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;


