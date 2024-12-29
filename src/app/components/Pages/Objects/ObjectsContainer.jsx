'use client'

import React from "react";
import Objects from "./Objects";
import ImageCarusel from "@/app/components/ImageCarusel/ImageCarusel";

const ObjectsContainer = () => {
  const projectData = [
    {
      project: "Пункт технического осмотра станции Анапа Северо-Кавказской железной дороги",
      description: "Выполнение СМР на строительстве объекта: «ПТО на станции Анапа», включая полный комплекс работ по вертикальной планировке и устройству свайного фундамента, вынос сетей связи и СЦБ из зоны строительства и устройство сетей ЭС, устройство наружных сетей ТС, ВиК , устройство железобетонных буронабивных свай, монтаж ворот и звукоизолирующего шумозащитного ограждения. Краснодарский край, станция Анапа",
      address: "г. Анапа улица Дмитрия Орехова, 2",
      image: "/objects/objects1.svg",
    },
    {
      project: "Строительство вертолётной площадки, дороги и рулёжные дороги",
      description: "Выполнение полного комплекса СМР по инженерной инфраструктуре вертолетной площадки с рулёжными дорожками и дорогами из ж/б конструкций. Краснодарский край, с. Прасковеевка",
      address: "с. Прасковеевка, ул. Партизанская, 12",
      image: "/objects/objects2.svg",
    },
    {
      project: "Строительство шумозащитных экранов",
      description: "Строительство второго пути на участке Выселки (вкл.) Козырьки (искл.)» Комплекс работ по устройству монолитных ростверков и монтажу шумозащитных экранов. Краснодарский край, Северо-Кавказская ж.д . Выселки Козырьки",
      address: "Кореновское городское поселение",
      image: "/objects/objects3.svg",
    },
    {
      project: "Строительство причала",
      description: "Выполнение комплекса СМР по объекту № 112, включая комплекс бетонных работ по причалу. Краснодарский край, г. Геленджик",
      address: "г. Геленджик, Приморский бульвар",
      image: "/objects/objects4.svg",
    },
    {
      project: "Строительство вертолетной площадки",
      description: "Выполнение комплекса СМР по объекту № 2 и инженерной инфраструктуры вертолётной площадки с рулёжными дорожками и дорогами из ж/б конструкций. Краснодарский край, пос. Дивноморское",
      address: "пос. Дивноморское, ул. Кирова",
      image: "/objects/objects5.svg",
    },
    {
      project: "Строительство прудов испарителей",
      description: "Выполнение полного комплекса СМР по устройству прудов испарителей. Краснодарский край, г-к Анапа",
      address: "г. Анапа, площадь Советов",
      image: "/objects/objects6.svg",
    },
    {
      project: "Строительство «Терминально логистического центра»",
      description: "Комплекс работ по вертикальной планировке на объекте «ТЛЦ. КТ Усады» Городской округ Домодедово, Московская область.",
      address: "деревня Глотаево",
      image: "/objects/objects7.svg",
    },
    {
      project: "Строительство «Тermoland » ТРЦ OZ MALL",
      description: "Полный комплекс работ по демонтажу и кладке перегородок из кирпича и керамзитобетонных блоков, монтаж стоек фахверка и металлоконструкций. Краснодарский край, г. Краснодар",
      address: "г. Краснодар, ул. Крылатая, 2",
      image: "/objects/objects8.svg",
    },
    {
      project: "Строительство коттеджного комплекса",
      description: "Полный комплекс работ по устройству ж.б. конструкций беседок, навесов, детского бассейна, основания террасы и основания под забор в составе реконструкции коттеджного комплекса. Краснодарский край, г. Адлер",
      address: "г. Анапа, микрорайон Центральный",
      image: "/objects/objects9.svg",
    },
    {
      project: "Строительство коттеджного комплекса",
      description: "Полный комплекс работ по устройству ж.б. конструкций беседок, навесов, детского бассейна, основания террасы и основания под забор в составе реконструкции коттеджного комплекса. Краснодарский край, г. Адлер",
      address: "Село Береговое, ул. Мира",
      image: "/objects/objects10.svg",
    },
  ];

  // Генерируем массив JSX-компонентов Team
  const projectBlocks = projectData.map((data, index) => (
    <Objects key={index} project={data.project} description={data.description} address={data.address} image={data.image} />
  ));

  return (
    <div className="pl-[15px] pr-[19px] pt-[60px] pb-[60px]"
      id="ObjectsContainer">
      <ImageCarusel blocks={projectBlocks}/>
    </div>
  );
};

export default ObjectsContainer;