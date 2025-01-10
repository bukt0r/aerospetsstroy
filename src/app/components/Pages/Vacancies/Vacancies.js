const Vacancies =()=>{
  return(
    <div
      id="Vacancies"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#F2F5F9] text-[#111111CC] lg:bg-[url('/vacanciesFullScreen.svg')] lg:px-[60px] xl:px-[100px] xl:py-[100px]">
      <div>
        <h2 className="text-[30px] font-[500] mb-[8px] xl:text-[64px] xl:leading-none">ВАКАНСИИ</h2>
      </div>
      <div>
        <p className="xl:text-[32px]">Открытых вакансий нет</p>
      </div>
    </div>
  );
};

export default Vacancies;