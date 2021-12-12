import { render, fireEvent, act, renderHook } from "@testing-library/react";
import useCounter from "../UseCounter";

test("useCounter", () => {
  // 创建一个测试组件，使用 useCounter 的所有逻辑
  const WrapperComponent = () => {
    const { count, increment, decrement } = useCounter();
    return (
      <>
        <button id="btnMinus" onClick={decrement}>
          -
        </button>
        <span id="result">{count}</span>
        <button id="btnAdd" onClick={increment}>
          +
        </button>
      </>
    );
  };

  // 渲染这个测试组件
  render(<WrapperComponent />);

  // 找到页面的三个 DOM 元素用于执行操作以及验证结果
  const btnAdd = document.querySelector("#btnAdd");
  const btnMinus = document.querySelector("#btnMinus");
  const result = document.querySelector("#result");

  // 模拟点击加一按钮
  fireEvent.click(btnAdd);
  // 验证结果是不是 1
  expect(result).toHaveTextContent("1");
  // 模拟点击减一按钮
  fireEvent.click(btnMinus);
  // 验证结果是不是 0
  expect(result).toHaveTextContent("0");
});

test("useCounter", () => {
  const hookResult = {};
  // 创建一个测试组件，仅运行 Hook，不产生任何 UI
  const WrapperComponent = () => {
    // 将 useCounter 的返回值复制给外部的 hookResult 对象
    Object.assign(hookResult, useCounter());
    return null;
  };
  // 渲染测试组件
  render(<WrapperComponent />);

  // 调用 hook 的 increment 方法
  act(() => {
    hookResult.increment();
  });
  // 验证结果为 1
  expect(hookResult.count).toBe(1);
  // 调用 hook 的 decrement 方法
  act(() => {
    hookResult.decrement();
  });
  // 验证结果为 0
  expect(hookResult.count).toBe(0);
});

test("useCounter3", () => {
  // 使用 renderHook API 来调用一个 Hook
  const { result } = renderHook(() => useCounter());
  // Hook 的返回值会存储在 result.current 中
  // 调用加一方法
  act(() => {
    result.current.increment();
  });
  // 验证结果为 1
  expect(result.current.count).toBe(1);
  // 调用减一方法
  act(() => {
    result.current.decrement();
  });
  // 验证结果为 0
  expect(result.current.count).toBe(0);
});
