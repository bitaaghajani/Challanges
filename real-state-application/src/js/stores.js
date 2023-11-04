import create from "zustand";
import { persist } from "zustand/middleware";
const useStore = create(
  persist(
    (set) => ({
      items: [],
      setItems: (items) => {
        set({ items: items });
      },
    }),
    {
      name: "favoriteOnes",
    }
  )
);

export default useStore;
