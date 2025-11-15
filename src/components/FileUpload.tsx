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
        className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium shadow-sm transition-all"
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
          className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-all cursor-pointer ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <FileSpreadsheet className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            Upload Your Client Data
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
            Replace the mock data with your actual client metrics by uploading an Excel file with the following columns:
          </p>
          <div className="bg-white dark:bg-slate-800 rounded p-3 mb-3">
            <code className="text-xs text-slate-700 dark:text-slate-300">
              client_id, client_name, industry, mrr, pipeline_value, leads_count, 
              conversions_count, conversion_rate, cac, growth_rate, status
            </code>
          </div>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
            <li>Download the template to see the expected format</li>
            <li>Status can be: healthy, at-risk, or critical</li>
            <li>Growth rate should be a percentage (e.g., 15.5 for 15.5%)</li>
            <li>The dashboard and AI insights will update automatically</li>
          </ul>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
