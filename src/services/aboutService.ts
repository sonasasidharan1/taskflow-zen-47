import { updatePortfolioSection } from "./portfolioService";

export const updateAboutData = (data: any) =>
  updatePortfolioSection("about", data);
