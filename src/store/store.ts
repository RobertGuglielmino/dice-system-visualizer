import { create } from "zustand";

interface DiceType {
  currentDiceSize: number;
  currentDiceNum: number;
  systemType: "rollTotal" | "countSuccesses" | "highestDie";
  successThreshold: number;
  dropNumber: number;
}

interface DiceActions {
  increaseD4: () => void;
  increaseD6: () => void;
  increaseD8: () => void;
  increaseD10: () => void;
  increaseD12: () => void;
  increaseD20: () => void;
  increaseD100: () => void;
  decreaseD4: () => void;
  decreaseD6: () => void;
  decreaseD8: () => void;
  decreaseD10: () => void;
  decreaseD12: () => void;
  decreaseD20: () => void;
  decreaseD100: () => void;
  removeAllDice: () => void;
  setSystemType: (type: "rollTotal" | "countSuccesses" | "highestDie") => void;
  setSuccessThreshold: (threshold: number) => void;
  setDropNumber: (drop: number) => void;

  setCurrentDiceNum: (num: number) => void;
  setCurrentDiceSize: (size: number) => void;

};

export const useDice = create<DiceType & DiceActions>((set) => ({
  currentDiceNum: 0,
  currentDiceSize: 0,
  systemType: "rollTotal",
  successThreshold: 0,
  dropNumber: 0,
  increaseD4: () =>
    set((state) => ({
      currentDiceSize: 4,
      currentDiceNum: state.currentDiceNum + 1,
    })),
  increaseD6: () =>
    set((state) => ({
      currentDiceSize: 6,
      currentDiceNum: state.currentDiceNum + 1,
    })),
  increaseD8: () =>
    set((state) => ({
      currentDiceSize: 8,
      currentDiceNum: state.currentDiceNum + 1,
    })),
  increaseD10: () =>
    set((state) => ({
      currentDiceSize: 10,
      currentDiceNum: state.currentDiceNum + 1,
    })),
  increaseD12: () =>
    set((state) => ({
      currentDiceSize: 12,
      currentDiceNum: state.currentDiceNum + 1,
    })),
  increaseD20: () =>
    set((state) => ({
      currentDiceSize: 20,
      currentDiceNum: state.currentDiceNum + 1,
    })),
  increaseD100: () =>
    set((state) => ({
      currentDiceSize: 100,
      currentDiceNum: state.currentDiceNum + 1,
    })),

  decreaseD4: () => set((state) => ({ currentDiceNum: Math.max(0, state.currentDiceNum - 1) })),
  decreaseD6: () => set((state) => ({ currentDiceNum: Math.max(0, state.currentDiceNum - 1) })),
  decreaseD8: () => set((state) => ({ currentDiceNum: Math.max(0, state.currentDiceNum - 1) })),
  decreaseD10: () => set((state) => ({ currentDiceNum: Math.max(0, state.currentDiceNum - 1) })),
  decreaseD12: () => set((state) => ({ currentDiceNum: Math.max(0, state.currentDiceNum - 1) })),
  decreaseD20: () => set((state) => ({ currentDiceNum: Math.max(0, state.currentDiceNum - 1) })),
  decreaseD100: () =>
    set((state) => ({ currentDiceNum: Math.max(0, state.currentDiceNum - 1) })),

  setSystemType: (type: "rollTotal" | "countSuccesses" | "highestDie") =>
    set({ systemType: type }),
  setSuccessThreshold: (threshold: number) => set({ successThreshold: threshold }),
  setDropNumber: (drop: number) => set({ dropNumber: drop }),

  setCurrentDiceNum: (num: number) => set({ currentDiceNum: num }),
  setCurrentDiceSize: (size: number) => set({ currentDiceSize: size }),

  removeAllDice: () =>
    set({ currentDiceNum: 0, currentDiceSize: 0, systemType: "rollTotal" }),
}));
