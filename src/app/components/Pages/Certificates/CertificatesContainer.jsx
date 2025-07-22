'use client';

import React, {useState} from 'react';
import ImageCarusel from '../../ImageCarusel/ImageCarusel';
import Certificates from './Certificates';
import { useFirestoreContent } from "@/hooks/useFirestoreContent";

const CertificatesContainer = () => {
  const { certificatesData } = useFirestoreContent();
  const { ordering = [], license = [], certificate = [], opd = [] } = certificatesData?.documents || {};

  const renderCarusel = (group) => (
      <ImageCarusel
          blocks={group.map((data, index) => (
              <Certificates key={index} data={[data]} />
          ))}
      />
  );

  const renderGrid = (group) => group.map((item, idx) => (
      <div key={idx} className="mb-[86px]">
        <div className="w-[55%] mb-[60px] text-[20px]">
          <p>{item.description}</p>
        </div>
        <div className="flex flex-wrap gap-[20px]">
          {item.images.map((img, i) => (
              <a key={i} href={item.pdf} target="_blank" rel="noopener noreferrer">
                <img
                    className="w-[387px] h-[533px] cursor-pointer transition-transform duration-300 hover:scale-110"
                    src={img}
                    alt="cert"
                />
              </a>
          ))}
        </div>
      </div>
  ));

  // Don't render if not visible
  if (!certificatesData?.visible) {
    return null;
  }

  return (
      <div className="pl-[15px] pr-[19px] pt-[60px] pb-[60px] lg:px-[60px] xl:px-[100px] xl:py-[100px] bg-[#FFFFFF]" id="CertificatesContainer">
        <h2 className="text-[30px] font-semibold mb-[24px] xl:text-[64px] xl:mb-[40px]">{certificatesData?.title}</h2>

        {/* Мобильная версия */}
        <div className="mb-[60px] xl:hidden">{renderCarusel(ordering)}</div>
        <div className="mb-[60px] xl:hidden">{renderCarusel(license)}</div>
        <div className="mb-[60px] xl:hidden">{renderCarusel(certificate)}</div>

        {/* Десктопная версия */}
        <div className="max-xl:hidden">{renderGrid(ordering)}</div>
        <div className="max-xl:hidden">{renderGrid(license)}</div>
        <div className="max-xl:hidden">{renderGrid(certificate)}</div>
      </div>
  );
};

export default CertificatesContainer;