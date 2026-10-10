import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Gallery = ({ galleryData }) => {
  const videoRefs = useRef([]);

  useEffect(() => {
    const swiperEl = document.querySelector(".swiper")?.swiper;
    if (!swiperEl) return;

    const handleSlideChange = () => {
      // Pause all videos
      videoRefs.current.forEach((video) => video?.pause());

      // Play videos in currently visible slides
      const visibleSlides = Array.from(swiperEl.slides).slice(
        swiperEl.activeIndex,
        swiperEl.activeIndex + swiperEl.params.slidesPerView
      );

      visibleSlides.forEach((slide) => {
        const video = slide.querySelector("video");
        if (video) video.play();
      });
    };

    swiperEl.on("slideChange", handleSlideChange);
    handleSlideChange();

    return () => {
      if (swiperEl) swiperEl.off("slideChange", handleSlideChange);
    };
  }, [galleryData]);

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Gallery</h2>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={20}
        slidesPerView={3}
        slidesPerGroup={1}
        breakpoints={{
          640: { slidesPerView: 1, slidesPerGroup: 1 },
          768: { slidesPerView: 2, slidesPerGroup: 1 },
          1024: { slidesPerView: 3, slidesPerGroup: 1 },
        }}
        className="max-w-6xl mx-auto"
      >
        {galleryData.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="border border-black rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              ) : (
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={item.url}
                  className="w-full h-64 md:h-80 object-cover"
                  muted
                  playsInline
                />
              )}

              <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-3">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm">{item.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
