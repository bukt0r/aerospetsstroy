const MainPage = () => {
  return(
    <div className="flex flex-col pl-[15px] pr-[19px] pt-[50px] pb-[36px] bg-[url('/mainBackground.svg')] bg-cover bg-center h-[100vh] w-full">
      <footer className="flex justify-between items-center">
        <div>
          <img src="/logo.svg" alt="logo"/>
        </div>
        <div>
          <img className="h-[28px] w-[32px]" src="/menu.svg" alt="logo"/>
        </div>
      </footer>

      <div className="mt-[120px]">
        <h1 className="text-left text-[#111111CC] text-[30px] font-[500]">
          МЫ СОЗДАЕМ БУДУЩЕЕ
        </h1>
        <p className="text-left text-[#111111CC] text-[20px] font-[200]">
          полный спектр услуг по проектированию и строительству
        </p>
      </div>
      <div className="flex flex-col mt-auto text-right">
        <span className="text-[#1D1D1DCC] mb-[8px]">info@aeross.ru</span>
        <span className="text-[#1D1D1DCC]">+7(931)319-25-05</span>
      </div>

    </div>
  );
};

export default MainPage;