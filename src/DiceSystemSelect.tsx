import { useDice } from "./store/store";

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

          <label className="flex flex-row items-center gap-1">
            <div className="text-xs text-gray-400">Success Threshold</div>
            <input
              type="number"
              placeholder="Success Threshold"
              value={dice.successThreshold}
              onChange={(e) => dice.setSuccessThreshold(Number(e.target.value))}
              className="flex justify-between border rounded px-1 w-10 bg-white"
            />
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

          <label className="flex flex-row items-center gap-1">
            <div className="text-xs text-gray-400">Drop Highest</div>
            <input
              type="number"
              placeholder="Drop Number"
              value={dice.dropNumber}
              onChange={(e) => dice.setDropNumber(Number(e.target.value))}
              className="flex justify-between border rounded px-1 w-10 bg-white"
            />
          </label>
        </div>
      </div>
    );
}