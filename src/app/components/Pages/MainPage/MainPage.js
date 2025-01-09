const MainPage = () => {
  return(
    <div
      className="flex flex-col pl-[15px] pr-[19px] pb-[36px] bg-[url('/main/mainBackground.svg')] bg-cover bg-center h-[100vh] w-full lg:bg-[url('/main/mainBackgroundFullScreen.svg')] lg:px-[60px] lg:pb-[55px] ">
      <header className="flex justify-between items-center pt-[50px] lg:hidden">
        <div>
          <img src="/main/logo.svg" alt="logo"/>
        </div>
        <div>
          <img className="h-[28px] w-[32px]" src="/main/menu.svg" alt="logo"/>
        </div>
      </header>

      <header className="flex justify-between items-center max-lg:hidden">
        <div>
          <img src="/main/logoFullScreen.svg" alt="logo"/>
        </div>
        <div className="flex gap-[20px] text-[20px] text-[#1D1D1DCC]">
          <div>наши объекты</div>
          <div>услуги</div>
          <div>о компании</div>
          <div>партнеры</div>
          <div>контакты</div>
        </div>
      </header>

      <div className="mt-[120px]">
        <h1 className="text-left text-[#111111CC] text-[30px] font-[500] xl:text-[64px] lg:text-[#1D1D1DCC] lg:mb-[20px]">
          МЫ СОЗДАЕМ БУДУЩЕЕ
        </h1>
        <p className="text-left text-[#111111CC] text-[20px] font-[200] xl:text-[32px] lg:text-[#000000B2]">
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