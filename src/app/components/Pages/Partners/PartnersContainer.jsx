'use client';

import React from "react";
import ImageCarusel from "../../ImageCarusel/ImageCarusel";
import Partners from "@/app/components/Pages/Partners/Partners";
import chunkArray from "@/app/components/Helper/chunkArray";
import { useMediaQuery } from "@mantine/hooks";

const PartnersContainer = ({ title, baners }) => {
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const count = isLargeScreen ? 8 : 9;

  const partnersData = (baners || []).map(item => item.image);
  const abbs = chunkArray(partnersData, count);

  const partnersBlocks = abbs.map((abb, index) => (
      <Partners key={index} images={abb} title={title} />
  ));

  return (
      <div
          className="pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#FFFFFF] lg:px-[60px] xl:px-[100px] xl:py-[100px]"
          id="PartnersContainer">
        <ImageCarusel blocks={partnersBlocks} />
      </div>
  );
};

export default PartnersContainer;
