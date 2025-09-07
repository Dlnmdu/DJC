import { Colors } from "../../constants/Colors";

describe("Colors Constants", () => {
  it("has light theme colors defined", () => {
    expect(Colors.light).toBeDefined();
    expect(typeof Colors.light).toBe("object");
  });

  it("has dark theme colors defined", () => {
    expect(Colors.dark).toBeDefined();
    expect(typeof Colors.dark).toBe("object");
  });

  it("light and dark themes have the same color keys", () => {
    const lightKeys = Object.keys(Colors.light).sort();
    const darkKeys = Object.keys(Colors.dark).sort();

    expect(lightKeys).not.toEqual(darkKeys);
  });

  it("all color values are strings", () => {
    Object.values(Colors.light).forEach((color) => {
      expect(typeof color).toBe("string");
    });

    Object.values(Colors.dark).forEach((color) => {
      expect(typeof color).toBe("string");
    });
  });

  it("color values are valid hex colors or color names", () => {
    const colorRegex = /^(#[0-9A-Fa-f]{3,8}|[a-zA-Z]+)$/;

    Object.values(Colors.light).forEach((color) => {
      expect(color).toMatch(colorRegex);
    });

    Object.values(Colors.dark).forEach((color) => {
      expect(color).toMatch(colorRegex);
    });
  });
});
