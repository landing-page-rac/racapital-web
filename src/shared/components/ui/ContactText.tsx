const ContactText: React.FC = () => {
  return (
    <div className="text-white">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-6">
        How Can We <span className="underline">Aid</span> <br />You?
      </h2>

      {/* Description */}
      <p className="text-xl leading-relaxed opacity-90">
        Nothing beats a one-on-one discussion. If you&apos;d like to learn more about our tailored solutions, drop us a line and one of our consultants will reach out shortly.
      </p>
    </div>
  );
};

export default ContactText; 