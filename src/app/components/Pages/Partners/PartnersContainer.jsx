'use client'


import React from "react";
import ImageCarusel from "../../ImageCarusel/ImageCarusel";
import Partners from "@/app/components/Pages/Partners/Partners";
import chunkArray from "@/app/components/Helper/chunkArray";
import {useMediaQuery} from "@mantine/hooks";

const ParntersContainer =()=>{

  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const count = isLargeScreen ? 8 : 9;

  const partnersData = [
        "/partners/1-1.svg",
        "/partners/1-2.svg",
        "/partners/1-3.svg",
        "/partners/1-4.svg",
        "/partners/1-5.svg",
        "/partners/1-6.svg",
        "/partners/1-7.svg",
        "/partners/1-8.svg",
        "/partners/1-9.svg",
        "/partners/2-1.svg",
        "/partners/2-2.svg",
        "/partners/2-3.svg",
        "/partners/2-4.svg",
        "/partners/2-5.svg",
        "/partners/2-6.svg",
        "/partners/2-7.svg",
        "/partners/2-8.svg",
        "/partners/2-9.svg",
        "/partners/3-1.svg",
        "/partners/3-2.svg",
        "/partners/3-3.svg",
        "/partners/3-4.svg",
        "/partners/3-5.svg",
        "/partners/3-6.svg",
  ];
  const abbs = chunkArray(partnersData, count);

  const partnersBlocks = abbs.map((abb, index) => (
    <Partners key={index} images={abb}/>
  ));

  return (
    <div
      className="pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#F2F5F9] lg:px-[60px] xl:px-[100px] xl:py-[100px]"
      id="PartnersContainer">
      <ImageCarusel blocks={partnersBlocks}/>
    </div>
  );
};
export default ParntersContainer;