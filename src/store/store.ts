import { create } from "zustand";

interface DiceType {
  currentDiceSize: number;
  currentDiceNum: number;
  currentThreshold: number;
  scaleType: "mod" | "numDice" | "numDrop" | "numKeep";
  systemType: "rollTotal" | "countSuccesses" | "highestDie";
  successThreshold: number;
  successThreshold2: number;
  successThreshold3: number;
  trackingThresholds: number[];
  dropNumber: number;
}

interface DiceActions {
  removeAllDice: () => void;
  setSystemType: (type: "rollTotal" | "countSuccesses" | "highestDie") => void;
  setScaleType: (type: "mod" | "numDice" | "numDrop" | "numKeep") => void;
  setSuccessThreshold: (threshold: number) => void;
  setSuccessThreshold2: (threshold: number) => void;
  setSuccessThreshold3: (threshold: number) => void;
  setDropNumber: (drop: number) => void;
  setThreshold: (threshold: number) => void;
  setTrackingThreshold: (threshold: number[]) => void;

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
  successThreshold2: 0,
  successThreshold3: 0,
  dropNumber: 0,

  trackingThresholds: [1, 2],

  setSystemType: (type: "rollTotal" | "countSuccesses" | "highestDie") =>
    set({ systemType: type }),
  setScaleType: (type: "mod" | "numDice" | "numDrop" | "numKeep") =>
    set({ scaleType: type }),
  setSuccessThreshold: (threshold: number) =>
    set({ successThreshold: threshold }),
  setSuccessThreshold2: (threshold: number) =>
    set({ successThreshold2: threshold }),
  setSuccessThreshold3: (threshold: number) =>
    set({ successThreshold3: threshold }),
  setDropNumber: (drop: number) => set({ dropNumber: drop }),
  setThreshold: (threshold: number) => set({ currentThreshold: threshold }),
  setTrackingThreshold: (threshold: number[]) =>
    set({ trackingThresholds: threshold }),

  setCurrentDiceNum: (num: number) => set({ currentDiceNum: num }),
  setCurrentDiceSize: (size: number) => set({ currentDiceSize: size }),

  removeAllDice: () =>
    set({ currentDiceNum: 0, currentDiceSize: 0, systemType: "rollTotal" }),
}));
