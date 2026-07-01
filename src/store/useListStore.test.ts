import { describe, it, expect, beforeEach } from 'vitest';
import { useListStore } from './useListStore';
import type { UserProfileSummary } from '@/types';

const mockProfile: UserProfileSummary = {
  user_id: '123',
  username: 'testuser',
  fullname: 'Test User',
  picture: 'url',
  is_verified: false,
  followers: 500,
};

describe('useListStore', () => {
  beforeEach(() => {
    useListStore.setState({ savedProfiles: [] });
  });

  it('should start with an empty savedProfiles array', () => {
    const state = useListStore.getState();
    expect(state.savedProfiles).toEqual([]);
  });

  it('should add a profile to the list', () => {
    const { addProfile } = useListStore.getState();
    addProfile(mockProfile, 'instagram');
    
    const state = useListStore.getState();
    expect(state.savedProfiles).toHaveLength(1);
    expect(state.savedProfiles[0].profile.username).toBe('testuser');
    expect(state.savedProfiles[0].platform).toBe('instagram');
  });

  it('should not add duplicate profiles', () => {
    const { addProfile } = useListStore.getState();
    addProfile(mockProfile, 'instagram');
    addProfile(mockProfile, 'instagram'); // duplicate
    
    const state = useListStore.getState();
    expect(state.savedProfiles).toHaveLength(1);
  });

  it('should correctly report if a profile is saved', () => {
    const { addProfile, isProfileSaved } = useListStore.getState();
    
    expect(isProfileSaved('testuser')).toBe(false);
    
    addProfile(mockProfile, 'instagram');
    
    expect(useListStore.getState().isProfileSaved('testuser')).toBe(true);
  });

  it('should remove a profile from the list', () => {
    const { addProfile, removeProfile } = useListStore.getState();
    
    addProfile(mockProfile, 'instagram');
    expect(useListStore.getState().savedProfiles).toHaveLength(1);
    
    removeProfile('testuser');
    expect(useListStore.getState().savedProfiles).toHaveLength(0);
  });
});
