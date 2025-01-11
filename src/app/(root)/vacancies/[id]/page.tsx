'use client'

import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {vacanciesData} from "@/data/vacanciesData";

export default function Vacancies () {

  const {id} = useParams<{id:string}>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const vacancy = vacanciesData[+id]

  const openModal = () => {
    setIsModalOpen(true); // Открываем модальное окно
    setTimeout(() => {
      setIsModalOpen(false); // Закрываем через 3 секунды
    }, 3000);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#F2F5F9] text-[#111111CC] bg-no-repeat bg-contain lg:bg-[url('/vacanciesFullScreen.svg')] lg:px-[60px] xl:px-[100px] xl:py-[100px]">
      <div className="mb-[40px]">
        <h2 className="text-[30px] font-[500] xl:text-[64px] xl:leading-none">ВАКАНСИИ</h2>
      </div>
      <div className="relative px-[30px] py-[60px] bg-[#FFFFFF]">
        <div className="flex justify-between lg:items-center mb-[20px]">
          <div>
            <p className="font-[600] text-[20px] xl:text-[32px]">{vacancy.mainTitle}</p>
          </div>
          <div>
            <button
              onClick={handleBack}
              className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl xl:text-[20px] hover:bg-[#6095AB99] hover:text-[#FFFFFF] hover:border-none"
            >
              закрыть
            </button>
          </div>
        </div>
        <div className="mb-[30px]">
          <p className="xl:text-[20px]">{vacancy.shortInfo}</p>
        </div>
        <div className="mb-[30px]">
          <p className="font-[600]">{vacancy.title1}</p>
          <p className="xl:text-[20px]">{vacancy.description1}</p>
        </div>
        <div className="mb-[30px]">
          <p className="font-[600]">{vacancy.title2}</p>
          <p className="xl:text-[20px]">{vacancy.description2}</p>
        </div>
        <div className="mb-[60px]">
          <p className="font-[600]">{vacancy.title3}</p>
          <p className="xl:text-[20px]">{vacancy.description3}</p>
        </div>
        <div>
          <button
            onClick={openModal}
            className="text-[#FFFFFF] px-[21px] py-[4px] xl:px-[40px] bg-[#6095AB] border-[1px] rounded-2xl xl:text-[20px] hover:bg-[#6095AB99]">
            отправить резюме
          </button>
        </div>
        {/* Модальное окно */}
        {isModalOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FFFFFF] bg-opacity-30 z-50">
            <div
              className=" flex h-[100%] w-[100%] text-[#6095AB] justify-center items-center bg-[#FFFFFF] bg-opacity-90 text-[24px] font-semibold rounded-lg shadow-lg"
            >
              Резюме отправлено
            </div>
          </div>
        )}
      </div>
    </div>
  );
};