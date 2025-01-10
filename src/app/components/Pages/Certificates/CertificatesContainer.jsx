'use client';

import React, {useState} from 'react';
import ImageCarusel from '../../ImageCarusel/ImageCarusel';
import Certificates from './Certificates';

const CertificatesContainer = () => {

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

  const certificatesData1 = [
    {
      description:
        'Выписка из реестра членов саморегулируемой организации в составе единого реестра сведений о членах саморегулируемых организаций в области строительства, реконструкции, капитального ремонта, сноса объектов капитального строительства и их обязательствах от 13.09.2024',
      images: ['/certificates/certificates1-1-1.svg', '/certificates/certificates1-1-2.svg'],
    },
    {
      description:
        'Выписка из реестра членов саморегулируемой организации в составе единого реестра сведений о членах саморегулируемых организаций в области строительства, реконструкции, капитального ремонта, сноса объектов капитального строительства и их обязательствах от 13.09.2024',
      images: ['/certificates/certificates2-1-1.svg', '/certificates/certificates2-1-2.svg'],
    },
  ];

  const certificatesData2 = [
    {
      description:
        'Выписка о подаче результатов проведения специальной оценки условий труда в Федеральную государственную информационную систему учета результатов проведения специальной оценки условий труда 27.07.2023',
      images: ['/certificates/certificates1-2-1.svg', '/certificates/certificates1-2-2.svg'],
    },
    {
      description:
        'Выписка о подаче результатов проведения специальной оценки условий труда в Федеральную государственную информационную систему учета результатов проведения специальной оценки условий труда 27.07.2023',
      images: ['/certificates/certificates2-2-1.svg', '/certificates/certificates2-2-2.svg'],
    },
    {
      description:
        'Выписка о подаче результатов проведения специальной оценки условий труда в Федеральную государственную информационную систему учета результатов проведения специальной оценки условий труда 27.07.2023',
      images: ['/certificates/certificates3-2-1.svg'],
    },
  ];

  return (
    <div
      className="pl-[15px] pr-[19px] pt-[60px] pb-[60px] lg:px-[60px] xl:px-[100px] xl:py-[100px]"
      id="CertificatesContainer"
    >
      <h2 className="text-[30px] font-[500] mb-[24px] xl:text-[64px] xl:mb-[40px]">СЕРТИФИКАТЫ</h2>
      <div className="mb-[60px] xl:hidden">
        <ImageCarusel
          blocks={certificatesData1.map((data, index) => (
            <Certificates key={index} data={[data]}/>
          ))}
        />
      </div>

      <div className="xl:hidden">
        <ImageCarusel
          blocks={certificatesData2.map((data, index) => (
            <Certificates key={index} data={[data]}/>
          ))}
        />
      </div>

      <div className="max-xl:hidden">
        <div className="w-[55%] mb-[60px] text-[20px]">
          <p>{certificatesData1[0].description}</p>
        </div>
        <div className="flex mb-[86px]">
          <div>
            <img className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110" src="/certificates/certificates1-1-1.svg" alt="cert" onClick={() => openModal("/certificates/certificates1-1-1.svg")}/>
          </div>
          <div>
            <img className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110" src="/certificates/certificates1-1-2.svg" alt="cert" onClick={() => openModal("/certificates/certificates1-1-2.svg")}/>
          </div>
          <div>
            <img className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110" src="/certificates/certificates2-1-1.svg" alt="cert" onClick={() => openModal("/certificates/certificates2-1-1.svg")}/>
          </div>
          <div>
            <img className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110" src="/certificates/certificates2-1-2.svg" alt="cert" onClick={() => openModal("/certificates/certificates2-1-2.svg")}/>
          </div>
        </div>
      </div>

      <div className="max-xl:hidden">
        <div className="w-[55%] mb-[60px] text-[20px]">
          <p>{certificatesData2[0].description}</p>
        </div>
        <div className="flex">
          <div>
            <img className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110" src="/certificates/certificates1-2-1.svg" alt="cert" onClick={() => openModal("/certificates/certificates1-2-1.svg")}/>
          </div>
          <div>
            <img className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110" src="/certificates/certificates1-2-2.svg" alt="cert" onClick={() => openModal("/certificates/certificates1-2-2.svg")}/>
          </div>
          <div>
            <img className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110" src="/certificates/certificates2-2-1.svg" alt="cert" onClick={() => openModal("/certificates/certificates2-2-1.svg")}/>
          </div>
          <div>
            <img className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110" src="/certificates/certificates2-2-2.svg" alt="cert" onClick={() => openModal("/certificates/certificates2-2-2.svg")}/>
          </div>
        </div>
        <div>
          <img className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110" src="/certificates/certificates3-2-1.svg" alt="cert" onClick={() => openModal("/certificates/certificates3-2-1.svg")}/>
        </div>
      </div>

      {/* Модальное окно с увеличенным изображением */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white w-[40%] h-[90%] p-[10px] relative">
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

export default CertificatesContainer;


