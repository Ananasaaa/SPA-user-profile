import { create } from 'zustand';

export const useProfileStore = create((set) => ({
  profile: {
    name: '',
    surname: '',
    jobTitle: '',
    phone: '',
    address: '',
    interests: [],
    link: '',
    avatar: null,
    visibility: 'Private',
  },
  setProfile: (data) =>
    set((state) => ({
      profile: { ...state.profile, ...data },
    })),
  resetProfile: () =>
    set(() => ({
      profile: JSON.parse(localStorage.getItem('profile')) || {
        name: '',
        surname: '',
        jobTitle: '',
        phone: '',
        address: '',
        interests: [],
        link: '',
        avatar: null,
        visibility: 'Private',
      },
    })),
}));
