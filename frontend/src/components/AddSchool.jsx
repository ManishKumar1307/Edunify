import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddSchoolForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Form Data:', data); 

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    formData.append('image', data.image[0]); 

    try {
      const response = await axios.post('http://localhost:3000/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      alert('School added successfully!');
      console.log('Response:', response.data);
      reset(); 
    } catch (error) {
      console.error('Error adding school:', error);
      alert('Failed to add school. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add a New School</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full px-3 py-1 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            {...register('address', { required: 'Address is required' })}
            className="w-full px-3 py-1 border rounded-md"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            {...register('city', { required: 'City is required' })}
            className="w-full px-3 py-1 border rounded-md"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            {...register('state', { required: 'State is required' })}
            className="w-full px-3 py-1 border rounded-md"
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Contact</label>
          <input
            type="number"
            {...register('contact', {
              required: 'Contact is required',
              minLength: { value: 10, message: 'Must be at least 10 digits' },
            })}
            className="w-full px-3 py-1 border rounded-md"
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            {...register('image', { required: 'Image is required' })}
            className="w-full"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email_id', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            })}
            className="w-full px-3 py-1 border rounded-md"
          />
          {errors.email_id && <p className="text-red-500 text-sm">{errors.email_id.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add School
        </button>
      </form>
    </div>
  );
};

export default AddSchoolForm;
