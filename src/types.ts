export type Language = 'en' | 'kn' | 'hi';

export type FoodId = 'milk' | 'turmeric' | 'chilli' | 'oil' | 'rice' | 'sugar';

export type TestStatus = 'normal' | 'suspicious' | 'inconclusive';
export type RiskLevel = 'low' | 'moderate' | 'high';

export interface DARTStep {
  stepNumber: number;
  title: Record<Language, string>;
  instruction: Record<Language, string>;
  visualHint: string;
}

export interface DARTTest {
  id: string;
  name: Record<Language, string>;
  targetAdulterant: Record<Language, string>;
  equipment: Record<Language, string[]>;
  estimatedMinutes: number;
  precautions: Record<Language, string[]>;
  steps: DARTStep[];
  pureOutcome: Record<Language, string>;
  adulteratedOutcome: Record<Language, string>;
}

export interface SampleImagePreset {
  id: string;
  label: Record<Language, string>;
  expectedStatus: TestStatus;
  description: Record<Language, string>;
  dataUrl: string;
}

export interface FoodItem {
  id: FoodId;
  name: Record<Language, string>;
  tagline: Record<Language, string>;
  category: Record<Language, string>;
  commonAdulterants: Record<Language, string[]>;
  iconName: string;
  colorScheme: {
    primary: string;
    light: string;
    badge: string;
    border: string;
  };
  dartTests: DARTTest[];
  sampleImages: SampleImagePreset[];
}

export interface AnalysisResult {
  status: TestStatus;
  confidenceScore: number;
  riskLevel: RiskLevel;
  adulterantSuspected: string;
  detectedCharacteristics: string[];
  visualExplanation: string;
  recommendations: string[];
  fssaiStandardReference: string;
  disclaimer: string;
  source: 'gemini-3.8-flash' | 'heuristic-simulation';
}

export interface SafetyReport {
  id: string;
  foodId: string;
  foodName: string;
  state: string;
  city: string;
  locality: string;
  coordinates: [number, number];
  testName: string;
  status: TestStatus;
  riskLevel: RiskLevel;
  suspectedAdulterant: string;
  vendorType: 'Local Grocer' | 'Supermarket' | 'Loose Milk Vendor' | 'Street Vendor' | 'Branded Packet';
  reportedDate: string;
  userNotes: string;
  verifiedByLocalLab: boolean;
}
