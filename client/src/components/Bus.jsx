import React from "react";
import { useNavigate } from "react-router-dom";

function Bus({ bus }) {
  const navigate = useNavigate();

  return (
    <div className='border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition duration-300'>
      {/* Bus Name */}
      <h1 className='text-lg font-bold text-gray-800'>{bus.name}</h1>
      <hr className='my-2' />

      {/* Route Details */}
      <div className='flex flex-wrap justify-between items-center gap-4'>
        <div>
          <p className='text-sm text-gray-500'>From</p>
          <p className='text-sm font-medium text-gray-700'>{bus.from}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>To</p>
          <p className='text-sm font-medium text-gray-700'>{bus.to}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Fare</p>
          <p className='text-sm font-medium text-gray-700'>$ {bus.fare} /-</p>
        </div>
      </div>
      <hr className='my-2' />

      {/* Journey Date & Book Now */}
      <div className='flex flex-wrap justify-between items-center gap-4'>
        <div>
          <p className='text-sm text-gray-500'>Journey Date</p>
          <p className='text-sm font-medium text-gray-700'>{bus.journeyDate}</p>
        </div>
        <button
          className='text-lg font-semibold text-blue-600 underline hover:text-blue-800 transition'
          onClick={() => {
            navigate(`/book-now/${bus._id}`);
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Bus;
