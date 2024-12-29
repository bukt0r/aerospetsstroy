'use client'

const Team = ({ title, text, images, names=[] }) => {
  return (
    <div
      className="flex flex-col text-[#111111CC]"
    >
      <div>
        <h2 className="text-[30px] font-[500] mb-[28px]">КОМАНДА</h2>
      </div>
      <div className="mb-[12px]">
        <p className="font-[550]">{title}</p>
      </div>
      <div className="mb-[24px]">
        <img src="/team/teamImg.svg" alt="team"/>
      </div>
      <div className="mb-[52px]">
        <p>{text}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-[32px]">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={image} alt={`Team Member ${index + 1}`} className="mb-2"/>
            <p className="text-center">{names[index] || "Имя отсутсвует"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;