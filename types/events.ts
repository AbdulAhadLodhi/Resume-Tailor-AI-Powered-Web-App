// types/events.ts - Additional event handler types

import { ChangeEvent } from 'react';
import {
  UserProfile,
  WorkExperience,
  Skill,
  Education,
  Certification,
  NewWorkExperience,
  NewSkill,
  NewEducation,
  NewCertification
} from './index';

// Event handler types for form inputs
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type TextareaChangeEvent = ChangeEvent<HTMLTextAreaElement>;
export type SelectChangeEvent = ChangeEvent<HTMLSelectElement>;

// State setter types for new items
export type SetNewExperienceState = React.Dispatch<React.SetStateAction<NewWorkExperience>>;
export type SetNewSkillState = React.Dispatch<React.SetStateAction<NewSkill>>;
export type SetNewEducationState = React.Dispatch<React.SetStateAction<NewEducation>>;
export type SetNewCertificationState = React.Dispatch<React.SetStateAction<NewCertification>>;

// Modal state setters
export type SetModalState = React.Dispatch<React.SetStateAction<boolean>>;

// Editing state setters
export type SetEditingState = React.Dispatch<React.SetStateAction<number | null>>;

// API Response types (for future Supabase integration)
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Supabase table types (adjust these based on your actual database schema)
export interface ProfileTable extends UserProfile {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ExperienceTable extends Omit<WorkExperience, 'id'> {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface SkillTable extends Omit<Skill, 'id'> {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface EducationTable extends Omit<Education, 'id'> {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CertificationTable extends Omit<Certification, 'id'> {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Date formatting helpers
export interface DateDisplayOptions {
  showDay?: boolean;
  showYear?: boolean;
  format?: 'short' | 'long' | 'numeric';
}

// Export utility functions for type checking
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Skill category validation
export const isValidSkillCategory = (category: string): category is Skill['category'] => {
  return ['Programming', 'Design', 'Management', 'Marketing', 'Other'].includes(category);
};

// Education type validation
export const isValidEducationType = (type: string): type is Education['type'] => {
  return ['degree', 'diploma', 'certificate', 'course'].includes(type);
};