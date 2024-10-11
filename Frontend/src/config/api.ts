const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error(
    "A URL base da API não foi definida. Verifique o arquivo .env."
  );
}

const apiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

export default apiUrl;