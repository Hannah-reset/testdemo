// 引入 testing-library 提供的相关工具
import { render, screen } from "@testing-library/react";
// 引入要测试的组件
import App from "../App";

// 创建一个测试用例
test("renders learn react link", () => {
  // 使用 render 方法渲染 App 组件
  render(<App />);
  // 通过 screen 提供的 getByText 找到页面上的 DOM 元素
  const linkElement = screen.getByText(/learn react/i);
  // 断言这个元素应该在页面上
  expect(linkElement).toBeInTheDocument();
});
