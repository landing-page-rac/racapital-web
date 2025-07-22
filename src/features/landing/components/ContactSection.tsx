import ContactForm from "./ContactForm";
import ContactText from "./ContactText";


const ContactSection: React.FC = () => {
  return (
    <section className="bg-[#1763F7] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ContactText />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 