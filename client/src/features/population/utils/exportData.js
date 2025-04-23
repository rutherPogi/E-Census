import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportPopulation(population) {

    // Create worksheet from combined data
    const worksheet = XLSX.utils.json_to_sheet(population, { skipHeader: false });

    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Population");

    // Write the workbook and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "Population.xlsx");
}
