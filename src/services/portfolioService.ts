import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Define the types for your portfolio data
export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
}

export interface AboutData {
  description: string;
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
