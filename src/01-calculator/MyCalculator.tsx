import useCalculator from "./useCalculator";

const MyCalculator = () => {
  const {
    state,
    addDigit,
    clean,
    deleteLast,
    deleteValue,
    setOperation,
    resolve,
  } = useCalculator();

  const numberBtn =
    "h-16 rounded-2xl text-2xl font-medium cursor-pointer transition-all duration-200 bg-[#1A4A52] text-white hover:bg-[#256B75] active:scale-95";
  const operatorBtn =
    "h-16 rounded-2xl text-2xl font-medium cursor-pointer transition-all duration-200 bg-[#2DD4BF] text-[#0E3239] hover:bg-[#5EEAD4] active:scale-95";
  const functionBtn =
    "h-16 rounded-2xl text-xl font-medium cursor-pointer transition-all duration-200 bg-[#0F766E] text-white hover:bg-[#14B8A6] active:scale-95";
  const equalsBtn =
    "h-16 rounded-2xl text-2xl font-bold cursor-pointer transition-all duration-200 bg-[#F97316] text-white hover:bg-[#FB923C] active:scale-95 row-span-2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E3239]">
      <div className="w-80 rounded-3xl p-6 bg-[#0E3239] shadow-2xl shadow-black/50">
        {/* Display */}
        <div className="bg-[#1A4A52] rounded-2xl p-4 mb-6">
          <div className="text-right text-[#5EEAD4] text-sm h-6 opacity-70">
            {state.operation
              ? `${state.firstValue} ${state.operation}`
              : ""}
          </div>
          <div className="text-right text-white text-4xl font-light tracking-wide overflow-hidden">
            {!state.operation || !state.secondValue
              ? state.firstValue
              : state.secondValue}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button className={functionBtn} onClick={clean}>
            AC
          </button>
          <button className={functionBtn} onClick={deleteValue}>
            CE
          </button>
          <button className={functionBtn} onClick={deleteLast}>
            <span className="text-2xl">&#9003;</span>
          </button>
          <button
            className={operatorBtn}
            onClick={() => setOperation("÷")}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button className={numberBtn} onClick={() => addDigit("7")}>
            7
          </button>
          <button className={numberBtn} onClick={() => addDigit("8")}>
            8
          </button>
          <button className={numberBtn} onClick={() => addDigit("9")}>
            9
          </button>
          <button
            className={operatorBtn}
            onClick={() => setOperation("x")}
          >
            ×
          </button>

          {/* Row 3 */}
          <button className={numberBtn} onClick={() => addDigit("4")}>
            4
          </button>
          <button className={numberBtn} onClick={() => addDigit("5")}>
            5
          </button>
          <button className={numberBtn} onClick={() => addDigit("6")}>
            6
          </button>
          <button
            className={operatorBtn}
            onClick={() => setOperation("-")}
          >
            −
          </button>

          {/* Row 4 */}
          <button className={numberBtn} onClick={() => addDigit("1")}>
            1
          </button>
          <button className={numberBtn} onClick={() => addDigit("2")}>
            2
          </button>
          <button className={numberBtn} onClick={() => addDigit("3")}>
            3
          </button>
          <button
            className={operatorBtn}
            onClick={() => setOperation("+")}
          >
            +
          </button>

          {/* Row 5 */}
          <button className={`${numberBtn} col-span-2`} onClick={() => addDigit("0")}>
            0
          </button>
          <button className={numberBtn} onClick={() => addDigit(".")}>
            .
          </button>
          <button className={equalsBtn} onClick={resolve}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCalculator;
