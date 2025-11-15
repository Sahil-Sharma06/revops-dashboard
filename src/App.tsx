import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { mockPortfolioData } from './data/mockData';
import { parseExcelFile } from './utils/excelParser';
import { PortfolioData } from './data/types';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(mockPortfolioData);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoadingData(true);
    setUploadError(null);

    try {
      const parsedData = await parseExcelFile(file);
      setPortfolioData(parsedData);
    } catch (error) {
      console.error('Error parsing Excel file:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to parse Excel file');
    } finally {
      setIsLoadingData(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="App">
        {uploadError && (
          <div className="fixed z-50 max-w-md p-4 bg-card border-2 border-foreground rounded-lg shadow-lg top-4 right-4">
            <div className="flex items-start">
              <div className="flex-1">
                <p className="font-semibold text-foreground">Upload Error</p>
                <p className="mt-1 text-sm text-muted-foreground">{uploadError}</p>
              </div>
              <button
                onClick={() => setUploadError(null)}
                className="ml-4 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        <Dashboard 
          portfolioData={portfolioData} 
          onFileUpload={handleFileUpload}
          isLoadingData={isLoadingData}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
