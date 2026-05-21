import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock AsyncStorage
const mockStorage: Record<string, string> = {};

const mockAsyncStorage = {
  setItem: vi.fn(async (key: string, value: string) => {
    mockStorage[key] = value;
    return null;
  }),
  getItem: vi.fn(async (key: string) => {
    return mockStorage[key] || null;
  }),
  removeItem: vi.fn(async (key: string) => {
    delete mockStorage[key];
    return null;
  }),
  clear: vi.fn(async () => {
    Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
    return null;
  }),
};

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: mockAsyncStorage,
}));

describe('History Storage', () => {
  beforeEach(() => {
    Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
    vi.clearAllMocks();
  });

  it('saves and retrieves history', async () => {
    const entry = { date: new Date().toISOString(), madhab: 'hanafi', netTotal: 1000, shares: [] };
    await mockAsyncStorage.setItem('merath_history', JSON.stringify([entry]));
    const stored = await mockAsyncStorage.getItem('merath_history');
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].netTotal).toBe(1000);
  });

  it('handles empty history', async () => {
    const stored = await mockAsyncStorage.getItem('merath_history');
    expect(stored).toBeNull();
  });

  it('appends to existing history', async () => {
    const entry1 = { date: '2026-05-20', madhab: 'hanafi', netTotal: 1000, shares: [] };
    const entry2 = { date: '2026-05-21', madhab: 'maliki', netTotal: 2000, shares: [] };

    await mockAsyncStorage.setItem('merath_history', JSON.stringify([entry1]));
    const stored1 = await mockAsyncStorage.getItem('merath_history');
    const parsed1 = JSON.parse(stored1!);

    const updated = [...parsed1, entry2];
    await mockAsyncStorage.setItem('merath_history', JSON.stringify(updated));
    const stored2 = await mockAsyncStorage.getItem('merath_history');
    const parsed2 = JSON.parse(stored2!);

    expect(parsed2).toHaveLength(2);
    expect(parsed2[1].madhab).toBe('maliki');
  });
});
