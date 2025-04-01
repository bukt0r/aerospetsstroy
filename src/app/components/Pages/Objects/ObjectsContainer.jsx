'use client'

import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import Objects from "./Objects";
import ImageCarusel from "@/app/components/ImageCarusel/ImageCarusel";
import chunkArray from "@/app/components/Helper/chunkArray";

const ObjectsContainer = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const count = isLargeScreen ? 4 : 1;
  const projectData = [
    {
      title: "Пункт технического осмотра станции Анапа Северо-Кавказской железной дороги",
      description: "Выполнение СМР на строительстве объекта: «ПТО на станции Анапа», включая полный комплекс работ по вертикальной планировке и устройству свайного фундамента, вынос сетей связи и СЦБ из зоны строительства и устройство сетей ЭС, устройство наружных сетей ТС, ВиК , устройство железобетонных буронабивных свай, монтаж ворот и звукоизолирующего шумозащитного ограждения. Краснодарский край, станция Анапа",
      address: "г. Анапа улица Дмитрия Орехова, 2",
      adressUrl: "",
      image: "/objects/objects1-full.svg",
      images: ["/objects/images/1-1.svg","/objects/images/1-2.svg","/objects/images/1-3.svg","/objects/images/1-4.svg","/objects/images/1-5.svg","/objects/images/1-6.svg","/objects/images/1-7.svg","/objects/images/1-8.svg","/objects/images/1-9.svg","/objects/images/1-10.svg"],
    },
    {
      title: "Строительство вертолётной площадки, дороги и рулёжные дороги",
      description: "Выполнение полного комплекса СМР по инженерной инфраструктуре вертолетной площадки с рулёжными дорожками и дорогами из ж/б конструкций. Краснодарский край, с. Прасковеевка",
      address: "с. Прасковеевка, ул. Партизанская, 12",
      adressUrl: "",
      image: "/objects/objects2-full.svg",
      images: [],
    },
    {
      title: "Строительство шумозащитных экранов",
      description: "Строительство второго пути на участке Выселки (вкл.) Козырьки (искл.)» Комплекс работ по устройству монолитных ростверков и монтажу шумозащитных экранов. Краснодарский край, Северо-Кавказская ж.д . Выселки Козырьки",
      address: "Кореновское городское поселение",
      adressUrl: "",
      image: "/objects/objects3-full.svg",
      images: ["/objects/images/3-1.svg",],
    },
    {
      title: "Строительство причала",
      description: "Выполнение комплекса СМР по объекту № 112, включая комплекс бетонных работ по причалу. Краснодарский край, г. Геленджик",
      address: "г. Геленджик, Приморский бульвар",
      adressUrl: "",
      image: "/objects/objects4-full.svg",
      images: ["/objects/images/4-1.svg"],
    },
    {
      title: "Строительство вертолетной площадки",
      description: "Выполнение комплекса СМР по объекту № 2 и инженерной инфраструктуры вертолётной площадки с рулёжными дорожками и дорогами из ж/б конструкций. Краснодарский край, пос. Дивноморское",
      address: "пос. Дивноморское, ул. Кирова",
      adressUrl: "",
      image: "/objects/objects5-full.svg",
      images: ["/objects/images/5-1.svg", "/objects/images/5-2.svg"],
    },
    {
      title: "Строительство прудов испарителей",
      description: "Выполнение полного комплекса СМР по устройству прудов испарителей. Краснодарский край, г-к Анапа",
      address: "г. Анапа, площадь Советов",
      adressUrl: "",
      image: "/objects/objects6-full.svg",
      images: ["/objects/images/6-1.svg", "/objects/images/6-2.svg","/objects/images/6-3.svg", "/objects/images/6-4.svg"],
    },
    {
      title: "Строительство «Терминально логистического центра»",
      description: "Комплекс работ по вертикальной планировке на объекте «ТЛЦ. КТ Усады» Городской округ Домодедово, Московская область.",
      address: "деревня Глотаево",
      adressUrl: "",
      image: "/objects/objects7-full.svg",
      images: ["/objects/images/7-1.svg", "/objects/images/7-2.svg","/objects/images/7-3.svg", "/objects/images/7-4.svg"],
    },
    {
      title: "Строительство «Тermoland » ТРЦ OZ MALL",
      description: "Полный комплекс работ по демонтажу и кладке перегородок из кирпича и керамзитобетонных блоков, монтаж стоек фахверка и металлоконструкций. Краснодарский край, г. Краснодар",
      address: "г. Краснодар, ул. Крылатая, 2",
      adressUrl: "",
      image: "/objects/objects8-full.svg",
      images: ["/objects/images/8-1.svg", "/objects/images/8-2.svg","/objects/images/8-3.svg"],
    },
    {
      title: "Строительство коттеджного комплекса",
      description: "Полный комплекс работ по устройству ж.б. конструкций беседок, навесов, детского бассейна, основания террасы и основания под забор в составе реконструкции коттеджного комплекса. Краснодарский край, г. Адлер",
      address: "г. Анапа, микрорайон Центральный",
      adressUrl: "",
      image: "/objects/objects9-full.svg",
      images: ["/objects/images/9-1.svg", "/objects/images/9-2.svg","/objects/images/9-3.svg"],
    },
    {
      title: "Строительство коттеджного комплекса",
      description: "Полный комплекс работ по устройству ж.б. конструкций беседок, навесов, детского бассейна, основания террасы и основания под забор в составе реконструкции коттеджного комплекса. Краснодарский край, г. Адлер",
      address: "Село Береговое, ул. Мира",
      adressUrl: "",
      image: "/objects/objects10-full.svg",
      images: ["/objects/images/10-1.svg",],
    },
  ];

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
        <h2 className="text-[30px] font-semibold xl:text-[64px]">НАШИ ОБЪЕКТЫ</h2>
      </div>
      <ImageCarusel blocks={projectBlocks}/>
    </div>
  );
};

export default ObjectsContainer;