'use client'


import React from "react";
import ImageCarusel from "../../ImageCarusel/ImageCarusel";
import Partners from "@/app/components/Pages/Partners/Partners";

const ParntersContainer =()=>{
  const partnersData = [
    {
      images:[
        "/partners/1-1.svg",
        "/partners/1-2.svg",
        "/partners/1-3.svg",
        "/partners/1-4.svg",
        "/partners/1-5.svg",
        "/partners/1-6.svg",
        "/partners/1-7.svg",
        "/partners/1-8.svg",
        "/partners/1-9.svg",
      ],
    },
    {
      images:[
        "/partners/2-1.svg",
        "/partners/2-2.svg",
        "/partners/2-3.svg",
        "/partners/2-4.svg",
        "/partners/2-5.svg",
        "/partners/2-6.svg",
        "/partners/2-7.svg",
        "/partners/2-8.svg",
        "/partners/2-9.svg",
      ],
    },
    {
      images:[
        "/partners/3-1.svg",
        "/partners/3-2.svg",
        "/partners/3-3.svg",
        "/partners/3-4.svg",
        "/partners/3-5.svg",
        "/partners/3-6.svg",
      ],
    },
  ];
  const partnersBlocks = partnersData.map((data, index) => (
    <Partners key={index} images={data.images}/>
  ));
  return (
    <div
      className="pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#F2F5F9]"
      id="PartnersContainer">
      <ImageCarusel blocks={partnersBlocks}/>
    </div>
  );
};
export default ParntersContainer;