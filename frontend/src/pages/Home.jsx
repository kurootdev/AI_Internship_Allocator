import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import HeroSlider from "../components/HeroSlider";
import LogoCarousel from "../components/LogoCarousel";
import Features from "../components/Features";
import Benefits from "../components/Benefits";
import Opportunities from "../components/Opportunities";
import EventsGallery from "../components/EventsGallery";
import Footer from "../components/Footer";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Home() {
  const videoRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const swiperEl = document.querySelector(".hero-swiper");

    if (swiperEl?.swiper) {
      swiperEl.swiper.on("slideChange", () => {
        videoRefs.current.forEach((video) => {
          if (video) video.pause();
        });
      });

      const activeIndex = swiperEl.swiper.activeIndex;
      setCurrentSlide(activeIndex);

      const activeVideo = videoRefs.current[activeIndex];
      if (activeVideo) activeVideo.play();
    }
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroSlider />

      {/* Partner Companies */}
      <section className="py-8 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Our Partner Companies
        </h2>
        <LogoCarousel />
      </section>

      {/* Features & Benefits */}
      <div className="p-6 grid md:grid-cols-2 gap-8">
        <Features />
        <Benefits />
      </div>

      {/* Opportunities Section */}
      <Opportunities />

      {/* Events Gallery */}
      <EventsGallery />

      {/* Footer */}
      <Footer />

      {/* Custom Styles */}
      <style jsx="true">{`
        .hero-swiper .swiper-pagination {
          bottom: 60px !important;
        }
        .hero-swiper .swiper-pagination-bullet {
          margin: 0 8px !important;
          transition: all 0.3s ease !important;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(2deg);
          }
          66% {
            transform: translateY(5px) rotate(-2deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .gradient-text {
          background: linear-gradient(45deg, #f97316, #ea580c, #dc2626);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}
