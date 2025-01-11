'use client';

import { useRouter } from "next/navigation";

const Vacancies =({vacancies})=>{
  const router = useRouter();

  const handleDetailsClick = (index) => {
    router.push(`/vacancies/${index}`);
  };

  return(
    <div className="mb-[40px] xl:mb-[80px]">

      <div className="flex gap-[20px]">
        {vacancies.map((vacancy, index) => (
          <div
            className="flex flex-col p-[24px] bg-[#FFFFFF] max-xl:w-[80%] w-[30%]"
            key={index}>
            <p className="font-[600] mb-[20px] xl:text-[32px]">{vacancy.mainTitle}</p>
            <p>{vacancy.description1}</p>
            <div className="flex justify-end mt-auto ">
              <button
                onClick={() => handleDetailsClick(vacancy.id)}
                className="mt-[40px] text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl"
              >
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