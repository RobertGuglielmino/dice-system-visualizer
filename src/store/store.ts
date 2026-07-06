import { create } from "zustand";

interface DiceType {
  currentDiceSize: number;
  currentDiceNum: number;
  currentThreshold: number;
  scaleType: "mod" | "numDice" | "numDrop" | "numKeep";
  systemType: "rollTotal" | "countSuccesses" | "highestDie";
  successThreshold: number;
  dropNumber: number;
}

interface DiceActions {
  removeAllDice: () => void;
  setSystemType: (type: "rollTotal" | "countSuccesses" | "highestDie") => void;
  setScaleType: (type: "mod" | "numDice" | "numDrop" | "numKeep") => void;
  setSuccessThreshold: (threshold: number) => void;
  setDropNumber: (drop: number) => void;
  setThreshold: (threshold: number) => void;

  setCurrentDiceNum: (num: number) => void;
  setCurrentDiceSize: (size: number) => void;
};

export const useDice = create<DiceType & DiceActions>((set) => ({
  currentDiceNum: 0,
  currentDiceSize: 0,
  currentThreshold: 0,
  systemType: "rollTotal",
  scaleType: "numDice",
  successThreshold: 0,
  dropNumber: 0,

  setSystemType: (type: "rollTotal" | "countSuccesses" | "highestDie") =>
    set({ systemType: type }),
  setScaleType: (type: "mod" | "numDice" | "numDrop" | "numKeep") =>
    set({ scaleType: type }),
  setSuccessThreshold: (threshold: number) => set({ successThreshold: threshold }),
  setDropNumber: (drop: number) => set({ dropNumber: drop }),
  setThreshold: (threshold: number) => set({ currentThreshold: threshold }),

  setCurrentDiceNum: (num: number) => set({ currentDiceNum: num }),
  setCurrentDiceSize: (size: number) => set({ currentDiceSize: size }),

  removeAllDice: () =>
    set({ currentDiceNum: 0, currentDiceSize: 0, systemType: "rollTotal" }),
}));
