import { create } from "zustand";

export interface CountState {
  value: number;
  increase: (valueToUpdate: number) => void;
  decrease: (valueToUpdate: number) => void;
}

export const countState = create<CountState>((set) => ({
  value: 0,
  increase: (valueToUpdate) =>
    set((previousState) => {
      const addedValue = previousState.value + valueToUpdate;
      const subtractedValue = addedValue - 5;
      const multipliedValue = subtractedValue * 2;

      return { value: multipliedValue };
    }),
  decrease: (valueToUpdate) =>
    set((previousState) => {
      const subtractedValue = previousState.value - valueToUpdate;
      const addedValue = subtractedValue + 5;
      const multipliedValue = addedValue * 2;

      return { value: multipliedValue };
    }),
}));
