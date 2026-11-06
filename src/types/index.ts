export interface ServicePlan {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  turnaroundTime: string;
  description: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  bestFor: string;
}

export interface BillAnalysisItem {
  id: string;
  partOrService: string;
  quotedCost: number;
  recommendation: 'REMOVE' | 'KEEP' | 'NEGOTIATE';
  estimatedFairCost: number;
  reason: string;
}

export interface ReviewCase {
  id: string;
  carModel: string;
  year: string;
  location: string;
  serviceType: string;
  originalBill: number;
  finalPaidBill: number;
  totalSaved: number;
  bogusItemsRemoved: string[];
  customerFeedback: string;
  ownerName: string;
  rating: number;
}

export interface CommonScam {
  title: string;
  quotedPrice: string;
  verdict: string;
  whyItsPushed: string;
  whatYouShouldDo: string;
  dealerExcuse: string;
  iconName: string;
}

export interface MechanicDoctor {
  name: string;
  title: string;
  experience: string;
  specialization: string;
  pastCompany: string;
  verifiedBadge: string;
  carsInspected: number;
  avatarUrl: string;
}

export interface ConsultationRequest {
  id?: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  carBrand: string;
  carModel: string;
  carFuelType: 'Petrol' | 'Diesel' | 'CNG' | 'Electric';
  carYear: string;
  odometerReading?: string;
  serviceCenterName?: string;
  estimatedQuotation: number;
  selectedPlan: string;
  notes?: string;
  billFiles?: string[];
  status?: 'SUBMITTED' | 'UNDER_REVIEW' | 'COMPLETED';
  createdAt?: string;
}

