import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../assets/eventGalleryImg/event1.png";
import img2 from "../assets/eventGalleryImg/event2.png";
import img3 from "../assets/eventGalleryImg/event3.png";
import img4 from "../assets/eventGalleryImg/event4.png";
import img5 from "../assets/eventGalleryImg/event5.png";

const EventsGallery = () => {
  const events = [
    {
      image: img1,
      title: "Eve of Independence Day",
      description:
        "Inspiring conversations with PMIS interns on the eve of Independence Day.",
      date: "14th May, 2025",
      location: "Delhi",
    },
    {
      image: img2,
      title: "PMIS North-East Round table",
      description:
        "Leaders, industry, and youth converge in Shillong to drive PM Internship Scheme.",
      date: "10th July, 2025",
      location: "Shillong, Meghalaya",
    },
    {
      image: img3,
      title: "Intern Interaction Event",
      description:
        "Meaningful moments in Dehradun— PMIS interns engage in insightful discussions.",
      date: "17th June, 2025",
      location: "Dehradun",
    },
    {
      image: img4,
      title: "Innovation Summit",
      description: "Interns showcase innovative projects in Bangalore summit.",
      date: "25th Aug, 2025",
      location: "Bangalore",
    },
    {
      image: img5,
      title: "Rural Development Drive",
      description: "Empowering villages with innovation and internship efforts.",
      date: "3rd Sept, 2025",
      location: "Lucknow",
    },
    {
      image: img3,
      title: "Tech Future Expo",
      description: "PMIS interns showcase cutting-edge projects and ideas.",
      date: "10th Oct, 2025",
      location: "Hyderabad",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Events Gallery
      </h2>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-7xl mx-auto px-6"
      >
        {events.map((event, i) => (
          <SwiperSlide key={i}>
            <div className="rounded-2xl overflow-hidden bg-white">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-56 md:h-64 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold text-lg">
                  {event.title}
                </h3>
                <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                  {event.description}
                </p>
                <p className="text-gray-500 mt-2 text-xs">
                  {event.date} | {event.location}
                </p>
              </div>
              <div className="px-4 pb-4">
                <button className="w-full py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition">
                  View Event
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default EventsGallery;
