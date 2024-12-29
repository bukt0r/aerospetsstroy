const News = () =>{
  return(
    <div
      id="News"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#D3DFEA]">
      <div >
        <h2 className="text-[30px] font-[500] mb-[20px]">НОВОСТИ</h2>
        <div className="px-[16px] pt-[16px] pb-[50px] bg-[#F7FAFF] h-[300px] overflow-y-auto"
             style={{
               scrollbarWidth: "thin",
               scrollbarColor: "#6095AB4D #F7FAFF",
             }}
        >

          <p className="font-[550] mb-[12px]">Lorem ipsum dolor sit amet consectetur</p>
          <p>Lorem ipsum dolor sit amet consectetur.
            Neque ut auctor ultrices pellentesque elementum quis.
            Imperdiet augue nulla orci massa ipsum. Odio enim elit vestibulum
            purus ullamcorper turpis at ornare dolor. Nibh mi varius nullam pellentesque
            venenatis tortor cum. Lorem ipsum dolor sit amet consectetur.
            Neque ut auctor ultrices pellentesque elementum quis.
            Imperdiet augue nulla orci massa ipsum. Odio enim elit vestibulum
            purus ullamcorper turpis at ornare dolor. Nibh mi varius nullam
            pellentesque venenatis tortor cum.
          </p>
        </div>
      </div>
    </div>
  );
};
export default News;