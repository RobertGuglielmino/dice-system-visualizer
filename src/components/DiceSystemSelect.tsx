import { useDice } from "../store/store";

export default function DiceSystemSelect() {
  const dice = useDice((state) => state);
  
    return (
      <div className="flex flex-col gap-2 p-1 w-80">
        <div>
          <label className="flex gap-1 text-center">
            <input
              type="radio"
              name="system"
              checked={dice.systemType === "rollTotal"}
              onChange={() => dice.setSystemType("rollTotal")}
            />
            Roll Total
          </label>
        </div>

        <div className="flex justify-between">
          <label className="flex gap-1 text-center">
            <input
              type="radio"
              name="system"
              checked={dice.systemType === "countSuccesses"}
              onChange={() => dice.setSystemType("countSuccesses")}
            />
            Count Successes
          </label>
        </div>

        <div className="flex justify-between">
          <label className="flex gap-1 text-center">
            <input
              type="radio"
              name="system"
              checked={dice.systemType === "highestDie"}
              onChange={() => dice.setSystemType("highestDie")}
            />
            Highest Die
          </label>

        </div>
      </div>
    );
}