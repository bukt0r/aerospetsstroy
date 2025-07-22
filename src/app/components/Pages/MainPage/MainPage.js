'use client';

import React, { useState } from "react";
import { useFirestoreContent } from "@/hooks/useFirestoreContent";

const MainPage = () => {
  const { mainPageData, loading } = useFirestoreContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  const defaultData = {
    title: "МЫ СОЗДАЕМ БУДУЩЕЕ",
    subtitle: "полный спектр услуг по строительству",
    email: "info@aeross.ru",
    phone: "+7(931)319-25-05"
  };

  // Use data from Firestore or defaults
  const data = loading ? defaultData : mainPageData;

  return(
    <div
      id="MainPage"
      className="flex flex-col pl-[15px] pr-[19px] pb-[36px] bg-[url('/main/mainBackground.svg')] bg-cover bg-center min-h-screen w-full lg:bg-[url('/main/mainBackgroundFullScreen.svg')] lg:px-[60px] xl:px-[100px] lg:pb-[55px] ">
      <header className="flex justify-between items-center pt-[50px] lg:hidden">
        <div>
          <img onClick={handleLogoClick} className="cursor-pointer" src="/main/logo.svg" alt="logo"/>
        </div>
        <div>
          <img className="h-[28px] w-[32px]" src="/main/menu.svg" alt="menu" onClick={toggleMenu}/>
        </div>
      </header>

      <header className="flex justify-between items-center max-lg:hidden">
        <div>
          <img onClick={handleLogoClick} className="cursor-pointer"  src="/main/logoFullScreen.svg" alt="logo"/>
        </div>
        <div className="flex gap-[20px] text-[20px] text-[#1D1D1DCC]">
          <div><a href="#ObjectsContainer">наши объекты</a></div>
          <div><a href="#Services">услуги</a></div>
          <div><a href="#AboutСompany">о компании</a></div>
          <div><a href="#PartnersContainer">партнеры</a></div>
          <div><a href="#Footer">контакты</a></div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-[50%] h-full bg-white z-50 flex flex-col items-start pt-[50px] px-[20px] gap-[20px]">
          <div className="flex justify-end items-center w-full">
            <div className="text-[40px] cursor-pointer" onClick={toggleMenu}>
              x
            </div>
          </div>
          <div className="flex flex-col items-end w-full gap-[20px]">
            <div><a href="#ObjectsContainer" onClick={toggleMenu}>наши объекты</a></div>
            <div><a href="#Services" onClick={toggleMenu}>услуги</a></div>
            <div><a href="#AboutСompany" onClick={toggleMenu}>о компании</a></div>
            <div><a href="#PartnersContainer" onClick={toggleMenu}>партнеры</a></div>
            <div><a href="#Footer" onClick={toggleMenu}>контакты</a></div>
          </div>
        </div>
      )}

      <div className="mt-[120px]">
        <h1
          className="text-left text-[#111111CC] text-[30px] font-semibold xl:text-[64px] lg:text-[#1D1D1DCC] lg:mb-[20px]">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-[30px] lg:h-[64px] bg-gray-300 rounded w-3/4 mb-2"></div>
            </div>
          ) : (
            data.title
          )}
        </h1>
        <p className="text-left text-[#111111CC] text-[20px] font-helvetica font-[200] xl:text-[32px] lg:text-[#000000B2]">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-[20px] lg:h-[32px] bg-gray-300 rounded w-1/2"></div>
            </div>
          ) : (
            data.subtitle
          )}
        </p>
      </div>
      <div className="flex flex-col mt-auto text-right lg:text-left xl:text-[20px]">
        <span className="text-[#1D1D1DCC] mb-[8px]">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-[20px] bg-gray-300 rounded w-32 ml-auto lg:ml-0"></div>
            </div>
          ) : (
            data.email
          )}
        </span>
        <span className="text-[#1D1D1DCC]">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-[20px] bg-gray-300 rounded w-40 ml-auto lg:ml-0"></div>
            </div>
          ) : (
            data.phone
          )}
        </span>
      </div>

    </div>
  );
};

export default MainPage;
