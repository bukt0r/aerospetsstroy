const Specialization = () => {
  return(
    <div
      id="Specialization"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] text-[#FFFFFFCC] bg-[url('/specializationBackground.svg')] bg-cover bg-center h-[100vh] w-full">
      <div>
        <h2 className="text-[30px] font-[600] mb-[40px]">СПЕЦИАЛИЗАЦИЯ</h2>
      </div>
      <div className="mb-[36px]">
        <p>
          ООО «АэроСпецСтрой» специализируется на промышленном строительстве.
          Компания выполняет подрядные работы по созданию объектов железнодорожной и
          авиационной инфраструктуры, водоотводных сооружений и гражданского строительства.
        </p>
      </div>

      <div className="mb-[36px]">
        <span>Виды услуг</span>
        <p className="mt-[24px]">
          Строительство и реконструкция капитальных и некапитальных объектов;
          Земляные работы и устройство свайных оснований;
          Монтаж железобетонных и металлических конструкций;
          Устройство инженерных коммуникаций;
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
  );
};

export default Specialization;