import React from 'react';

const services = [
  {
    number: '01',
    lines: ['Family Office', 'Management'],
  },
  {
    number: '02',
    lines: ['Financial', 'Advisory'],
  },
  {
    number: '03',
    lines: ['Alternative Investment', 'Management'],
  },
];

const OurServices: React.FC = () => (
  <section className="bg-[#06306B] py-12">
    <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-8">Our Services</h2>
    <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-52">
      {services.map((service) => (
        <div key={service.number} className="flex gap-3">
          <div className="text-white text-lg md:text-xl mb-2 opacity-80">{service.number}</div>
          <div>
            {service.lines.map((line, idx) => (
              <div key={idx} className="text-white text-lg md:text-2xl font-light leading-snug">
                {line}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default OurServices; 