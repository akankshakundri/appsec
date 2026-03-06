import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Vulnerability {
  id: string;
  title: string;
  description: string;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  remediation: string;
  example: string;
}

export interface SecurePractice {
  id: string;
  title: string;
  description: string;
  tips: string[];
}

export interface TestingMethod {
  id: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
}
