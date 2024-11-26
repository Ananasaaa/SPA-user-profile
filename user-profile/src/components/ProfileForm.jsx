import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import React, { useState, useEffect } from 'react';

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
  jobTitle: z.string().max(100, 'Job Title must not exceed 100 characters').optional(),
  phone: z
    .string()
    .regex(/^\+\d{10,15}$/, 'Phone must be in the format +<country code><number>')
    .min(10, 'Phone must be at least 10 characters long')
    .max(15, 'Phone must not exceed 15 characters'),
  email: z.string().email('Email must be a valid email address').max(100, 'Email must not exceed 100 characters'),
  address: z.string().max(200, 'Address must not exceed 200 characters').optional(),
  pitch: z.string().max(500, 'Pitch must not exceed 500 characters').optional(),
  visibility: z.enum(['Private', 'Public']),
  avatar: z.any().optional(),
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
    const storedAvatarPreview = localStorage.getItem('avatarPreview');

    if (storedProfile) {
      const profileData = JSON.parse(storedProfile);
      reset(profileData);

      if (storedAvatarPreview) {
        setAvatarPreview(storedAvatarPreview);
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
    try {
      const { avatar, ...otherData } = data;
      profileSchema.parse(otherData);

      localStorage.setItem('profile', JSON.stringify(otherData));
      if (avatarPreview) {
        localStorage.setItem('avatarPreview', avatarPreview);
      }
      console.log('Saved Data:', otherData);
    } catch (error) {
      console.error('Validation or saving error:', error);
    }
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
    localStorage.removeItem('avatarPreview');
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
            style={{ display: 'none' }}
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
              {...register('name')}
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Surname"
              className="form-control"
              {...register('surname')}
            />
            {errors.surname && <p className="text-danger">{errors.surname.message}</p>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Job Title"
              className="form-control"
              {...register('jobTitle')}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Phone"
              className="form-control"
              {...register('phone')}
            />
            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
          </div>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              {...register('email')}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Address"
              className="form-control"
              {...register('address')}
            />
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Pitch"
              className="form-control"
              rows="3"
              {...register('pitch')}
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Visibility</label>
            <div>
              <input
                type="radio"
                id="private"
                value="Private"
                {...register('visibility')}
              />
              <label htmlFor="private" className="ms-1">Private</label>

              <input
                type="radio"
                id="public"
                value="Public"
                {...register('visibility')}
              />
              <label htmlFor="public" className="ms-1">Public</label>
            </div>
          </div>

          <div className="mb-4 d-flex align-items-center justify-content-between">
          <label className="mb-0">The scopes of your interest:</label>
          <button type="button" className="btn btn-link p-0 text-decoration-none">
            +
          </button>
        </div>

        <div className="mb-4 d-flex align-items-center justify-content-between">
          <label className="mb-0">Potential interests:</label>
          <button type="button" className="btn btn-link p-0 text-decoration-none">
            +
          </button>
        </div>

        <div className="mb-4 d-flex align-items-center justify-content-between">
          <label className="mb-0">Your links:</label>
          <button type="button" className="btn btn-link p-0 text-decoration-none">
            +
          </button>
        </div>


          <div className="d-flex justify-content-end gap-4">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
