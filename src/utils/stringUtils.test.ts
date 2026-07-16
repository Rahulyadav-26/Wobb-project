import { describe, it, expect } from "vitest";
import { truncateText, capitalizeWords } from "./stringUtils";

describe("truncateText", () => {
  it("returns original text when shorter than max", () => {
    expect(truncateText("hello", 10)).toBe("hello");
  });

  it("truncates and adds ellipsis when needed", () => {
    expect(truncateText("abcdefghijklmnopqrstuvwxyz", 10)).toBe("abcdefgh...");
  });

  it("truncates without ellipsis when ellipsis=false", () => {
    expect(truncateText("abcdefghijk", 5, false)).toBe("abcde");
  });

  it("handles small maxLength values", () => {
    expect(truncateText("abcdef", 3)).toBe("abc");
  });
});

describe("capitalizeWords", () => {
  it("returns empty string when input is empty", () => {
    expect(capitalizeWords("")).toBe("");
  });

  it("capitalizes single word correctly", () => {
    expect(capitalizeWords("hello")).toBe("Hello");
  });

  it("capitalizes each word and lowercases the rest", () => {
    expect(capitalizeWords("hElLo woRLd")).toBe("Hello World");
  });

  it("handles multiple spaces and punctuation", () => {
    expect(capitalizeWords("  multiple   words, here!")).toBe(
      "  Multiple   Words, Here!",
    );
  });
});
