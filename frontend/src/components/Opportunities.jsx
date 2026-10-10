import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import img1 from "../assets/eventGalleryImg/IT.jpeg";
import img2 from "../assets/eventGalleryImg/education.jpeg";
import img3 from "../assets/eventGalleryImg/Engineering.jpg";
import img4 from "../assets/eventGalleryImg/Manufacturing.jpeg";
import img5 from "../assets/eventGalleryImg/RuralDev.jpeg";

export default function Opportunities() {
  const sectors = [
    { title: "IT", img: img1 },
    { title: "Education", img: img2 },
    { title: "Engineering", img: img3 },
    { title: "Manufacturing", img: img4 },
    { title: "Rural Development", img: img5 },
  ];

  return (
    <div className="mt-10 px-6">
      <h2 className="text-center text-2xl font-bold mb-6">
        Explore Opportunities in{" "}
        <span className="text-orange-500">Various Sectors</span>
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {sectors.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="border border-black rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="bg-white p-3 text-center font-medium text-gray-800">
                {item.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}