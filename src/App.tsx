import { Dashboard } from './components/Dashboard';
import { mockPortfolioData } from './data/mockData';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Dashboard portfolioData={mockPortfolioData} />
    </ThemeProvider>
  );
}

export default App;