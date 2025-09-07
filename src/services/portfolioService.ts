import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Define the types for your portfolio data
export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
}

export interface AboutData {
  heading: string;
  description: string;
  resume: {
    heading: string;
    description: string;
  };
  journey: {
    heading: string;
    description: string;
  };
  metrics: {
    projects: number;
    experience: number;
  };
  skills: Array<{ name: string; icon: string; description: string }>;
}

// ... Define other section data types (Experience, Education, etc.)

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  // ... other sections
}

const PORTFOLIO_DOC_ID = "main"; // Using a single document for all portfolio data
const portfolioDocRef = doc(db, "portfolio", PORTFOLIO_DOC_ID);

/**
 * Fetches the entire portfolio data object from Firestore.
 * @returns A promise that resolves to the portfolio data.
 */
export const getPortfolioData = async (): Promise<PortfolioData | null> => {
  const docSnap = await getDoc(portfolioDocRef);
  if (docSnap.exists()) {
    return docSnap.data() as PortfolioData;
  }
  return null; // Or return a default structure
};

/**
 * Fetches a specific section of the portfolio data from Firestore.
 * @param section - The key of the section to fetch (e.g., 'hero').
 * @returns A promise that resolves to the section's data.
 */
export const getPortfolioSectionData = async <T>(
  section: keyof PortfolioData
): Promise<T | null> => {
  const docSnap = await getDoc(portfolioDocRef);
  if (docSnap.exists()) {
    return (docSnap.data()[section] as T) ?? null;
  }
  return null;
};

/**
 * Updates a specific section of the portfolio data in Firestore.
 * @param section - The key of the section to update (e.g., 'hero', 'about').
 * @param data - The new data for the section.
 */
export const updatePortfolioSection = async (
  section: keyof PortfolioData,
  data: any
) => {
  await setDoc(portfolioDocRef, { [section]: data }, { merge: true });
};
