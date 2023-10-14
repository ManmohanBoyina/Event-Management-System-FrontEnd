import React from 'react';
import { useRouter } from 'next/router';
const DashboardCard = ({ imageSrc, title, subtitle, route }) => {
  const router = useRouter()
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg transition duration-500 hover:scale-105 cursor-pointer"
    onClick={()=> router.push(route)}
    >
      <img src={imageSrc} alt={title} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{subtitle}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
