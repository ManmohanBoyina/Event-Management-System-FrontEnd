import React from 'react';

const VenueCard = ({ imageSrc, name, location, availability, sport }) => {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg">
      <img src={imageSrc} alt={name} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base mb-2">{location}</p>
        <p className="text-gray-700 text-base mb-2">Availability: {availability?"Open":"Closed"}</p>
        <p className="text-gray-700 text-base">Sport: {sport}</p>
      </div>
    </div>
  );
};

export default VenueCard;
