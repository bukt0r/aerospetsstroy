'use client';

import React from "react";
import ImageCarusel from "../../ImageCarusel/ImageCarusel";
import Partners from "@/app/components/Pages/Partners/Partners";
import chunkArray from "@/app/components/Helper/chunkArray";
import { useMediaQuery } from "@mantine/hooks";
import { useFirestoreContent } from "@/hooks/useFirestoreContent";

const PartnersContainer = () => {
  const { partnersData } = useFirestoreContent();
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const count = isLargeScreen ? 8 : 9;

  const partnersImages = (partnersData?.baners || []).map(item => Array.isArray(item.image) ? item.image[0] : item.image);
  const abbs = chunkArray(partnersImages, count);

  const partnersBlocks = abbs.map((abb, index) => (
      <Partners key={index} images={abb} title={partnersData?.title} />
  ));

  // Don't render if not visible
  if (!partnersData?.visible) {
    return null;
  }

  return (
      <div
          className="pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#FFFFFF] lg:px-[60px] xl:px-[100px] xl:py-[100px]"
          id="PartnersContainer">
        <ImageCarusel blocks={partnersBlocks} />
      </div>
  );
};

export default PartnersContainer;
