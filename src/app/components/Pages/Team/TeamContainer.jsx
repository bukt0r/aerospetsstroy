'use client'

import React from "react";
import Team from "./Team";
import ImageCarusel from "@/app/components/ImageCarusel/ImageCarusel";

const TeamContainer = () => {
  const teamData = [
    {
      title: "Lorem ipsum dolor sit amet consectetur",
      text: "Lorem ipsum dolor sit amet consectetur. " +
        "Neque ut auctor ultrices pellentesque elementum quis." +
        " Imperdiet augue nulla orci massa ipsum. Odio enim elit vestibulum puru" +
        "s ullamcorper turpis at ornare dolor. Nibh mi varius nullam pellentesque" +
        " venenatis tortor cum.",
      images: ["/team/avatar1.svg", "/team/avatar2.svg", "/team/avatar3.svg"],
      names: ["имя1 фамилия1", "имя1 фамилия1", "имя1 фамилия1"],
    },
    {
      title: "Заголовок 2",
      text: "Текст для заголовка 2",
      images: ["/team/avatar1.svg", "/team/avatar2.svg", "/team/avatar3.svg"],
      names: ["имя2 фамилия2", "имя2 фамилия2", "имя2 фамилия2"],
    },
    {
      title: "Заголовок 3",
      text: "Текст для заголовка 3",
      images: ["/team/avatar4.svg", "/team/avatar5.svg", "/team/avatar6.svg"],
      names: ["имя3 фамилия3", "имя3 фамилия3", "имя3 фамилия3"],
    },
    {
      title: "Заголовок 4",
      text: "Текст для заголовка 4",
      images: ["/team/avatar7.svg", "/team/avatar8.svg", "/team/avatar9.svg"],
      names: ["имя4 фамилия4", "имя4 фамилия4", "имя4 фамилия4"],
    },
  ];

  // Генерируем массив JSX-компонентов Team
  const teamBlocks = teamData.map((data, index) => (
    <Team key={index} title={data.title} text={data.text} images={data.images} names={data.names} />
  ));

  return (
    <div
      className="pl-[15px] pr-[19px] pt-[60px] pb-[60px]"
      id="TeamContainer">
      <ImageCarusel blocks={teamBlocks}/>
    </div>
  );
};

export default TeamContainer;