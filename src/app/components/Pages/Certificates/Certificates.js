'use client';

import React from "react";

const Certificates = ({ data = [] }) => {

  return (
    <div className="text-[#111111CC]">
      {data.map((item, index) => (
        <div key={index}>
          <p className="mb-[16px]">{item.description}</p>
          <div className="grid grid-cols-2 gap-[10px]">
            {item.images.map((image, imgIndex) => (
              <div key={imgIndex} className="flex flex-col items-center">

                <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <img
                      src={image}
                      alt={`Certificate ${index + 1}-${imgIndex + 1}`}
                      className="mb-[32px] w-full cursor-pointer transition-transform duration-300 hover:scale-110"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certificates;


