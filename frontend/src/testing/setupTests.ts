import '@testing-library/jest-dom';
jest.mock("../config/api", () => ({
  API_BASE_URL: "http://foo-api.bar",
}));
window.alert = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
});