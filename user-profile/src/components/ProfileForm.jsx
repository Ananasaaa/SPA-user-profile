import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Zа-яА-Я\s]+$/, 'Name must contain only letters and spaces'),
  surname: z
    .string()
    .min(2, 'Surname must be at least 2 characters long')
    .max(50, 'Surname must not exceed 50 characters')
    .regex(/^[a-zA-Zа-яА-Я\s]+$/, 'Surname must contain only letters and spaces'),
  jobTitle: z
    .string()
    .max(100, 'Job Title must not exceed 100 characters')
    .optional(),
  phone: z
    .string()
    .regex(/^\+\d{10,15}$/, 'Phone must be in the format +<country code><number>')
    .min(10, 'Phone must be at least 10 characters long')
    .max(15, 'Phone must not exceed 15 characters'),
  email: z
    .string()
    .email('Email must be a valid email address')
    .max(100, 'Email must not exceed 100 characters'),
  address: z
    .string()
    .max(200, 'Address must not exceed 200 characters')
    .optional(),
  pitch: z
    .string()
    .max(500, 'Pitch must not exceed 500 characters')
    .optional(),
  visibility: z.enum(['Private', 'Public']),
  avatar: z
    .any()
    .refine(
      (file) =>
        !file || (['image/jpeg', 'image/png', 'image/jpg'].includes(file.type) && file.size <= 5 * 1024 * 1024),
      'Avatar must be a .jpg, .jpeg, or .png file and not exceed 5 MB'
    )
    .optional(),
});

const ProfileForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });



  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const profileData = JSON.parse(storedProfile);
      reset(profileData); 
      if (profileData.avatar) {
        setAvatarPreview(profileData.avatar); 
      }
    }
  }, [reset]);



  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('avatar', file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    localStorage.setItem('profile', JSON.stringify(data));
    console.log('Saved Data:', data);
  }; 



  const handleCancel = () => {
    reset({
      name: '',
      surname: '',
      jobTitle: '',
      phone: '',
      email: '',
      address: '',
      pitch: '',
      visibility: 'Private',
      avatar: null,
    });
    setAvatarPreview(null);
    localStorage.removeItem('profile');
  };


  return (
    <div
      className="card"
      style={{
        background: 'linear-gradient(to bottom, #E9F2F3, #A6C5E3)',
        border: 'none',
        padding: '2rem',
        borderRadius: '10px',
      }}
    >
      <div
        className="d-flex justify-content-center"
        style={{
          position: 'relative',
          marginBottom: '2rem',
        }}
      >
        <label
          htmlFor="avatarInput"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#d9d9d9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          ) : (
            <i
              className="bi bi-camera"
              style={{
                fontSize: '1.5rem',
                color: '#666',
              }}
            ></i>
          )}
          <input
            type="file"
            id="avatarInput"
            style={{
              display: 'none',
            }}
            accept="image/*"
            {...register('avatar')}
            onChange={handleAvatarChange}
          />
        </label>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '5px',
                height: '40px',
                marginBottom: '10px',
              }}
              {...register('name')}
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Surname"
              className="form-control"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '5px',
                height: '40px',
                marginBottom: '10px',
              }}
              {...register('surname')}
            />
            {errors.surname && <p className="text-danger">{errors.surname.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Job Title"
              className="form-control"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '5px',
                height: '40px',
                marginBottom: '10px',
              }}
              {...register('jobTitle')}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Phone"
              className="form-control"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '5px',
                height: '40px',
                marginBottom: '10px',
              }}
              {...register('phone')}
            />
            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '5px',
                height: '40px',
                marginBottom: '10px',
              }}
              {...register('email')}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Address"
              className="form-control"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '5px',
                height: '40px',
                marginBottom: '10px',
              }}
              {...register('address')}
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Pitch"
              className="form-control"
              rows="3"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
              {...register('pitch')}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="d-block">Show your profile in Launchpad?</label>
            <div>
              <input
                type="radio"
                id="private"
                name="visibility"
                value="Private"
                {...register('visibility')}
                defaultChecked
              />
              <label htmlFor="private" style={{ marginLeft: '8px', marginRight: '16px' }}>
                Private
              </label>
              <input
                type="radio"
                id="public"
                name="visibility"
                value="Public"
                {...register('visibility')}
              />
              <label htmlFor="public" style={{ marginLeft: '8px' }}>
                Public
              </label>
            </div>
          </div>
          <div className="d-flex flex-column gap-3 mt-3">
            <div className="d-flex align-items-center justify-content-between">
              <span style={{ color: '#49535C', fontSize: '1rem' }}>The scopes of your interests</span>
              <button
                type="button"
                className="btn"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3888E7',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                +
              </button>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span style={{ color: '#49535C', fontSize: '1rem' }}>Potential interests</span>
              <button
                type="button"
                className="btn"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3888E7',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                +
              </button>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span style={{ color: '#49535C', fontSize: '1rem' }}>Your links</span>
              <button
                type="button"
                className="btn"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3888E7',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-4 mt-4">
          <button type="submit" className="btn btn-primary mt-4">
            Save
          </button>
          <button className="btn btn-primary mt-4" onClick={handleCancel}>
            Cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm; 

