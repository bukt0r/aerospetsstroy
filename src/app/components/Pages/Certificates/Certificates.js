'use client';

const Certificates = ({ data = [] }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <p className="mb-[16px]">{item.description}</p>
          <div className="grid grid-cols-2 gap-[10px]">
            {item.images.map((image, imgIndex) => (
              <div key={imgIndex} className="flex flex-col items-center">
                <img
                  src={image}
                  alt={`Certificate ${index + 1}-${imgIndex + 1}`}
                  className="mb-[32px] w-full"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certificates;

