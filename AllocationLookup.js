function AllocationLookup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const incomeSheet = ss.getSheetByName("Income_Allocation");
  const indexSheet = ss.getSheetByName("INDEX_LaborAllocationKey");

  const incomeData = incomeSheet.getDataRange().getValues();
  const indexData = indexSheet.getDataRange().getValues();

  // --- BUILD LOOKUP MAP (key = Column B in INDEX) ---
  const indexMap = {};

  for (let i = 1; i < indexData.length; i++) {
    const row = indexData[i];

    const key = row[1]; // Column B (search column)

    if (!key) continue;

    indexMap[key] = {
      A: row[0], // Col A
      D: row[3], // Col D
      E: row[4], // Col E
      F: row[5]  // Col F
    };
  }

  // --- PROCESS INCOME DATA ---
  for (let i = 1; i < incomeData.length; i++) {
    const row = incomeData[i];

    const colG = row[6];  // G
    const colJ = row[9];  // J
    const colM = row[12]; // M

    // --- STEP 1: IF LOGIC FOR COLUMN J ---
    if (colM && colM.includes("School_")) {
      row[9] = "Services: School";
    } else if (colM && colM.includes("Clinic_")) {
      row[9] = "Services: Clinic";
    } else if (colM && colM.includes("Unassigned")) {
      row [9] = "Unassigned";
    }

    const updatedColJ = row[9];

    // --- STEP 2: LOOKUPS ---

    // 1. G → F (return A)
    if (colG && indexMap[colG]) {
      row[5] = indexMap[colG].A; // F
      row[7] = indexMap[colG].D; // H
    }

    // 2. M → L & N
    if (colM && indexMap[colM]) {
      row[11] = indexMap[colM].A; // L
      row[13] = indexMap[colM].F; // N
    }

    // 3. J → I & K
    if (updatedColJ && indexMap[updatedColJ]) {
      row[8] = indexMap[updatedColJ].A; // I
      row[10] = indexMap[updatedColJ].E; // K
    }
  }

  // --- WRITE BACK ---
  incomeSheet.getRange(1, 1, incomeData.length, incomeData[0].length).setValues(incomeData);
}