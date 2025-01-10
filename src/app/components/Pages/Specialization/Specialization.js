const Specialization = () => {
  return(
    <div
      id="Specialization"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] text-[#FFFFFFCC] bg-[url('/specializationBackground.svg')] bg-cover bg-center h-[100vh] w-full lg:bg-[url('/specializationBackgroundFullScreen.svg')] lg:flex-row lg:pt-[100px] lg:px-[60px] xl:px-[100px] lg:justify-between">
      <div className="">
        <h2 className="text-[30px] font-[600] mb-[40px] xl:text-[64px] xl:leading-none">СПЕЦИАЛИЗАЦИЯ</h2>
      </div>
      <div className="xl:text-[20px] lg:w-[560px]">
        <div className="mb-[36px] lg:pt-[10px] xl:mb-[60px]">
          <p>
            ООО «АэроСпецСтрой» специализируется на промышленном строительстве.
            Компания выполняет подрядные работы по созданию объектов железнодорожной и
            авиационной инфраструктуры, водоотводных сооружений и гражданского строительства.
          </p>
        </div>

        <div className="mb-[36px]">
          <span>Виды услуг</span>
          <p className="mt-[24px]">
            Строительство и реконструкция капитальных и некапитальных объектов;<br/>
            Земляные работы и устройство свайных оснований;<br/>
            Монтаж железобетонных и металлических конструкций;<br/>
            Устройство инженерных коммуникаций;<br/>
            Пусконаладочные работы и ввод объектов в эксплуатацию.
          </p>
        </div>

        <div>
          <span>Приоритеты компании</span>
          <p className="mt-[24px]">
            Оптимизация проектных решений;
            Соблюдение сроков выполнения работ;Высокий уровень качества и безопасности строительства.
            Такой подход позволяет минимизировать риски и гарантировать надежную эксплуатацию построенных объектов.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Specialization;