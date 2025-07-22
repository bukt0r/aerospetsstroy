'use client'

import React from "react";
import { useFirestoreContent } from "@/hooks/useFirestoreContent";

const AboutCompany = () => {
  const { aboutCompanyData } = useFirestoreContent();

  // Don't render if not visible
  if (!aboutCompanyData?.visible) {
    return null;
  }

  return(
    <div
      id="AboutCompany"
      className="flex flex-col lg:flex-row pl-[15px] pr-[19px] pt-[60px] pb-[60px] text-[#FFFFFFCC] bg-[url('/aboutCompanyBackground.svg')] bg-cover bg-center w-full lg:bg-[url('/aboutCompanyFullScreen.svg')] lg:px-[60px] xl:px-[100px] lg:py-[100px] lg:justify-between">
      <div>
        <h2 className="text-[30px] font-semibold mb-[40px] xl:text-[64px] xl:leading-none">{aboutCompanyData?.title}</h2>
      </div>
      <div className="xl:text-[20px] lg:w-[560px]">
        <div className="mb-[36px] ">
          <p>
            {aboutCompanyData?.paragraph1}
          </p>
        </div>

        <div className="mb-[36px]">
          <span>{aboutCompanyData?.subtitle}</span>
          <div className="ml-[24px] lg:ml-[32px]">
            <ul className="list-disc">
              <li>{aboutCompanyData?.row1}</li>
              <li>{aboutCompanyData?.row2}</li>
              <li>{aboutCompanyData?.row3}</li>
              <li>{aboutCompanyData?.row4}</li>
            </ul>
          </div>
        </div>

        <div>
          <p>{aboutCompanyData?.paragraph2}</p>
        </div>
      </div>

    </div>
  );
};

export default AboutCompany;