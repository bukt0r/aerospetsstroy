const News = () =>{
  return(
    <div
      id="News"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#D3DFEA] text-[#111111CC] lg:bg-[#F2F5F9] lg:px-[60px] lg:py-[100px] xl:px-[100px]">
      <div >
        <h2 className="text-[30px] font-semibold mb-[20px] xl:text-[64px] lg:mb-[37px]">НОВОСТИ</h2>
        <div
          className="relative h-[300px] lg:h-[690px] bg-[#F7FAFF] lg:bg-gradient-to-b from-[#E9F3FE] to-[#F7F9FF] lg:shadow-[8px_8px_200px_0px_#3C72AE33]">
          {/* Содержимое с прокруткой */}
          <div
            className="px-[16px] pt-[16px] pb-[50px] overflow-y-auto h-full lg:px-[130px] lg:pt-[84px]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#6095AB4D #F7FAFF",
            }}
          >
            <p className="font-[550] mb-[12px] lg:text-[#4A4A4A] xl:text-[32px]">Lorem ipsum dolor sit amet consectetur</p>
            <p className="lg:text-[#4A4A4A] xl:text-[20px]">
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.
              Lorem ipsum dolor sit amet consectetur. Neque ut auctor ultrices
              pellentesque elementum quis. Imperdiet augue nulla orci massa ipsum.

            </p>
          </div>

          {/* Фиксированный градиент для размытия */}
          <div
            className="max-lg:hidden pointer-events-none absolute bottom-0 left-0 w-full h-[134px] bg-gradient-to-t from-[#F7FAFF] to-[#F7FAFF00]"
          ></div>
        </div>


      </div>
    </div>
  );
};
export default News;