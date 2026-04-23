function CreateLocations() {
  const file1Id = "1xew3Fz8rNAwvZk8FN6g8eATSc1I0curJoea75LL7cus"; // School Naming file
  const file2 = SpreadsheetApp.getActiveSpreadsheet();

  const file1 = SpreadsheetApp.openById(file1Id);

  const schoolSheet = file1.getSheetByName("School Naming");
  const indexSheet = file2.getSheetByName("INDEX_LaborAllocationKey");
  const outputSheet = file2.getSheetByName("Income_Allocation");

  // --- GET SCHOOL DATA (H, J, K) ---
  const schoolData = schoolSheet.getRange(2, 8, schoolSheet.getLastRow() - 1, 4).getValues();
  // Columns:
  // [0] = H (Location)
  // [2] = J
  // [3] = K

  const schools = schoolData.filter(row => row[0]); // remove blanks

  // --- GET INDEX DATA (A, B, G) ---
  const indexData = indexSheet.getRange(2, 1, indexSheet.getLastRow() - 1, 7).getValues();

  const output = [];

  // --- BUILD DATA ---
  schools.forEach(school => {
    const location = school[0]; // H
    const colJ = school[2];     // J
    const colK = school[3];     // K

    indexData.forEach(row => {
      const colA = row[0]; // goes to O
      const colB = row[1]; // goes to P
      const colG = row[6]; // goes to Q

      if (!colG) return;

      const newRow = new Array(17).fill("");

      // Column mapping (1-based index shown for clarity)

      newRow[0] = "";          // A → AllocationCode (leave blank or fill later)
      newRow[1] = location;    // B → Location

      newRow[6] = colJ;        // G → from School Naming J
      newRow[12] = colK;       // M → from School Naming K

      newRow[14] = colA;       // O → INDEX col A
      newRow[15] = colB;       // P → INDEX col B
      newRow[16] = colG;       // Q → INDEX col G

      output.push(newRow);
    });
  });

  // --- CLEAR SHEET ---
  outputSheet.clear();

  // --- STATIC HEADERS ---
  const headers = [
    "AllocationCode", "Location", "P&L_Short", "P&L_Long", "P&L Allocation",
    "Region_Short", "Region_Long", "Region Allocation #",
    "Department_Short", "Department_Long", "Department Allocation #",
    "Location_Short", "Location_Long", "Location Allocation #",
    "Service_Short", "Service_Long", "Services Allocation #"
  ];

  outputSheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // --- WRITE DATA ---
  if (output.length > 0) {
    outputSheet.getRange(2, 1, output.length, output[0].length).setValues(output);
  }
}