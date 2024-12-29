'use client'

const Objects = ({project, description, address, image}) => {

  return(
    <div
      className="flex flex-col text-[#111111CC]">
      <div>
        <h2 className="text-[30px] font-[500]">НАШИ ОБЪЕКТЫ</h2>
      </div>
      <div className="mt-[32px] mb-[12px]">
        <p className="font-[600]">{project}</p>
      </div>
      <div>
        <p>{description}</p>
      </div>
      <div className="mt-[18px] mb-[32px]">
        <div className="flex">
          <img src="/geolocation.svg" alt="pic"/>
          <p className="text-[#3E3F4080] text-[14px]">{address}</p>
        </div>
        <p className="text-[#3E3F4080] underline">показать на карте</p>
      </div>
      <div className="mb-[48px]">
        <img src={image} alt="pic"/>
      </div>
    </div>
  );
};

export default Objects