function duplicateRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet(); // Open the active spreadsheet
  const sheet = ss.getSheetByName("New Codes - Labor Allocation Key"); // Specify sheet name
  
  const range = sheet.getDataRange();
  const data = range.getValues();
  
  const numDuplicates = 7; // Replace with your desired number of copies
  const newData = []; // Only for duplicated rows, header not included

  // Start duplicating rows from A2 onward (skip the header row)
  for (let i = 1; i < data.length; i++) { // Start from index 1 (A2)
    newData.push(data[i]); // Original row
    for (let j = 0; j < numDuplicates; j++) {
      newData.push(data[i]); // Duplicate row X times
    }
  }
  
  // Clear existing rows **below the header**
  sheet.getRange(2, 1, sheet.getLastRow() - 1, data[0].length).clearContent();
  
  // Write the duplicated rows back starting from A2
  sheet.getRange(2, 1, newData.length, newData[0].length).setValues(newData);
}
