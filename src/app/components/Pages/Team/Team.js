'use client'

const Team = ({ team }) => {
  const title = 'Lorem ipsum dolor sit amet consectetur';
  const description = 'Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum. Odio enim elit vestibulum purus ullamcorper turpis at ornare dolor. Nibh mi varius nullam pellentesque venenatis tortor cum.';
  return (
    <div
      className="flex flex-col text-[#111111CC]"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div>
          <div>
            <h2 className="text-[30px] font-[500] mb-[28px] xl:mb-[19px] xl:text-[64px] xl:leading-none">КОМАНДА</h2>
          </div>
          <div className="mb-[12px] xl:mb-[40px]">
            <p className="font-[550] xl:text-[24px]">{title}</p>
          </div>
        </div>

        <div className="mb-[24px] lg:hidden">
          <img src="/team/teamImg.svg" alt="team"/>
        </div>
        <div className="mb-[52px] xl:text-[20px] lg:w-[45%]">
          <p>{description}</p>
        </div>
      </div>

      <div className="max-lg:hidden mb-[100px]"><img src="/team/teamFullScreen.svg" alt="team"/></div>


      <div className="grid grid-cols-3 gap-4 mb-[32px] lg:grid-cols-6 lg:gap-[24px]">
        {team.map((member,index)=>(
          <div
            className="flex flex-col items-center content-between"
            key={index}
          >
            <img className="mb-2 xl:mb-[32px] xl:w-[242px] xl:h-[242px]"
                 src={member.image} alt="pic"
            />
            <p className="text-center xl:text-[24px]">{member.name}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Team;