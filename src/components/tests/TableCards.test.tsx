import { render, screen, fireEvent } from "@testing-library/react";
import { TableCard, type Table } from "../TableCard";

import { describe, it, expect, beforeEach, jest } from "@jest/globals";
describe("TableCard", () => {
  const mockClick = jest.fn();

  beforeEach(() => {
    mockClick.mockClear();
  });

  it("renders table number and status", () => {
    const table: Table = { id: 1, number: 5, status: "available" };
    render(<TableCard table={table} onClick={mockClick} />);
    expect(screen.getByText("Table 5")).toBeInTheDocument();
    expect(screen.getByText("available")).toBeInTheDocument();
  });

  it("does not call onClick when table is occupied", () => {
    const table: Table = { id: 2, number: 2, status: "occupied" };
    render(<TableCard table={table} onClick={mockClick} />);
    fireEvent.click(screen.getByText("Table 2"));
    expect(mockClick).not.toHaveBeenCalled();
  });

  it("calls onClick when table is available", () => {
    const table: Table = { id: 3, number: 3, status: "available" };
    render(<TableCard table={table} onClick={mockClick} />);
    fireEvent.click(screen.getByText("Table 3"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
