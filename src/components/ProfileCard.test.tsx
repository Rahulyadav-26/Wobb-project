import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProfileCard } from './ProfileCard';
import { useListStore } from '@/store/useListStore';
import type { UserProfileSummary } from '@/types';

// Mock the formatters since we unit test them separately
vi.mock('@/utils/formatters', () => ({
  formatFollowers: (num: number) => `${num} formatted`,
}));

const mockProfile: UserProfileSummary = {
  user_id: '1',
  username: 'mrbeast',
  fullname: 'Jimmy Donaldson',
  picture: 'https://example.com/pic.jpg',
  is_verified: true,
  followers: 1000000,
  avg_views: 500000,
};

describe('ProfileCard Component', () => {
  beforeEach(() => {
    useListStore.setState({ savedProfiles: [] });
  });

  it('renders profile information correctly', () => {
    render(
      <MemoryRouter>
        <ProfileCard profile={mockProfile} platform="youtube" />
      </MemoryRouter>
    );

    expect(screen.getByText('Jimmy Donaldson')).toBeInTheDocument();
    expect(screen.getByText('@mrbeast')).toBeInTheDocument();
    
    // Check if stats are rendered via our mock formatter
    expect(screen.getByText('1000000 formatted')).toBeInTheDocument(); // Followers
    expect(screen.getByText('500000 formatted')).toBeInTheDocument(); // Views
  });

  it('toggles the save state when the heart button is clicked', () => {
    render(
      <MemoryRouter>
        <ProfileCard profile={mockProfile} platform="youtube" />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /save to list/i });
    expect(toggleButton).toBeInTheDocument();

    // Click to save
    fireEvent.click(toggleButton);
    
    // The aria-label should now reflect it's saved
    expect(screen.getByRole('button', { name: /remove from list/i })).toBeInTheDocument();
    
    // Verify Zustand store was updated
    expect(useListStore.getState().isProfileSaved('mrbeast')).toBe(true);
    
    // Click to remove
    fireEvent.click(screen.getByRole('button', { name: /remove from list/i }));
    
    expect(useListStore.getState().isProfileSaved('mrbeast')).toBe(false);
  });

  it('calls onProfileClick when the card is clicked', () => {
    const handleProfileClick = vi.fn();

    render(
      <MemoryRouter>
        <ProfileCard profile={mockProfile} platform="youtube" onProfileClick={handleProfileClick} />
      </MemoryRouter>
    );

    // Find the article tag (which acts as the card wrapper)
    const card = screen.getByRole('article');
    fireEvent.click(card);

    expect(handleProfileClick).toHaveBeenCalledWith('mrbeast');
    expect(handleProfileClick).toHaveBeenCalledTimes(1);
  });
});
