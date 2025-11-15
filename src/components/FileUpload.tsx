import React from 'react';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';
import { downloadExcelTemplate } from '../utils/excelParser';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading = false }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
      // Reset the input so the same file can be uploaded again if needed
      event.target.value = '';
    }
  };

  const handleDownloadTemplate = () => {
    downloadExcelTemplate();
  };

  return (
    <div className="flex items-center gap-3">
      {/* Download Template Button */}
      <button
        onClick={handleDownloadTemplate}
        className="flex items-center gap-2 px-4 py-2 font-medium transition-all border rounded-lg shadow-sm bg-secondary hover:bg-accent text-secondary-foreground border-border"
        title="Download Excel template"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Template</span>
      </button>

      {/* Upload Button */}
      <div className="relative">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          id="excel-upload"
          disabled={isLoading}
        />
        <label
          htmlFor="excel-upload"
          className={`flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium shadow-sm transition-all cursor-pointer ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 rounded-full border-primary-foreground border-t-transparent animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>Upload Excel</span>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

interface UploadInstructionsProps {
  onClose?: () => void;
}

export const UploadInstructions: React.FC<UploadInstructionsProps> = ({ onClose }) => {
  return (
    <div className="p-4 mb-6 border rounded-lg bg-muted border-border">
      <div className="flex items-start gap-3">
        <FileSpreadsheet className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="mb-2 font-semibold text-foreground">
            Upload Your Client Data
          </h3>
          <p className="mb-3 text-sm text-muted-foreground">
            Replace the mock data with your actual client metrics by uploading an Excel file with the following columns:
          </p>
          <div className="p-3 mb-3 border rounded bg-background border-border">
            <code className="text-xs text-foreground">
              client_id, client_name, industry, mrr, pipeline_value, leads_count, 
              conversions_count, conversion_rate, cac, growth_rate, status
            </code>
          </div>
          <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
            <li>Download the template to see the expected format</li>
            <li>Status can be: healthy, at-risk, or critical</li>
            <li>Growth rate should be a percentage (e.g., 15.5 for 15.5%)</li>
            <li>The dashboard and AI insights will update automatically</li>
          </ul>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
