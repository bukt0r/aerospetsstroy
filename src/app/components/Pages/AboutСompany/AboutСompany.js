const AboutCompany = ({title, paragraph1, subtitle, row1, row2, row3, row4, paragraph2}) => {
  return(
    <div
      id="AboutCompany"
      className="flex flex-col lg:flex-row pl-[15px] pr-[19px] pt-[60px] pb-[60px] text-[#FFFFFFCC] bg-[url('/aboutCompanyBackground.svg')] bg-cover bg-center w-full lg:bg-[url('/aboutCompanyFullScreen.svg')] lg:px-[60px] xl:px-[100px] lg:py-[100px] lg:justify-between">
      <div>
        <h2 className="text-[30px] font-semibold mb-[40px] xl:text-[64px] xl:leading-none">{title}</h2>
      </div>
      <div className="xl:text-[20px] lg:w-[560px]">
        <div className="mb-[36px] ">
          <p>
            {paragraph1}
          </p>
        </div>

        <div className="mb-[36px]">
          <span>{subtitle}</span>
          <div className="ml-[24px] lg:ml-[32px]">
            <ul className="list-disc">
              <li>{row1}</li>
              <li>{row2}</li>
              <li>{row3}</li>
              <li>{row4}</li>
            </ul>
          </div>
        </div>

        <div>
          <p>{paragraph2}</p>
        </div>
      </div>

    </div>
  );
};

export default AboutCompany;