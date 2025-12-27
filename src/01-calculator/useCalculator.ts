import { useReducer } from "react";
import { MyCalculatorReducer, getInitialState } from "./MyCalculatorReducer";

import type { OperationTypes } from "./MyCalculatorReducer";

const useCalculator = () => {
  const [state, dispatch] = useReducer(MyCalculatorReducer, getInitialState());

  const addDigit = (value: string) => {
    dispatch({ type: "UPDATE_VALUE", payload: value });
  };

  const deleteLast = () => {
    dispatch({ type: "DELETE_LAST" });
  };

  const deleteValue = () => {
    dispatch({ type: "DELETE_VALUE" });
  };

  const setOperation = (operation: OperationTypes) => {
    dispatch({ type: "SET_OPERATION", payload: operation });
  };

  const clean = () => {
    dispatch({ type: "CLEAN_VALUES" });
  };

  const resolve = () => {
    if (!state.operation || state.secondValue === "") return;

    dispatch({ type: "RESOLVE_OPERATION" });
  };

  return {
    state,

    addDigit,
    deleteLast,
    deleteValue,
    clean,
    setOperation,
    resolve,
  };
};

export default useCalculator;
