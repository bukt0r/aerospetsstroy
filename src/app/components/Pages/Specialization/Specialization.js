const Specialization = ({ title, description, subtitle1, description1, subtitle2, description2}) => {
  return(
    <div
      id="Specialization"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] text-[#FFFFFFCC] bg-[url('/specializationBackground.svg')] bg-cover bg-center w-full lg:bg-[url('/specializationBackgroundFullScreen.svg')] lg:flex-row lg:pt-[100px] lg:pl-[60px] 2xl:px-[100px] lg:justify-between">
      <div className="">
        <h2 className="text-[30px] font-semibold mb-[40px] xl:text-[64px] xl:leading-none">{title}</h2>
      </div>
      <div className="xl:text-[20px] lg:w-[560px]">
        <div className="mb-[36px] lg:pt-[10px] xl:mb-[60px]">
          <p>
            {description}
          </p>
        </div>

        <div className="mb-[36px]">
          <span>{subtitle1}</span>
          <p className="mt-[24px]">
            {description1}
          </p>
        </div>

        <div>
          <span>{subtitle2}</span>
          <p className="mt-[24px]">
            {description2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Specialization;