const Vacancies =({vacancies})=>{
  return(
    <div className="mb-[40px] xl:mb-[80px]">

      <div className="flex gap-[20px]">
        {vacancies.map((vacancy, index) => (
          <div
            className="p-[24px] bg-[#FFFFFF] max-xl:w-[80%]"
            key={index}>
            <p className="font-[600] mb-[20px] xl:text-[32px]">{vacancy.title}</p>
            <p>{vacancy.description}</p>
            <div className="flex justify-end mt-[36px]">
              <button className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl">
                подробнее
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Vacancies;