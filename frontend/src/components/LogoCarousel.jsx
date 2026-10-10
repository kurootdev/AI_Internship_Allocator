import logo1 from "../assets/logos/logo1.png";
import logo2 from "../assets/logos/logo2.png";
import logo3 from "../assets/logos/logo3.jpg";
import logo4 from "../assets/logos/logo4.png";
import logo5 from "../assets/logos/logo5.jpg";
import logo6 from "../assets/logos/logo6.jpg";
import logo7 from "../assets/logos/logo7.jpg";

// Duplicate logos for smooth infinite scroll
const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
];

export default function LogoCarousel() {
  return (
    <div className="overflow-hidden w-full bg-white py-6">
      <div
        className="flex whitespace-nowrap items-center hover:pause"
        style={{ animation: "marquee 20s linear infinite" }}
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Logo ${index}`}
            className="h-16 md:h-20 mx-6 inline-block transition-transform duration-300 ease-in-out hover:scale-105"
          />
        ))}
      </div>

      {/* Inline CSS animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
