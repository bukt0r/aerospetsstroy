'use client'

import React from "react";
import Team from "./Team";
import ImageCarusel from "@/app/components/ImageCarusel/ImageCarusel";
import {useMediaQuery} from "@mantine/hooks";
import chunkArray from "@/app/components/Helper/chunkArray";


const TeamContainer = ({title, subtitle, description, members}) => {

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const count = isLargeScreen ? 6 : 3;
  const teamData = members ? members : [];

  const teams = chunkArray(teamData, count);

  const teamBlocks = teams.map((team, index) => (
    <Team key={index} team={team} title={title} subtitle={subtitle} description={description} />
  ));

  return (
    <div
      className="pl-[15px] pr-[19px] pt-[60px] pb-[60px] lg:px-[60px] lg:py-[100px] xl:px-[100px]"
      id="TeamContainer">
      <div>
        <ImageCarusel blocks={teamBlocks}/>
      </div>
    </div>
  );
};

export default TeamContainer;