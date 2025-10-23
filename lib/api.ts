// Frontend API client utilities for Escape Room

import type {
  User,
  Stage,
  GameSession,
  StageAttempt,
  LeaderboardEntry,
  CreateUserRequest,
  CreateSessionRequest,
  UpdateSessionRequest,
  CreateAttemptRequest,
  ApiResponse,
} from '@/types/escape-room';

const API_BASE = '/api';

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call error:', error);
    return {
      success: false,
      error: 'Network error',
    };
  }
}

// User API
export const userApi = {
  getAll: () => apiCall<User[]>('/users'),
  
  getById: (id: string) => apiCall<User>(`/users/${id}`),
  
  create: (data: CreateUserRequest) =>
    apiCall<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Stage API
export const stageApi = {
  getAll: () => apiCall<Stage[]>('/stages'),
  
  getById: (id: number) => apiCall<Stage>(`/stages/${id}`),
  
  create: (data: any) =>
    apiCall<Stage>('/stages', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: number, data: any) =>
    apiCall<Stage>(`/stages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (id: number) =>
    apiCall<{ message: string }>(`/stages/${id}`, {
      method: 'DELETE',
    }),
};

// Session API
export const sessionApi = {
  getAll: (userId?: string) => {
    const query = userId ? `?userId=${userId}` : '';
    return apiCall<GameSession[]>(`/sessions${query}`);
  },
  
  getById: (id: string) => apiCall<GameSession>(`/sessions/${id}`),
  
  create: (data: CreateSessionRequest) =>
    apiCall<GameSession>('/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: UpdateSessionRequest) =>
    apiCall<GameSession>(`/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  getUserSessions: (userId: string) =>
    apiCall<GameSession[]>(`/sessions/user/${userId}`),
};

// Attempt API
export const attemptApi = {
  create: (data: CreateAttemptRequest) =>
    apiCall<StageAttempt>('/attempts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  getBySession: (sessionId: string) =>
    apiCall<StageAttempt[]>(`/attempts/session/${sessionId}`),
};

// Leaderboard API
export const leaderboardApi = {
  getTop: (limit: number = 10) =>
    apiCall<LeaderboardEntry[]>(`/leaderboard?limit=${limit}`),
  
  addEntry: (userId: string, completionTime: number) =>
    apiCall<LeaderboardEntry>('/leaderboard', {
      method: 'POST',
      body: JSON.stringify({ userId, completionTime }),
    }),
  
  getUserBest: (userId: string) =>
    apiCall<LeaderboardEntry & { rank: number }>(`/leaderboard/user/${userId}`),
};

