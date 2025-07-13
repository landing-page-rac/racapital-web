import React from 'react';

const stats = [
  {
    value: '999',
    label: 'Total Project Worth',
  },
  {
    value: '999',
    label: 'Total Clients',
  },
  {
    value: '999',
    label: 'Years of Experience',
  },
];

const StatsBar: React.FC = () => (
  <section className="bg-[#1763F7] py-10">
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-52 mx-auto">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-white text-5xl md:text-6xl font-bold mb-2">{stat.value}</div>
          <div className="text-white text-lg md:text-xl opacity-90">{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBar; 