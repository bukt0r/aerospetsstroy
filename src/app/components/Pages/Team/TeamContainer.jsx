'use client'

import React from "react";
import Team from "./Team";
import ImageCarusel from "@/app/components/ImageCarusel/ImageCarusel";
import {useMediaQuery} from "@mantine/hooks";
import chunkArray from "@/app/components/Helper/chunkArray";


const TeamContainer = () => {

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const count = isLargeScreen ? 6 : 3;
  const teamData = [
    {
      image: ["/team/avatar1.svg"],
      name: ["имя1 фамилия1"],
    },
    {
      image: ["/team/avatar2.svg"],
      name: ["имя2 фамилия2"],
    },
    {
      image: ["/team/avatar3.svg"],
      name: ["имя3 фамилия3"],
    },
    {
      image: ["/team/avatar1.svg"],
      name: ["имя4 фамилия4"],
    },
    {
      image: ["/team/avatar2.svg"],
      name: ["имя5 фамилия5"],
    },
    {
      image: ["/team/avatar3.svg"],
      name: ["имя6 фамилия6"],
    },
    {
      image: ["/team/avatar4.svg"],
      name: ["имя7 фамилия7"],
    },
    {
      image: ["/team/avatar5.svg"],
      name: ["имя8 фамилия8"],
    },
    {
      image: ["/team/avatar6.svg"],
      name: ["имя9 фамилия9"],
    },
    {
      image: ["/team/avatar7.svg"],
      name: ["имя10 фамилия10"],
    },
    {
      image: ["/team/avatar8.svg"],
      name: ["имя11 фамилия11"],
    },
    {
      image: ["/team/avatar9.svg"],
      name: ["имя12 фамилия12"],
    },

  ];

  const teams = chunkArray(teamData, count);

  const teamBlocks = teams.map((team, index) => (
    <Team key={index} team={team}/>
  ));

  return (
    <div
      className="pl-[15px] pr-[19px] pt-[60px] pb-[60px] lg:px-[60px] lg:py-[100px]"
      id="TeamContainer">
      <div>
        <ImageCarusel blocks={teamBlocks}/>
      </div>
    </div>
  );
};

export default TeamContainer;