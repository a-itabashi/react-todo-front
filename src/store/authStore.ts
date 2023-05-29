import { create } from 'zustand';

// type User = {
//   id: string;
//   email: string;
// };

type State = {
  isLogged: boolean;
  //   user: User | null;
  //   logIn: (user: User) => void;
  logIn: () => void;
  logOut: () => void;
};

export const authStore = create<State>((set) => ({
  //   isLogged: false,
  //   user: null,
  //   logIn: (user) => set({ isLogged: true, user: user }),
  //   logOut: () => set({ isLogged: false, user: null })
  //   logIn: （) => set({ isLogged: true }),
  //   logOut: () => set({ isLogged: false })
  isLogged: false,
  logIn: () => set({ isLogged: true }),
  logOut: () => set({ isLogged: false })
}));
