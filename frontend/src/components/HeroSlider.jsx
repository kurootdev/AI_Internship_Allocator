import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import Slider1 from '../assets/headerImg/header1.png';
import Slider2 from '../assets/headerImg/header2.png';
import Slider3 from '../assets/headerImg/header3.png';

export default function HeroSlider() {
  const navigate = useNavigate();

  const heroSlides = [
  {
    image: Slider1,
    title: "YOUR AI-POWERED BRIDGE TO OPPORTUNITIES",
    desc1: "An AI-powered allocation and recommendation engine",
    desc2: "From search to success, we streamline your journey",

    desc3: "Join Intern Setu and unlock a new era of opportunity",
    link: "/login",
  },
  {
    image: Slider2,
    title: "TRANSFORMING INTERNSHIPS EMPOWERING A NATION",
    desc1: "AI engine drives a skilled, equitable India",
    desc2: "Our AI-engine finds perfect internship for you",
    desc3: "Join Intern Setu and unlock a new era of opportunity ",
    link: "/login",
  },
  {
    image: Slider3,
    title: "THE POWER OF AI IN INTERNSHIP MATCHING ",
    desc1: "Replacing manual allocation with smart & transparent system",

    desc2: "Smart allocation engine goes beyond simple search ",

    desc3: "Our AI-engine finds perfect internship for you",
    link: "/login",
  },
];
  return (
    <section className="w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                onClick={() => navigate(slide.link)}
                className={`block w-full h-full relative cursor-pointer bg-gradient-to-r ${slide.gradient}`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex flex-col  text-white mt-15 px-10">
                  <div className="w-200 h-35 bg-white/40 text-center rounded-xl">
                    <h1 className="text-xl sm:text-2xl md:text-5xl font-bold drop-shadow-lg text-black mt-4">
                      {slide.title}
                    </h1>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold sm:text-2xl md:text-4xl  drop-shadow-lg text-black py-4">
                      {slide.desc1}
                    </h3>
                    <h3 className="text-xl font-semibold sm:text-2xl md:text-4xl  drop-shadow-lg text-black py-4">
                      {slide.desc2}
                    </h3>
                    <h3 className="text-xl font-semibold sm:text-2xl md:text-4xl  drop-shadow-lg text-black py-4">
                      {slide.desc3}
                    </h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
  );
}
