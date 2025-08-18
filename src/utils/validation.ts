import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');

export const phoneSchema = z.string()
  .min(10, 'Phone number must be at least 10 digits')
  .regex(/^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/, 'Invalid phone number format');

export const nationalIdSchema = z.string()
  .min(9, 'National ID must be at least 9 characters')
  .max(15, 'National ID must be no more than 15 characters');

export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be no more than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number');

export const addressSchema = z.string()
  .min(10, 'Address must be at least 10 characters')
  .max(200, 'Address must be no more than 200 characters');

export const loanAmountSchema = z.number()
  .min(100, 'Minimum loan amount is $100')
  .max(5000, 'Maximum loan amount is $5,000');

export const loanTermSchema = z.number()
  .min(2, 'Minimum loan term is 2 weeks')
  .max(26, 'Maximum loan term is 26 weeks (6 months)');

// Utility functions for validation
export function validateBahamianNationalId(id: string): boolean {
  // Basic format validation for Bahamian National ID
  // This is a simplified version - actual validation would be more complex
  return /^[0-9]{9,12}$/.test(id.replace(/\s|-/g, ''));
}

export function validateBahamianPhoneNumber(phone: string): boolean {
  // Validate Bahamian phone numbers (+1 242 area code)
  const cleaned = phone.replace(/\D/g, '');
  return /^(1)?242[0-9]{7}$/.test(cleaned);
}

export function validateAge(dateOfBirth: string): { isValid: boolean; age?: number } {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()) 
    ? age - 1 
    : age;
  
  return {
    isValid: actualAge >= 18,
    age: actualAge
  };
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>"/\\&]/g, '');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-BS', {
    style: 'currency',
    currency: 'BSD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}