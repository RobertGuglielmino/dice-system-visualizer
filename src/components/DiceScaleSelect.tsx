import { useDice } from "../store/store";

export default function DiceScaleSelect() {
  const dice = useDice((state) => state);
  
    return (
      <div className="flex flex-col gap-2 p-1 w-80">
        {["countSuccesses", "highestDie"].includes(dice.systemType) && (
          <div>
            <label className="flex gap-1 text-center">
              <input
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
          <div className="flex justify-between">
            <label className="flex gap-1 text-center">
              <input
                type="radio"
                name="scale"
                checked={dice.scaleType === "mod"}
                onChange={() => dice.setScaleType("mod")}
              />
              Modifier
            </label>
          </div>
        )}

        {["highestDie", "countSuccesses"].includes(dice.systemType) && (
          <div className="flex justify-between">
            <label className="flex gap-1 text-center">
              <input
                type="radio"
                name="scale"
                checked={dice.scaleType === "numDrop"}
                onChange={() => dice.setScaleType("numDrop")}
              />
              Number of Dice to Drop
            </label>
          </div>
        )}
      </div>
    );
}