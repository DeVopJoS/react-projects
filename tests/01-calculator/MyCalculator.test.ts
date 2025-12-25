import { test, expect, describe } from "vitest";
import {
  MyCalculatorReducer,
  getInitialState,
} from "@/01-calculator/reducer/MyCalculatorReducer";

describe("arithmetic operations", () => {
  test("Should add two numbers", () => {
    const a = 2;
    const b = 4;
    const expectedResult = a + b;

    // Start with initial state
    let state = getInitialState();

    // Enter first number
    state = MyCalculatorReducer(state, {
      type: "UPDATE_VALUE",
      payload: a.toString(),
    });

    // Set operation
    state = MyCalculatorReducer(state, { type: "SET_OPERATION", payload: "+" });

    // Enter second number
    state = MyCalculatorReducer(state, {
      type: "UPDATE_VALUE",
      payload: b.toString(),
    });

    // Resolve operation
    state = MyCalculatorReducer(state, { type: "RESOLVE_OPERATION" });

    expect(state.firstValue).toBe(expectedResult.toString());
  });

  test("Should subtract two numbers", () => {
    const a = 5;
    const b = 1;
    const expectedResult = a - b;

    // Start with initial state
    let state = getInitialState();

    // Enter first number
    state = MyCalculatorReducer(state, {
      type: "UPDATE_VALUE",
      payload: a.toString(),
    });

    // Set operation
    state = MyCalculatorReducer(state, { type: "SET_OPERATION", payload: "-" });

    // Enter second number
    state = MyCalculatorReducer(state, {
      type: "UPDATE_VALUE",
      payload: b.toString(),
    });

    // Resolve operation
    state = MyCalculatorReducer(state, { type: "RESOLVE_OPERATION" });

    expect(state.firstValue).toBe(expectedResult.toString());
  });

  test("Should multiply two numbers", () => {
    const a = 10;
    const b = 4;
    const expectedResult = a * b;

    // Start with initial state
    let state = getInitialState();

    // Enter first number
    state = MyCalculatorReducer(state, {
      type: "UPDATE_VALUE",
      payload: a.toString(),
    });

    // Set operation
    state = MyCalculatorReducer(state, { type: "SET_OPERATION", payload: "x" });

    // Enter second number
    state = MyCalculatorReducer(state, {
      type: "UPDATE_VALUE",
      payload: b.toString(),
    });

    // Resolve operation
    state = MyCalculatorReducer(state, { type: "RESOLVE_OPERATION" });

    expect(state.firstValue).toBe(expectedResult.toString());
  });

  test("Should divide two numbers", () => {
    const a = 10;
    const b = 5;
    const expectedResult = a / b;

    // Start with initial state
    let state = getInitialState();

    // Enter first number
    state = MyCalculatorReducer(state, {
      type: "UPDATE_VALUE",
      payload: a.toString(),
    });

    // Set operation
    state = MyCalculatorReducer(state, { type: "SET_OPERATION", payload: "÷" });

    // Enter second number
    state = MyCalculatorReducer(state, {
      type: "UPDATE_VALUE",
      payload: b.toString(),
    });

    // Resolve operation
    state = MyCalculatorReducer(state, { type: "RESOLVE_OPERATION" });

    expect(state.firstValue).toBe(expectedResult.toString());
  });

  test("Should return ERROR if denominator is zero", () => {
    const a = 10;
    const b = 0;
    const expectedResult = "ERROR";

    // Start with initial state
    let state = getInitialState();

    // Enter first number
    state = MyCalculatorReducer(state, {
      type: "UPDATE_VALUE",
      payload: a.toString(),
    });

    // Set operation
    state = MyCalculatorReducer(state, { type: "SET_OPERATION", payload: "÷" });

    // Enter second number
    state = MyCalculatorReducer(state, {
      type: "UPDATE_VALUE",
      payload: b.toString(),
    });

    // Resolve operation
    state = MyCalculatorReducer(state, { type: "RESOLVE_OPERATION" });

    expect(state.firstValue).toBe(expectedResult);
  });
});

describe("Clean values", () => {
  test("should clean the last value character of the first value operation", () => {
    const a = "12";
    const valueExpected = "1";

    let state = getInitialState(); // a = 0

    state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: a }); // a = 12

    state = MyCalculatorReducer(state, { type: "DELETE_LAST" });

    expect(state.firstValue).toBe(valueExpected);
  });

  test("should clean the last value character of the second value operation", () => {
    const b = "1000";
    const valueExpected = "100";

    let state = getInitialState(); // b = 0

    // Update first value
    state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: "5" }); // a = 5, b = ''

    state = MyCalculatorReducer(state, { type: "SET_OPERATION", payload: "+" });

    // Update second value
    state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: b }); // a = 5, b = 1000

    state = MyCalculatorReducer(state, { type: "DELETE_LAST" });

    expect(state.secondValue).toBe(valueExpected);
  });

  test("should return all the values to initial state", () => {
    const valueExpected = getInitialState();

    let state = getInitialState();

    // Update first value
    state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: "5" });

    state = MyCalculatorReducer(state, { type: "SET_OPERATION", payload: "+" });

    // Update second value
    state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: "5" });

    state = MyCalculatorReducer(state, { type: "CLEAN_VALUES" });

    expect(state).toMatchObject(valueExpected);
  });

  test("should reset only the second value when DELETE_VALUE is called", () => {
    let state = getInitialState();

    state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: "8" });
    state = MyCalculatorReducer(state, { type: "SET_OPERATION", payload: "+" });
    state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: "5" });

    state = MyCalculatorReducer(state, { type: "DELETE_VALUE" });

    expect(state.secondValue).toBe("0");
    expect(state.firstValue).toBe("8");
  });
});

test("result should be reused as first value", () => {
  let state = getInitialState();

  state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: "2" });
  state = MyCalculatorReducer(state, { type: "SET_OPERATION", payload: "+" });
  state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: "3" });
  state = MyCalculatorReducer(state, { type: "RESOLVE_OPERATION" });

  expect(state.firstValue).toBe("5");
  expect(state.operation).toBeNull();
});

test("should reset ERROR when a new digit is entered", () => {
  let state = getInitialState();

  state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: "5" });
  state = MyCalculatorReducer(state, { type: "SET_OPERATION", payload: "÷" });
  state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: "0" });
  state = MyCalculatorReducer(state, { type: "RESOLVE_OPERATION" });

  state = MyCalculatorReducer(state, { type: "UPDATE_VALUE", payload: "3" });

  expect(state.firstValue).toBe("3");
});
