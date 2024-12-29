'use client'

const Partners =({images})=>{

  return(
    <div
      id="Partners"
      className="flex flex-col text-[#111111CC]">
      <div>
        <h2 className="text-[30px] font-[500] mb-[28px]">НАШИ ПАРТНЕРЫ</h2>
      </div>
      <div className="grid grid-cols-3 mb-[44px] gap-[11px]">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={image} alt={`${index + 1}`} className="w-full"/>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Partners;