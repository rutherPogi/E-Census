import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportSegregationData(femaleData, femaleTotalData, maleData, maleTotalData) {
    // Add labels for clarity
    const labeledFemale = [{ Table: "Female Table" }, ...femaleData];
    const labeledFemaleTotal = [{ Table: "Female Total Table" }, ...femaleTotalData];
    const labeledMale = [{ Table: "Male Table" }, ...maleData];
    const labeledMaleTotal = [{ Table: "Male Total Table" }, ...maleTotalData];

    // Merge tables with an empty row between them
    const combinedData = [
        ...labeledFemale,
        {}, // Blank Row
        ...labeledFemaleTotal,
        {}, // Blank Row
        ...labeledMale,
        {}, // Blank Row
        ...labeledMaleTotal
    ];

    // Create worksheet from combined data
    const worksheet = XLSX.utils.json_to_sheet(combinedData, { skipHeader: false });

    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SegregationData");

    // Write the workbook and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "SegregationData.xlsx");
}

export function exportMasterlistData(title, staRosa, staMaria, staLucia, sanRafael, yawran, raele) {
    
    const labeledStaRosa = [{ Table: "Sta. Rosa" }, ...staRosa];
    const labeledStaMaria = [{ Table: "Sta. Maria" }, ...staMaria];
    const labeledStaLucia = [{ Table: "Sta. Lucia" }, ...staLucia];
    const labeledSanRafael = [{ Table: "San Rafael" }, ...sanRafael];
    const labeledYawran = [{ Table: "Yawran" }, ...yawran];
    const labeledRaele = [{ Table: "Raele" }, ...raele];


    // Merge tables with an empty row between them
    const combinedData = [
        ...labeledStaRosa,
        {}, // Blank Row
        ...labeledStaMaria,
        {}, // Blank Row
        ...labeledStaLucia,
        {}, // Blank Row
        ...labeledSanRafael,
        {},
        ...labeledYawran,
        {},
        ...labeledRaele
    ];

    // Create worksheet from combined data
    const worksheet = XLSX.utils.json_to_sheet(combinedData, { skipHeader: false });

    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);

    // Write the workbook and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, `${title}.xlsx`);
}
