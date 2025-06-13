'use client'

import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import Objects from "./Objects";
import ImageCarusel from "@/app/components/ImageCarusel/ImageCarusel";
import chunkArray from "@/app/components/Helper/chunkArray";

const ObjectsContainer = ({title, objectsData}) => {
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const count = isLargeScreen ? 2 : 1;
  const projectData = objectsData

  const projects = chunkArray(projectData, count);

  const addresses = projectData.map(project => project.address);

  const titles = projectData.map(project => project.title);

  const projectBlocks = projects.map((project, index) => (
    <Objects key={index} projects = {project} addresses = {addresses} titles = {titles}/>
  ));

  return (
    <div className="flex flex-col min-h-screen pl-[15px] pr-[19px] pt-[40px] pb-[40px] lg:px-[60px] lg:pt-[40px] xl:px-[100px]"
         id="ObjectsContainer"
    >
      <div className='xl:mb-[20px]'>
        <h2 className="text-[30px] font-semibold xl:text-[64px]">{title}</h2>
      </div>
      <ImageCarusel blocks={projectBlocks}/>
    </div>
  );
};

export default ObjectsContainer;