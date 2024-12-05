import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/schools')
      .then((res) => setSchools(res.data.schools)) 
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
 
    console.log('Searching for:', search);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="py-8 px-4 sm:px-8">
        <h1 className="text-3xl font-extrabold text-center mb-4">School Search</h1>
        <p className="text-center text-sm mb-8 text-gray-400 italic">
          Find the right school for your child.
        </p>


        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by school name or city"
            className="px-4 py-2 border rounded-md text-sm w-full sm:w-1/2"
          />
          <button
            onClick={handleSearch}
            className="px-3 py-2 bg-green-500 text-white font-semibold text-sm w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>

   
      <div className="bg-white mx-4 sm:mx-8 lg:mx-32 xl:mx-32 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-4 lg:px-8 md:px-8">
          {schools.map((school) => (
            <div
              key={school.id}
              className="school-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
           
              <img
                src={`http://localhost:3000/${school.image}`}
                alt={school.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="text-sky-500 text-xs">{school.city}</p>
                <h3 className="text-sm font-bold text-gray-800">{school.name}</h3>
                <p className="text-gray-500 text-xs mt-2">{school.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowSchools;
