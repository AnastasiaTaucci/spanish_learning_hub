import HomeScreen from "@/app/(tabs)/(home)";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ResourceProvider } from "@/context/ResourcesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../data/spanish_links.json";

// Mock the useGetResources hook
jest.mock("@/hooks/useGetResources", () => ({
  __esModule: true, //tells Jest you're mocking an ES module with a default export.
  default: () => ({
    data: mockData,
    isFetching: false,
  }),
}));

const customRender = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ResourceProvider>
        <FavoritesProvider>
          <HomeScreen />
        </FavoritesProvider>
      </ResourceProvider>
    </QueryClientProvider>,
  );
};

describe("HomeScreen", () => {
  it("should render HomeScreen heading and search bar ", async () => {
    customRender();

    expect(
      screen.getByRole("header", { name: /spanish learning hub/i }),
    ).toBeOnTheScreen();

    expect(screen.getByPlaceholderText(/search resources.../i)).toBeTruthy();
  });

  it("should render resources data and filter them by search", () => {
    customRender();

    mockData.forEach((resource) => {
      expect(screen.getByText(resource.title)).toBeOnTheScreen();
    });

    // Simulate a search query
    fireEvent.changeText(
      screen.getByPlaceholderText(/search resources.../i),
      "grammar",
    );

    // Check if the rendered data is filtered
    mockData.forEach((resource) => {
      expect(screen.getByText(resource.title)).toBeOnTheScreen();
    });
  });
});
