const Services = () => {
  return(
    <div
      id="Services"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#D3DFEA4D]">
      <div className="mb-[36px]">
        <h2 className="text-[30px] font-[500]">УСЛУГИ</h2>
      </div>
      <div>
        <span className="text-[20px] font-[600]">Проектирование</span>
        <p className="mt-[12px]">
          Нами реализовано большое количество посадочных площадок всех
          типов и сложности на территории РФ и СНГ. Наша компания выполняет
          работы с соблюдением всех норм, применяя самые современные технологии,
          материалы иоборудование.
        </p>
      </div>
      <div>
        <img src="/servicesImg1.svg" alt=""/>
      </div>
      <div>
        <span className="text-[20px] font-[600]">Строительство</span>
        <p className="mt-[12px]">
          Строим высокотехнологичные производственные комплексы в разных отраслях
        </p>
      </div>
      <div>
        <img src="/servicesImg2.svg" alt=""/>
      </div>
    </div>
  );
};

export default Services