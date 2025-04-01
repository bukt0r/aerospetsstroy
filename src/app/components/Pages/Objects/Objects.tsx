'use client'

import React, {useState} from "react";
import ImageCarusel from "@/app/components/ImageCarusel/ImageCarusel";
import chunkArray from "@/app/components/Helper/chunkArray";
import MapComponent from "@/app/components/Map/MapComponent";

interface Project {
  id: number;
  title: string;
  description: string;
  address: string;
  adressUrl: string;
  image: string;
  images: string[];
}

const Objects: React.FC<{ projects: Project[]; addresses: string[], titles: string[] }> = ({ projects, addresses, titles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeElement, setActiveElement] = useState<number>(0);

  const openModal = (index: number ) => {
    setIsModalOpen(true);
    setActiveElement(index);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isModalMapOpen, setIsModalMapOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModalMap = (project: Project) => {
    setSelectedProject(project);
    setIsModalMapOpen(true);
  };

  const sliderCount = 4;
  const sliderImages:string[][] = chunkArray(projects[activeElement].images ,sliderCount);
  const slider = sliderImages.map((obj, sliderIndex) => (
    <div
      key={sliderIndex}
      className="flex gap-[20px] mb-[60px]">
      {obj.map((image:string, index:number)=> (
        <div key={index}>
          <img className="max-w-[100px]" key={index} src={image} alt="img"/>
        </div>
      ))}
    </div>
  ))

  return (
    <div className="relative xl:mb-[20px]">
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
                 onClick={() => openModalMap(obj)}
              >
                показать на карте</p>
            </div>
            <div className="mb-[48px] max-w-[300px]">
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
                <img src={projects[0].image} alt="pic" className="max-w-[250px]"/>
              </div>
              <div className="mb-[10px]">
                <p className="font-[600] text-[#111111CC]">{projects[0].title}</p>
              </div>
              <div className="flex items-end">
                <div>
                  <div className="flex">
                    <img src="/geolocation.svg" alt="pic"/>
                    <p className="text-[#3E3F4080] text-[14px]">{projects[0].address}</p>
                  </div>
                  <a className="text-[#3E3F4080] underline cursor-pointer"
                     onClick={() => openModalMap(projects[0])}
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
                <img src={projects[2].image} alt="pic" className="max-w-[250px]"/>
              </div>
              <div className="mb-[10px]">
                <p className="font-[600] text-[#111111CC]">{projects[2].title}</p>
              </div>
              <div className="flex items-end">
                <div>
                  <div className="flex">
                    <img src="/geolocation.svg" alt="pic"/>
                    <p className="text-[#3E3F4080] text-[14px]">{projects[2].address}</p>
                  </div>
                  <a className="text-[#3E3F4080] underline cursor-pointer"
                     onClick={() => openModalMap(projects[2])}
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
                <img src={projects[1].image} alt="pic" className="max-w-[250px]"/>
              </div>
              <div className="mb-[10px]">
                <p className="font-[600] text-[#111111CC]">{projects[1].title}</p>
              </div>
              <div className="flex items-end">
                <div>
                  <div className="flex">
                    <img src="/geolocation.svg" alt="pic"/>
                    <p className="text-[#3E3F4080] text-[14px]">{projects[1].address}</p>
                  </div>
                  <a className="text-[#3E3F4080] underline cursor-pointer"
                     onClick={() => openModalMap(projects[1])}
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
            {projects[3] && (<div className="flex justify-start">
              <div className="flex flex-col">
                <div className="mb-[20px]">
                  <img src={projects[3].image} alt="pic" className="max-w-[250px]"/>
                </div>
                <div className="mb-[10px]">
                  <p className="font-[600] text-[#111111CC]">{projects[3].title}</p>
                </div>
                <div className="flex items-end">
                  <div>
                    <div className="flex">
                      <img src="/geolocation.svg" alt="pic"/>
                      <p className="text-[#3E3F4080] text-[14px]">{projects[3].address}</p>
                    </div>
                    <a className="text-[#3E3F4080] underline cursor-pointer"
                       onClick={() => openModalMap(projects[3])}
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
        <div className="max-xl:hidden absolute inset-0 h-[80vh] flex items-center justify-center bg-[#FFFFFF] z-50">
          <div className=" flex flex-col h-[100%] w-[100%] bg-[#FFFFFF] py-[30px] pl-[60px] pr-[28px] shadow-xl drop-shadow-[10px_4px_6px_#3C72AE40]">
            <div className="flex mb-[30px] gap-[30px]">
              <div className="flex items-center w-[25%]">
                <img src={projects[activeElement].image} alt="pic" className="max-w-[250px]"/>
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
                <div className="mb-[30px]" >
                  <p>{projects[activeElement].description}</p>
                </div>
                <div>
                  <div className="flex">
                    <img src="/geolocation.svg" alt="pic"/>
                    <p className="text-[#3E3F4080] text-[14px]">{projects[activeElement].address}</p>
                  </div>
                  <a className="text-[#3E3F4080] underline cursor-pointer"
                     onClick={() => openModalMap(projects[activeElement])}
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
      {isModalMapOpen && (
          <div className="absolute inset-0 h-[80vh] flex items-center justify-center bg-[#FFFFFF] z-50">
            <div className=" flex flex-col items-center justify-center h-[100%] w-[100%] bg-[#FFFFFF] py-[30px] px-[30px] shadow-xl drop-shadow-[10px_4px_6px_#3C72AE40]">
              <button
                  onClick={() => setIsModalMapOpen(false)}
                  className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl self-end absolute top-[40px] right-[30px]"
              >
                закрыть
              </button>
              <div className="[filter:grayscale(0.5)] border-[1px] border-black w-[90%] h-[60%]">
                <MapComponent addresses={addresses} titles={titles} centerAddress={selectedProject?.address} />
              </div>
            </div>
          </div>
      )}
    </div>);
};

export default Objects