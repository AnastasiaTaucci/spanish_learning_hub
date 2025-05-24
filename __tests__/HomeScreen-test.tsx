import HomeScreen from "@/app/(tabs)/(home)";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../data/spanish_links.json";

// Mock useResourceContext instead of using ResourceProvider
jest.mock("@/context/ResourcesContext", () => ({
  useResourceContext: jest.fn(() => ({
    resources: mockData,
  })),
}));

// Mock useFavoritesContext (favorites logic mocked out)
jest.mock("@/context/FavoritesContext", () => ({
  useFavoritesContext: jest.fn(() => ({
    favorites: [],
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
  })),
}));

describe("HomeScreen", () => {
  it("should render HomeScreen heading and search bar ", () => {
    render(<HomeScreen />);

    expect(
      screen.getByRole("header", { name: /spanish learning hub/i }),
    ).toBeOnTheScreen();

    expect(
      screen.getByPlaceholderText(/search resources.../i),
    ).toBeOnTheScreen();
  });

  it("should render resources data and filter them by search", () => {
    const mockQuery = "grammar";
    render(<HomeScreen />);

    mockData.forEach((resource) => {
      expect(screen.queryByText(resource.title)).toBeOnTheScreen();
    });

    // Simulate a search query
    fireEvent.changeText(
      screen.getByPlaceholderText(/Search resources.../i),
      mockQuery,
    );

    // Check if the rendered data is filtered
    mockData.forEach((resource) => {
      if (
        resource.title.toLowerCase().includes(mockQuery.toLowerCase()) ||
        resource.group.toLowerCase().includes(mockQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(mockQuery.toLowerCase())
      ) {
        expect(screen.getByText(resource.title)).toBeOnTheScreen();
      } else {
        expect(screen.queryByText(resource.title)).not.toBeOnTheScreen();
      }
    });
  });
});
