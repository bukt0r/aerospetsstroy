'use client'

const Objects = ({project}) => {

  return (
    <div className="">
      {project.map((obj, index) => (
      <div key={index}
           className="inline-flex flex-col">

        <div className="xl:hidden">
          <div className="mt-[32px] mb-[12px]">
            <p className="font-[600] text-[#111111CC]">{obj.title}</p>
          </div>
          <div>
            <p>{obj.description}</p>
          </div>
          <div className="mt-[18px] mb-[32px]">
            <div className="flex">
              <img src="/geolocation.svg" alt="pic"/>
              <p className="text-[#3E3F4080] text-[14px]">{obj.address}</p>
            </div>
            <p className="text-[#3E3F4080] underline">показать на карте</p>
          </div>
          <div className="mb-[48px]">
            <img src={obj.image} alt="pic"/>
          </div>
        </div>

        <div className="flex max-xl:hidden ">
          <div className="flex flex-col w-full">
            <div className="mb-[48px]">
              <img src={obj.image} alt="pic"/>
            </div>
            <div className="mt-[20px] mb-[12px]">
              <p className="font-[600] text-[#111111CC]">{obj.title}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="flex">
                  <img src="/geolocation.svg" alt="pic"/>
                  <p className="text-[#3E3F4080] text-[14px]">{obj.address}</p>
                </div>
                <p className="text-[#3E3F4080] underline">показать на карте</p>
              </div>
              <div>
                <button className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl">подробнее
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    ))
  }
    </div>);
};

export default Objects