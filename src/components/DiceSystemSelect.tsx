import { useDice } from "../store/store";

export default function DiceSystemSelect() {
  const dice = useDice((state) => state);

  function setRollTotal() {
    dice.setSystemType("rollTotal");
    dice.setScaleType("mod");
    dice.setSuccessThreshold2(0);
    dice.setSuccessThreshold3(0);
  }
  
  function setCountSuccesses() {
    dice.setSystemType("countSuccesses");
    dice.setScaleType("numDice");
    dice.setSuccessThreshold2(0);
    dice.setSuccessThreshold3(0);
  }
  
  function setHighestDie() {
    dice.setSystemType("highestDie");
    dice.setScaleType("numDice");
  }
  
    return (
      <div className="flex flex-col gap-2 p-1 w-80">
        <div className="flex justify-center">
          <label className="flex gap-1 w-35 justify-start">
            <input
              className="accent-space-blue"
              type="radio"
              name="system"
              checked={dice.systemType === "rollTotal"}
              onChange={() => setRollTotal()}
            />
            Roll Total
          </label>
        </div>

        <div className="flex justify-center">
          <label className="flex gap-1 w-35 justify-start">
            <input
              className="accent-space-blue"
              type="radio"
              name="system"
              checked={dice.systemType === "countSuccesses"}
              onChange={() => setCountSuccesses()}
            />
            Count Successes
          </label>
        </div>

        <div className="flex justify-center">
          <label className="flex gap-1 w-35 justify-start">
            <input
              className="accent-space-blue"
              type="radio"
              name="system"
              checked={dice.systemType === "highestDie"}
              onChange={() => setHighestDie()}
            />
            Highest Die
          </label>
        </div>
      </div>
    );
}