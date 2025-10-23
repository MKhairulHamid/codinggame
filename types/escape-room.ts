// Shared TypeScript types for Escape Room feature

export interface User {
  id: string;
  username: string;
  email?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stage {
  id: number;
  title: string;
  description: string;
  type: 'code-format' | 'debug' | 'generate-numbers' | 'data-transform';
  challenge: string;
  solution: string;
  hint: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date | null;
  completed: boolean;
  totalTime?: number | null; // in seconds
  timerDuration: number; // in seconds
  createdAt: Date;
  updatedAt: Date;
}

export interface StageAttempt {
  id: string;
  sessionId: string;
  stageId: number;
  userCode: string;
  successful: boolean;
  hintsUsed: number;
  attemptedAt: Date;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  completionTime: number; // in seconds
  completedAt: Date;
  user?: User;
}

// API Request/Response types
export interface CreateUserRequest {
  username: string;
  email?: string;
}

export interface CreateSessionRequest {
  userId: string;
  timerDuration: number;
}

export interface UpdateSessionRequest {
  endTime?: Date;
  completed?: boolean;
  totalTime?: number;
}

export interface CreateAttemptRequest {
  sessionId: string;
  stageId: number;
  userCode: string;
  successful: boolean;
  hintsUsed: number;
}

export interface CreateStageRequest {
  title: string;
  description: string;
  type: 'code-format' | 'debug' | 'generate-numbers' | 'data-transform';
  challenge: string;
  solution: string;
  hint: string;
  order: number;
}

export interface UpdateStageRequest {
  title?: string;
  description?: string;
  type?: 'code-format' | 'debug' | 'generate-numbers' | 'data-transform';
  challenge?: string;
  solution?: string;
  hint?: string;
  order?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

