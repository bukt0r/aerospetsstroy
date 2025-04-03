'use client';

import React, {useState} from 'react';
import ImageCarusel from '../../ImageCarusel/ImageCarusel';
import Certificates from './Certificates';

const CertificatesContainer = () => {

  const ordering = [
    {
      description:
          'Выписка из реестра членов саморегулируемой организации в составе единого реестра сведений о членах саморегулируемых организаций в области строительства, реконструкции, капитального ремонта, сноса объектов капитального строительства и их обязательствах от 06.03.2025',
      images: ['/certificates/ordering_1-1.png', '/certificates/ordering_1-2.png'],
      pdf: '/certificates/ordering.pdf',
    },
    {
      description:
        'Выписка из реестра членов саморегулируемой организации в составе единого реестра сведений о членах саморегулируемых организаций в области строительства, реконструкции, капитального ремонта, сноса объектов капитального строительства и их обязательствах от 06.03.2025',
      images: ['/certificates/ordering_1-3.png', '/certificates/ordering_1-4.png'],
      pdf: '/certificates/ordering.pdf',
    },
  ];

  const license = [
    {
      description:
          'Информация из реестра лицензий по состоянию на 23.08.2024 г.',
      images: ['/certificates/license_1-1.png', '/certificates/license_1-2.png'],
      pdf: '/certificates/license.pdf',
    },
  ];

  const certificate = [
    {
      description:
          'Сертификат соответсвия',
      images: ['/certificates/certificate_1-1.png', '/certificates/certificate_1-2.png'],
      pdf: '/certificates/certificate.pdf',
    },
    {
      description:
          'Сертификат соответсвия',
      images: ['/certificates/certificate_1-3.png'],
      pdf: '/certificates/certificate.pdf',
    },
  ];

  return (
    <div
      className="pl-[15px] pr-[19px] pt-[60px] pb-[60px] lg:px-[60px] xl:px-[100px] xl:py-[100px] bg-[#FFFFFF]"
      id="CertificatesContainer"
    >
      <h2 className="text-[30px] font-semibold mb-[24px] xl:text-[64px] xl:mb-[40px]">СЕРТИФИКАТЫ</h2>
      <div className="mb-[60px] xl:hidden">
        <ImageCarusel
          blocks={ordering.map((data, index) => (
            <Certificates key={index} data={[data]}/>
          ))}
        />
      </div>

      <div className="mb-[60px] xl:hidden">
        <ImageCarusel
          blocks={license.map((data, index) => (
            <Certificates key={index} data={[data]}/>
          ))}
        />
      </div>

      <div className="xl:hidden">
        <ImageCarusel
            blocks={certificate.map((data, index) => (
                <Certificates key={index} data={[data]}/>
            ))}
        />
      </div>

      <div className="max-xl:hidden">
        <div className="w-[55%] mb-[60px] text-[20px]">
          <p>{ordering[0].description}</p>
        </div>
        <div className="flex mb-[86px]">
          <div>
            <a
                href="/certificates/ordering.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
              <img
                  className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110"
                  src="/certificates/ordering_1-1.png"
                  alt="cert"
              />
            </a>
          </div>
          <div>
            <a
                href="/certificates/ordering.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
              <img
                  className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110"
                  src="/certificates/ordering_1-2.png"
                  alt="cert"
              />
            </a>
          </div>
          <div>
            <a
                href="/certificates/ordering.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
              <img
                  className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110"
                  src="/certificates/ordering_1-3.png"
                  alt="cert"
              />
            </a>
          </div>
          <div>
            <a
                href="/certificates/ordering.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
              <img
                  className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110"
                  src="/certificates/ordering_1-4.png"
                  alt="cert"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="max-xl:hidden">
        <div className="w-[55%] mb-[60px] text-[20px]">
          <p>{license[0].description}</p>
        </div>
        <div className="flex mb-[86px]">
          <div>
            <a
                href="/certificates/license.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
              <img
                  className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110"
                  src="/certificates/license_1-1.png"
                  alt="cert"
              />
            </a>
          </div>
          <div>
            <a
                href="/certificates/license.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
              <img
                  className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110"
                  src="/certificates/license_1-2.png"
                  alt="cert"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="max-xl:hidden">
        <div className="w-[55%] mb-[60px] text-[20px]">
          <p>{certificate[0].description}</p>
        </div>
        <div className="flex mb-[86px]">
          <div>
            <a
                href="/certificates/certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
              <img
                  className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110"
                  src="/certificates/certificate_1-1.png"
                  alt="cert"
              />
            </a>
          </div>
          <div>
            <a
                href="/certificates/certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
              <img
                  className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110"
                  src="/certificates/certificate_1-2.png"
                  alt="cert"
              />
            </a>
          </div>
          <div>
            <a
                href="/certificates/certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
              <img
                  className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110"
                  src="/certificates/certificate_1-3.png"
                  alt="cert"
              />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CertificatesContainer;


