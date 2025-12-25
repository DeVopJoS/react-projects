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

  return (
    <div className="min-h-screen flex items-center justify-center h-14 bg-linear-65 from-purple-500 to-pink-500">
      <div className="w-80 rounded-2xl p-4 ">
        {/* Display */}
        <div className="bg-white mb-0.5 h-10 rounded-t-2xl p-2 flex justify-start">
          <div className="h-3 w-3 bg-red-500 rounded-full mr-1"></div>
          <div className="h-3 w-3 bg-green-500 rounded-full mr-1"></div>
          <div className="h-3 w-3 bg-yellow-500 rounded-full mr-1"></div>
        </div>
        <div className="mb-4">
          <div className="bg-white text-end pr-5 text-gray-500">
            {state.operation
              ? `${state.firstValue} ${state.operation}`
              : state.firstValue}
          </div>
          <input
            type="text"
            value={
              !state.operation || !state.secondValue
                ? state.firstValue
                : state.secondValue
            }
            disabled
            className="w-full h-16 text-right text-3xl px-4 bg-white focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <button
            className="btn bg-orange-500 cursor-pointer"
            onClick={deleteValue}
          >
            CE
          </button>
          <button
            className="btn bg-orange-500 cursor-pointer"
            onClick={deleteLast}
          >
            ⌫
          </button>
          <button className="btn bg-orange-500 cursor-pointer">.</button>
          <button
            className="btn bg-orange-500 cursor-pointer"
            onClick={() => setOperation("÷")}
          >
            ÷
          </button>

          <button
            className="btn bg-orange-500 cursor-pointer"
            onClick={() => setOperation("x")}
          >
            ×
          </button>

          <button
            className="btn bg-orange-500 cursor-pointer"
            onClick={() => setOperation("-")}
          >
            −
          </button>

          <button
            className="btn bg-orange-500 cursor-pointer"
            onClick={() => setOperation("+")}
          >
            +
          </button>

          <button className="btn bg-gray-200 cursor-pointer" onClick={clean}>
            C
          </button>

          <button
            className="btn bg-gray-200 cursor-pointer"
            onClick={() => addDigit("7")}
          >
            7
          </button>
          <button
            className="btn bg-gray-200 cursor-pointer"
            onClick={() => addDigit("8")}
          >
            8
          </button>
          <button
            className="btn bg-gray-200 cursor-pointer"
            onClick={() => addDigit("9")}
          >
            9
          </button>

          <button
            className="btn bg-gray-200 cursor-pointer"
            onClick={() => addDigit("0")}
          >
            0
          </button>
          <button
            className="btn bg-gray-200 cursor-pointer"
            onClick={() => addDigit("4")}
          >
            4
          </button>
          <button
            className="btn bg-gray-200 cursor-pointer"
            onClick={() => addDigit("5")}
          >
            5
          </button>

          <button
            className="btn bg-gray-200 cursor-pointer"
            onClick={() => addDigit("6")}
          >
            6
          </button>
          <button
            className="btn bg-gray-200 rounded-bl-2xl cursor-pointer"
            onClick={resolve}
          >
            =
          </button>
          <button
            className="btn bg-gray-200 cursor-pointer"
            onClick={() => addDigit("1")}
          >
            1
          </button>

          <button
            className="btn bg-gray-200 cursor-pointer"
            onClick={() => addDigit("2")}
          >
            2
          </button>

          <button
            className="btn bg-gray-200 rounded-br-2xl cursor-pointer"
            onClick={() => addDigit("3")}
          >
            3
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCalculator;
