import { useDice } from "../store/store";

export default function DiceScaleSelect() {
  const dice = useDice((state) => state);
  
    return (
      <div className="flex flex-col gap-2 p-1 w-80">
        {["countSuccesses", "highestDie"].includes(dice.systemType) && (
          <div className="flex justify-center">
            <label className="flex gap-1 w-35 justify-start">
              <input
                className="accent-space-blue"
                type="radio"
                name="scale"
                checked={dice.scaleType === "numDice"}
                onChange={() => dice.setScaleType("numDice")}
              />
              Number of Dice
            </label>
          </div>
        )}

        {["rollTotal", "countSuccesses"].includes(dice.systemType) && (
          <div className="flex justify-center">
            <label className="flex gap-1 w-35 justify-start">
              <input
                className="accent-space-blue"
                type="radio"
                name="scale"
                checked={dice.scaleType === "mod"}
                onChange={() => dice.setScaleType("mod")}
              />
              Modifier
            </label>
          </div>
        )}

        {["highestDie"].includes(dice.systemType) && (
          <div className="flex justify-center">
            <label className="flex gap-1 w-35 justify-start">
              <input
                className="accent-space-blue"
                type="radio"
                name="scale"
                checked={dice.scaleType === "numDrop"}
                onChange={() => dice.setScaleType("numDrop")}
              />
              Drop Highest
            </label>
          </div>
        )}
      </div>
    );
}