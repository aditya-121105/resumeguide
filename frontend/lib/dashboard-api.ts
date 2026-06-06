import api from "./api";

export const getDashboardData = async () => {

  const response = await api.get(
    "/analysis/dashboard"
  );

  return response.data;
};