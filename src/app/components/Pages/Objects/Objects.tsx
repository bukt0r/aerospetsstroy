'use client'

import React, {useState} from "react";
import ImageCarusel from "@/app/components/ImageCarusel/ImageCarusel";
import chunkArray from "@/app/components/Helper/chunkArray";

interface Project {
  id: number;
  title: string;
  description: string;
  address: string;
  adressUrl: string;
  image: string;
  images: string[];
}

const Objects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeElement, setActiveElement] = useState<number>(0);

  const openModal = (index: number ) => {
    setIsModalOpen(true);
    setActiveElement(index);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const sliderCount = 4;
  const sliderImages:string[][] = chunkArray(projects[activeElement].images ,sliderCount);
  const slider = sliderImages.map((obj, sliderIndex) => (
    <div
      key={sliderIndex}
      className="flex gap-[20px] mb-[60px]">
      {obj.map((image:string, index:number)=> (
        <div key={index}>
          <img className="" key={index} src={image} alt="img"/>
        </div>
      ))}
    </div>
  ))
  console.log('!!!!!', slider)

  return (
    <div className="relative xl:mb-[100px]">
      {projects.map((obj, index) => (
        <div key={index}>
          <div className="xl:hidden">
            <div className="mt-[32px] mb-[12px]">
              <p className="font-[600] text-[#111111CC]">{obj.title}</p>
            </div>
            <div>
              <p>{obj.description}</p>
            </div>
            <div className="mt-[18px] mb-[32px]">
              <div className="flex">
                <img src="/geolocation.svg" alt="pic"/>
                <p className="text-[#3E3F4080] text-[14px]">{obj.address}</p>
              </div>
              <p className="text-[#3E3F4080] underline cursor-pointer"
                 onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(obj.address)}`, '_blank')}
              >
                показать на карте</p>
            </div>
            <div className="mb-[48px]">
              <img src={obj.image} alt="pic"/>
            </div>
          </div>
        </div>
      ))
      }


      <div className="max-xl:hidden">
        <div className="flex max-xl:hidden gap-[20px]">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col w-full">
              <div className="mb-[20px]">
                <img src={projects[0].image} alt="pic"/>
              </div>
              <div className="mb-[10px]">
                <p className="font-[600] text-[#111111CC]">{projects[0].title}</p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex">
                    <img src="/geolocation.svg" alt="pic"/>
                    <p className="text-[#3E3F4080] text-[14px]">{projects[0].address}</p>
                  </div>
                  <a className="text-[#3E3F4080] underline cursor-pointer"
                     onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(projects[0].address)}`, '_blank')}
                  >
                    показать на карте</a>
                </div>
                <div>
                  <button
                    onClick={()=>openModal(0)}
                    className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl"
                  >
                    подробнее
                  </button>
                </div>
              </div>
            </div>
            {projects[2] && (<div className="flex flex-col w-full">
              <div className="mb-[20px]">
                <img src={projects[2].image} alt="pic"/>
              </div>
              <div className="mb-[10px]">
                <p className="font-[600] text-[#111111CC]">{projects[2].title}</p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex">
                    <img src="/geolocation.svg" alt="pic"/>
                    <p className="text-[#3E3F4080] text-[14px]">{projects[2].address}</p>
                  </div>
                  <a className="text-[#3E3F4080] underline cursor-pointer"
                     onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(projects[2].address)}`, '_blank')}
                  >
                    показать на карте</a>
                </div>
                <div>
                  <button
                    onClick={()=>openModal(2)}
                    className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl"
                  >
                    подробнее
                  </button>
                </div>
              </div>
            </div>)}
          </div>

          <div>
            {projects[1] && (<div className="flex flex-col w-full mb-[85px]">
              <div className="mb-[20px]">
                <img src={projects[1].image} alt="pic"/>
              </div>
              <div className="mb-[10px]">
                <p className="font-[600] text-[#111111CC]">{projects[1].title}</p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex">
                    <img src="/geolocation.svg" alt="pic"/>
                    <p className="text-[#3E3F4080] text-[14px]">{projects[1].address}</p>
                  </div>
                  <a className="text-[#3E3F4080] underline cursor-pointer"
                     onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(projects[1].address)}`, '_blank')}
                  >
                    показать на карте</a>
                </div>
                <div>
                  <button
                    onClick={()=>openModal(1)}
                    className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl"
                  >
                    подробнее
                  </button>
                </div>
              </div>
            </div>)}
            {projects[3] && (<div className="flex justify-end">
              <div className="flex flex-col">
                <div className="mb-[20px]">
                  <img src={projects[3].image} alt="pic"/>
                </div>
                <div className="mb-[10px]">
                  <p className="font-[600] text-[#111111CC]">{projects[3].title}</p>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex">
                      <img src="/geolocation.svg" alt="pic"/>
                      <p className="text-[#3E3F4080] text-[14px]">{projects[3].address}</p>
                    </div>
                    <a className="text-[#3E3F4080] underline cursor-pointer"
                       onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(projects[3].address)}`, '_blank')}
                    >
                      показать на карте</a>
                  </div>
                  <div>
                    <button
                      onClick={()=>openModal(3)}
                      className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl"
                    >
                      подробнее
                    </button>
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="max-xl:hidden absolute inset-0 flex items-center justify-center bg-[#FFFFFF] z-50">
          <div className=" flex flex-col h-[100%] w-[100%] bg-[#FFFFFF] py-[60px] pl-[60px] pr-[28px] shadow-xl drop-shadow-[10px_4px_6px_#3C72AE40]">
            <div className="flex mb-[60px] gap-[60px]">
              <div className="w-full">
                <img src={projects[activeElement].image} alt="pic"/>
              </div>
              <div className="flex flex-col w-[70%]">
                <div className="ml-auto mb-[44px]">
                  <button
                    onClick={closeModal}
                    className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl xl:text-[20px] hover:bg-[#6095AB99] hover:text-[#FFFFFF] hover:border-none"
                  >
                    закрыть
                  </button>
                </div>
                <div className="mb-[18px]">
                  <p>{projects[activeElement].title}</p>
                </div>
                <div className="mb-[80px]" >
                  <p>{projects[activeElement].description}</p>
                </div>
                <div>
                  <div className="flex">
                    <img src="/geolocation.svg" alt="pic"/>
                    <p className="text-[#3E3F4080] text-[14px]">{projects[activeElement].address}</p>
                  </div>
                  <a className="text-[#3E3F4080] underline cursor-pointer"
                     onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(projects[activeElement].address)}`, '_blank')}
                  >
                    показать на карте</a>
                </div>
              </div>
            </div>
            <div>
              {/*@typescript-eslint/ban-ts-comment*/}
              <ImageCarusel blocks={slider}/>
            </div>
          </div>
        </div>
      )}
    </div>);
};

export default Objects