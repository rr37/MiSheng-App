// csvLoader.js
import Papa from 'papaparse';

// Load CSV data
export const loadCSVData = async (csvFile) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      download: true,
      complete: (result) => resolve(result.data),
      error: (error) => reject(error),
    });
  });
};
