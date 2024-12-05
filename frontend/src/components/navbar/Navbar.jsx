import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-b from-violet-900 to-indigo-700 text-white py-6 px-32">
      <div className="flex justify-between items-center">
      
        <div className="">
          <img className='w-32' src='https://uniformapp.in/images/small_logo.png' alt='logo' />
        </div>

    
        <div className="space-x-6">
          <a href="#admission" className="text-xs font-semibold">Common Admissions</a>
          <a href="#school-portal" className="text-xs font-semibold">School Portal</a>
          <a href="#find-school" className="text-xs font-semibold">Find School</a>
          <a href="#blog" className="text-xs font-semibold">Blog</a>
          <a href="/add-school" className="px-1 py-2 bg-green-500 text-white font-semibold text-xs w-full sm:w-auto">Add School</a>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
