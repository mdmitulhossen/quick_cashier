import { LoanCalculation, PaymentScheduleItem } from '../types';
import { addWeeks, format } from 'date-fns';

export function calculateLoan(
  principalAmount: number, 
  termWeeks: number, 
  startDate: Date = new Date()
): LoanCalculation {
  // Determine APR based on loan amount and term (Bahamian market rates)
  let apr = 0.15; // Base 15% APR
  
  // Risk-based pricing adjustments
  if (principalAmount < 500) {
    apr = 0.30; // 30% for small loans
  } else if (principalAmount < 1000) {
    apr = 0.25; // 25% for medium loans  
  } else if (principalAmount < 2500) {
    apr = 0.20; // 20% for larger loans
  }
  
  // Term-based adjustments
  if (termWeeks <= 4) {
    apr += 0.05; // +5% for very short term
  } else if (termWeeks >= 20) {
    apr -= 0.02; // -2% for longer term
  }
  
  // Ensure APR stays within regulatory limits (15% - 35%)
  apr = Math.max(0.15, Math.min(0.35, apr));
  
  // Calculate using simple interest method (required in Bahamas)
  const totalInterest = (principalAmount * apr * termWeeks) / 52;
  const totalRepayment = principalAmount + totalInterest;
  const weeklyPayment = totalRepayment / termWeeks;
  const monthlyPayment = weeklyPayment * 4.33; // Average weeks per month
  
  // Generate payment schedule
  const paymentSchedule: PaymentScheduleItem[] = [];
  let remainingBalance = totalRepayment;
  
  for (let i = 1; i <= termWeeks; i++) {
    const dueDate = addWeeks(startDate, i);
    const paymentAmount = i === termWeeks ? remainingBalance : weeklyPayment;
    const interestPortion = totalInterest / termWeeks;
    const principalPortion = paymentAmount - interestPortion;
    
    remainingBalance -= paymentAmount;
    
    paymentSchedule.push({
      paymentNumber: i,
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      paymentAmount: Math.round(paymentAmount * 100) / 100,
      principalAmount: Math.round(principalPortion * 100) / 100,
      interestAmount: Math.round(interestPortion * 100) / 100,
      remainingBalance: Math.max(0, Math.round(remainingBalance * 100) / 100),
    });
  }
  
  return {
    principalAmount,
    termWeeks,
    apr: Math.round(apr * 1000) / 10, // Convert to percentage with 1 decimal
    weeklyPayment: Math.round(weeklyPayment * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
    paymentSchedule,
  };
}

export function validateLoanAmount(amount: number): { isValid: boolean; message?: string } {
  if (amount < 100) {
    return { isValid: false, message: 'Minimum loan amount is $100' };
  }
  if (amount > 5000) {
    return { isValid: false, message: 'Maximum loan amount is $5,000' };
  }
  return { isValid: true };
}

export function validateLoanTerm(weeks: number): { isValid: boolean; message?: string } {
  if (weeks < 2) {
    return { isValid: false, message: 'Minimum loan term is 2 weeks' };
  }
  if (weeks > 26) {
    return { isValid: false, message: 'Maximum loan term is 6 months (26 weeks)' };
  }
  return { isValid: true };
}

export function calculateAffordability(
  monthlyIncome: number, 
  monthlyExpenses: number, 
  monthlyPayment: number
): { canAfford: boolean; dtiRatio: number; disposableIncome: number } {
  const disposableIncome = monthlyIncome - monthlyExpenses;
  const dtiRatio = (monthlyPayment / monthlyIncome) * 100;
  
  // DTI should not exceed 25% for responsible lending
  const canAfford = dtiRatio <= 25 && disposableIncome >= monthlyPayment * 1.2;
  
  return {
    canAfford,
    dtiRatio: Math.round(dtiRatio * 10) / 10,
    disposableIncome: Math.round(disposableIncome * 100) / 100,
  };
}