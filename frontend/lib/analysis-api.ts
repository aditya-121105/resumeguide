// lib/analysis-api.ts

import api from "./api";

export const getAnalysisHistory = async () => {
  const response = await api.get(
    "/analysis/history"
  );

  return response.data;
};

export const getAnalysisDetails = async (
  analysisId: number
) => {

  const response = await api.get(
    `/analysis/details/${analysisId}`
  );

  return response.data;
};