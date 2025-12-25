export type OperationTypes = "+" | "-" | "÷" | "x" | null;

interface CalculatorState {
  firstValue: string;
  secondValue: string;
  operation: OperationTypes;
}

export type CalculatorAction =
  | { type: "CLEAN_VALUES" }
  | { type: "DELETE_LAST" }
  | { type: "RESOLVE_OPERATION" }
  | { type: "SET_OPERATION"; payload: OperationTypes }
  | { type: "UPDATE_VALUE"; payload: string }
  | { type: "DELETE_VALUE" };

export const getInitialState = (): CalculatorState => {
  return {
    firstValue: "0",
    secondValue: "",
    operation: null,
  };
};

const resolveOperation = (
  a: number,
  b: number,
  operation: OperationTypes
): number => {
  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "÷":
      return a / b;
    default:
      return 0;
  }
};

export const MyCalculatorReducer = (
  states: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  switch (action.type) {
    case "UPDATE_VALUE": {
      const introducedValue = action.payload;
      let newValue = "";

      if (!states.operation) {
        newValue =
          states.firstValue === "0" || states.firstValue === "ERROR"
            ? introducedValue
            : states.firstValue + introducedValue;

        return {
          ...states,
          firstValue: newValue,
        };
      }

      newValue =
        states.secondValue === "0"
          ? introducedValue
          : states.secondValue + introducedValue;
      return {
        ...states,
        secondValue: newValue,
      };
    }
    case "SET_OPERATION": {
      if (states.operation !== null || states.firstValue === "ERROR") {
        return states;
      }

      return {
        ...states,
        operation: action.payload,
      };
    }
    case "CLEAN_VALUES":
      return getInitialState();
    case "RESOLVE_OPERATION": {
      const a = Number(states.firstValue);
      const b = Number(states.secondValue);

      if (b === 0) {
        return {
          firstValue: "ERROR",
          secondValue: "",
          operation: null,
        };
      }
      const result = resolveOperation(a, b, states.operation);

      return {
        ...states,
        firstValue: result.toString(),
        secondValue: "",
        operation: null,
      };
    }
    case "DELETE_LAST": {
      if (!states.operation && states.firstValue.trim() === "0") return states;

      if (!states.operation) {
        return {
          ...states,
          firstValue:
            states.firstValue.length === 1
              ? "0"
              : states.firstValue.slice(0, -1),
        };
      }

      if (states.secondValue.trim() === "") return states;

      return {
        ...states,
        secondValue:
          states.secondValue.length === 1
            ? "0"
            : states.secondValue.slice(0, -1),
      };
    }
    case "DELETE_VALUE": {
      if (states.operation) {
        return {
          ...states,
          secondValue: "0",
        };
      }

      return {
        ...states,
        firstValue: "0",
      };
    }

    default:
      return states;
  }
};
