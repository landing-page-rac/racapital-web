import ContactForm from "./ContactForm";
import ContactText from "./ContactText";
import superGraphic from "../../../features/landing/assets/super-graphic-white.png";
import Image from "next/image";


const ContactSection: React.FC = () => {
  return (
    <section className="bg-[#0D52E5] py-20 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={superGraphic.src}
          alt="Background Graphic"
          className="w-full h-full object-cover opacity-30"
          fill
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ContactText />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 