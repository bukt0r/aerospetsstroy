'use client'

const Objects = ({projects}) => {
  return (
    <div className="xl:mb-[100px]">
      {projects.map((obj, index) => (
        <div key={index}
             className="">

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
        </div>
      ))
      }
      <div className="flex max-xl:hidden gap-[20px]">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col w-full">
            <div className="mb-[20px]">
              <img src={projects[0].image} alt="pic"/>
            </div>
            <div className="mb-[10px]">
              <p className="font-[600] text-[#111111CC]">{projects[0].title}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="flex">
                  <img src="/geolocation.svg" alt="pic"/>
                  <p className="text-[#3E3F4080] text-[14px]">{projects[0].address}</p>
                </div>
                <a className="text-[#3E3F4080] underline" href="/">показать на карте</a>
              </div>
              <div>
                <button className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl">подробнее
                </button>
              </div>
            </div>
          </div>
          {projects[2]&&(<div className="flex flex-col w-full">
            <div className="mb-[20px]">
              <img src={projects[2].image} alt="pic"/>
            </div>
            <div className="mb-[10px]">
              <p className="font-[600] text-[#111111CC]">{projects[2].title}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="flex">
                  <img src="/geolocation.svg" alt="pic"/>
                  <p className="text-[#3E3F4080] text-[14px]">{projects[2].address}</p>
                </div>
                <a className="text-[#3E3F4080] underline" href="/">показать на карте</a>
              </div>
              <div>
                <button className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl">подробнее
                </button>
              </div>
            </div>
          </div>)}
        </div>

        <div>
          {projects[1]&&(<div className="flex flex-col w-full mb-[85px]">
            <div className="mb-[20px]">
              <img src={projects[1].image} alt="pic"/>
            </div>
            <div className="mb-[10px]">
              <p className="font-[600] text-[#111111CC]">{projects[1].title}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="flex">
                  <img src="/geolocation.svg" alt="pic"/>
                  <p className="text-[#3E3F4080] text-[14px]">{projects[1].address}</p>
                </div>
                <a className="text-[#3E3F4080] underline" href="/">показать на карте</a>
              </div>
              <div>
                <button className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl">подробнее
                </button>
              </div>
            </div>
          </div>)}

          {projects[3]&&(<div className="flex flex-col w-full items-end">
            <div className="mb-[20px]">
              <img src={projects[3].image} alt="pic"/>
            </div>
            <div className="mb-[10px]">
              <p className="font-[600] text-[#111111CC]">{projects[3].title}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="flex">
                  <img src="/geolocation.svg" alt="pic"/>
                  <p className="text-[#3E3F4080] text-[14px]">{projects[3].address}</p>
                </div>
                <a className="text-[#3E3F4080] underline" href="/">показать на карте</a>
              </div>
              <div>
                <button className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl">подробнее
                </button>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    </div>);
};

export default Objects