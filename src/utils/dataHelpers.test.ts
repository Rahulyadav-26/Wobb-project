import { describe, it, expect } from 'vitest';
import { filterProfiles } from './dataHelpers';
import type { UserProfileSummary } from '@/types';

const mockProfiles: UserProfileSummary[] = [
  {
    user_id: '1',
    username: 'mrbeast',
    fullname: 'Jimmy Donaldson',
    picture: 'url',
    is_verified: true,
    followers: 1000,
  },
  {
    user_id: '2',
    username: 'pewdiepie',
    fullname: 'Felix Kjellberg',
    handle: '@pewdiepie',
    picture: 'url',
    is_verified: true,
    followers: 1000,
  }
];

describe('filterProfiles', () => {
  it('should return all profiles when query is empty', () => {
    const result = filterProfiles(mockProfiles, '');
    expect(result).toHaveLength(2);
  });

  it('should filter profiles by username (case-insensitive)', () => {
    const result = filterProfiles(mockProfiles, 'BEAST');
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe('mrbeast');
  });

  it('should filter profiles by fullname', () => {
    const result = filterProfiles(mockProfiles, 'Felix');
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe('pewdiepie');
  });

  it('should filter profiles by handle', () => {
    const result = filterProfiles(mockProfiles, '@pew');
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe('pewdiepie');
  });

  it('should return an empty array if no match is found', () => {
    const result = filterProfiles(mockProfiles, 'NonExistentUser123');
    expect(result).toHaveLength(0);
  });
});
