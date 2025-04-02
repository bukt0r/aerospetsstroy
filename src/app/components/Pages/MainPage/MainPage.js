'use client'

import React, { useState } from 'react';

const MainPage = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return(
    <div
      id="MainPage"
      className="flex flex-col pl-[15px] pr-[19px] pb-[36px] bg-[url('/main/mainBackground.svg')] bg-cover bg-center h-[100vh] w-full lg:bg-[url('/main/mainBackgroundFullScreen.svg')] lg:px-[60px] xl:px-[100px] lg:pb-[55px] ">
      <header className="flex justify-between items-center pt-[50px] lg:hidden">
        <div>
          <img onClick={() => window.location.reload()} className="cursor-pointer" src="/main/logo.svg" alt="logo"/>
        </div>
        <div>
          <img className="h-[28px] w-[32px]" src="/main/menu.svg" alt="menu" onClick={toggleMenu}/>
        </div>
      </header>

      <header className="flex justify-between items-center max-lg:hidden">
        <div>
          <img onClick={() => window.location.reload()} className="cursor-pointer"  src="/main/logoFullScreen.svg" alt="logo"/>
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
          МЫ СОЗДАЕМ БУДУЩЕЕ
        </h1>
        <p className="text-left text-[#111111CC] text-[20px] font-helvetica font-[200] xl:text-[32px] lg:text-[#000000B2]">
          полный спектр услуг по проектированию и строительству
        </p>
      </div>
      <div className="flex flex-col mt-auto text-right lg:text-left xl:text-[20px]">
        <span className="text-[#1D1D1DCC] mb-[8px]">info@aeross.ru</span>
        <span className="text-[#1D1D1DCC]">+7(931)319-25-05</span>
      </div>

    </div>
  );
};

export default MainPage;