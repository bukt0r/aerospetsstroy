const Services = () => {
  return(
    <div
      id="Services"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] text-[#111111CC] bg-[#D3DFEA4D] lg:bg-[#E6ECF4] lg:px-[60px] lg:py-[100px] xl:px-[100px]">
      <div className="mb-[36px]">
        <h2 className="text-[30px] font-semibold xl:text-[64px]">УСЛУГИ</h2>
      </div>
        <div className="lg:flex lg:items-center lg:bg-[url('/services/servicesFullScreenImg2.png')] bg-cover bg-center lg:shadow-[0px_30px_20px_#DFE7F2,0px_-30px_20px_#DFE7F2,20px_0px_20px_#DFE7F2] lg:min-h-[300px] xl:min-h-[470px]">
            <div className="flex lg:w-[50%]"></div>
            <div className="lg:w-[50%]">
                <div className="lg:w-[80%] lg:pl-[30px]">
                    <span className="text-[20px] font-[600] xl:text-[24px]">Строительство</span>
                    <p className="mt-[12px] xl:text-[20px]">
                        Строим высокотехнологичные производственные комплексы в разных отраслях
                    </p>
                </div>
            </div>
        </div>

        <div className="lg:hidden mt-[40px]">
            <img className="shadow-[0px_30px_20px_#DFE7F2,0px_-30px_20px_#DFE7F2,20px_0px_20px_#DFE7F2]" src="/services/servicesImg2.png" alt="pic"/>
        </div>

      <div className="lg:flex lg:items-center lg:bg-[url('/services/servicesFullScreenImg1.png')] bg-cover bg-center lg:shadow-[0px_40px_20px_#D6E1ED,0px_-30px_20px_#DFE7F2,20px_0px_20px_#DFE7F2] lg:min-h-[300px] xl:min-h-[470px] lg:mb-[40px]">
        <div className="flex lg:w-[50%]"></div>
        <div className="lg:w-[50%]">
          <div className="lg:w-[80%] lg:pl-[30px] mt-[40px]">
            <span className="text-[20px] font-[600] xl:text-[24px]">Проектирование</span>
            <p className="mt-[12px] xl:text-[20px]">
              Нами реализовано большое количество посадочных площадок всех
              типов и сложности на территории РФ и СНГ. Наша компания выполняет
              работы с соблюдением всех норм, применяя самые современные технологии,
              материалы и оборудование.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:hidden mt-[40px] mb-[60px]">
        <img className="shadow-[0px_30px_20px_#DFE7F2,0px_-30px_20px_#DFE7F2,20px_0px_20px_#DFE7F2]" src="/services/servicesImg1.png" alt="pic"/>
      </div>


    </div>
  );
};

export default Services