function generatePermutations() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = sheet.getActiveSheet(); // Assumes the current active sheet contains the data
  const outputSheetName = "Permutations";
  const headers = ["A+C+E+G", "B+D+F+H"]; // Headers for the output tab

  // Get the data
  const data = sourceSheet.getRange(2, 1, sourceSheet.getLastRow() - 1, 8).getValues();

  // Filter the data to remove rows with empty columns
  const regions = data.map(row => [row[0], row[1]]).filter(row => row[0]);
  const departments = data.map(row => [row[2], row[3]]).filter(row => row[0]);
  const locations = data.map(row => [row[4], row[5]]).filter(row => row[0]);
  const services = data.map(row => [row[6], row[7]]).filter(row => row[0]);

  // Generate permutations
  const results = [];
  for (const [region, regionNum] of regions) {
    for (const [department, departmentNum] of departments) {
      for (const [location, locationNum] of locations) {
        for (const [service, serviceNum] of services) {
          const combinedText = `${region} | ${department} | ${location} | ${service}`;
          const combinedNumbers = `${regionNum} | ${departmentNum} | ${locationNum} | ${serviceNum}`;
          results.push([combinedText, combinedNumbers]);
        }
      }
    }
  }

  // Create or clear the output sheet
  let outputSheet = sheet.getSheetByName(outputSheetName);
  if (!outputSheet) {
    outputSheet = sheet.insertSheet(outputSheetName);
  } else {
    outputSheet.clear();
  }

  // Write the headers and results to the output sheet
  outputSheet.getRange(1, 1, 1, 2).setValues([headers]);
  outputSheet.getRange(2, 1, results.length, 2).setValues(results);

  SpreadsheetApp.flush();
}
