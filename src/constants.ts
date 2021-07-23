const isProduction = process.env.NODE_ENV === "production";

export const DOMAIN = isProduction
  ? "https://se-challenge-payroll-backend.herokuapp.com"
  : "http://127.0.0.1:8000";
