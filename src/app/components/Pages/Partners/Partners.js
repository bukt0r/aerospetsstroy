'use client'

const Partners =({images})=>{

  return(
    <div
      id="Partners"
      className="flex flex-col text-[#111111CC]">
      <div>
        <h2 className="text-[30px] font-semibold mb-[28px] xl:text-[64px] xl:mb-[40px]">НАШИ ПАРТНЕРЫ</h2>
      </div>
      <div className="grid grid-cols-3 xl:grid-cols-4 mb-[44px] gap-[11px] xl:gap-[20px] xl:mb-[80px]">
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