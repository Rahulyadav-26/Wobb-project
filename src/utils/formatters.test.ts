import { describe, it, expect } from 'vitest';
import { formatFollowers } from './formatters';

describe('formatFollowers', () => {
  it('should format numbers in millions correctly', () => {
    expect(formatFollowers(2500000)).toBe('2.5M');
    expect(formatFollowers(1000000)).toBe('1.0M');
  });

  it('should format numbers in thousands correctly', () => {
    expect(formatFollowers(1500)).toBe('1.5K');
    expect(formatFollowers(999999)).toBe('1000.0K');
  });

  it('should return the raw number string for numbers under 1000', () => {
    expect(formatFollowers(999)).toBe('999');
    expect(formatFollowers(0)).toBe('0');
  });
});
