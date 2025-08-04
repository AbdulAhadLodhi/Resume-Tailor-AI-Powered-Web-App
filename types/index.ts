// types/index.ts - Create this file in your project root

// User Profile Interface
export interface UserProfile {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
}

// Work Experience Interface
export interface WorkExperience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

// Skills Interface
export interface Skill {
  id: number;
  name: string;
  category: 'Programming' | 'Design' | 'Management' | 'Marketing' | 'Other';
  proficiency: number; // 0-100
}

// Education Interface
export interface Education {
  id: number;
  type: 'degree' | 'diploma' | 'certificate' | 'course';
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

// Certification Interface
export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
}

// Form state interfaces for new items
export interface NewWorkExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface NewSkill {
  name: string;
  category: 'Programming' | 'Design' | 'Management' | 'Marketing' | 'Other';
  proficiency: number;
}

export interface NewEducation {
  type: 'degree' | 'diploma' | 'certificate' | 'course';
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface NewCertification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
}

// Dashboard component props and state types
export type DashboardSection = 'profile' | 'experience' | 'skills' | 'education';

// Function parameter types
export type UpdateExperienceFunction = (id: number, updatedExperience: Partial<WorkExperience>) => void;
export type UpdateSkillFunction = (id: number, updatedSkill: Partial<Skill>) => void;
export type UpdateEducationFunction = (id: number, updatedEducation: Partial<Education>) => void;
export type UpdateCertificationFunction = (id: number, updatedCertification: Partial<Certification>) => void;

export type DeleteFunction = (id: number) => void;

// Event handler types
export type ProfileUpdateFunction = (field: keyof UserProfile, value: string) => void;

