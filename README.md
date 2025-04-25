# LaborAllocationCodes
Creation &amp; Referential Labor Allocation Codes

# **<ins>Process:</ins>**
- Determine DataSet needed - from largest data pool to smallest:
- Create an Index with this dataset:
1. Determine the list of _services_ where Labor/Revenue will be earmarked. (i.e. Speech Therapy | Occupational Therapy | Behavior Service, etc)
2. Determine the list of _locations_ where Labor/Revenue will be earmarked. (i.e. Clinics & Schools, etc)
3. Determine the list of _departments_ where Labor/Revenue will be earmarked. (i.e. Services, Operations, Admin, etc)
4. Determine the list of _Regions_ where Labor/Revenue will be earmarked. (i.e. Central, Middle TN, West TN)
5. Determine the list of _P&L_ where Labor/Revenue will be earmarked. (i.e. Income, Direct (Cost of Sales), Indirect (Expense), SGA)

- Create a spreadsheet with all possible Labor Allocation Codes to cross-reference exported datasets exported from the EMRs.
- To create spreadsheet, create a Google Script that will take a pre-set list of services, multiplying them by the number of locations involved.
- Insert the following columns "Service Allocation" "Region Allocation" "Department Allocation" "Location Allocation" and insert their corresponding short/long form version.
- Based upon the data provided, add new columns with a function (Function 1) in a each corresponding column to provide the numerical version of the Allocations stated aboved.
- Add a new column and insert a function (Function 2) to accumulate all of the Allocations to create a final "Labor Allocation String" through which to book revenue for P&L analysis.
- Use this Allocation key combined with a function (function 3) to map Payroll expenses exported from EMRs to a specific allocation key.

# **<ins>Index for Labor Allocations:</ins>**

| <ins>P&L Allocation</ins> | <ins>Short Form</ins> | <ins>Long Form</ins> | <ins>Region Allocation Number</ins> | <ins>Short Form</ins> | <ins>Long Form</ins> | <ins>Department Allocation Number</ins> | <ins>Short Form</ins> | <ins>Long Form</ins> | <ins>Location Allocation Number</ins> | <ins>Short Form</ins> | <ins>Long Form</ins> | <ins>Services Allocation Number</ins> | <ins>Short Form</ins> | <ins>Long Form</ins> |
| ---	| ---	| ---	| ---	| ---	| ---	| ---	| ---	| ---	| ---	| ---	| ---	| ---	| ---	| --- |
| 4000-	| #- | Income | 10-  | CO- | Central Office	| UN-	| UN- | Unassigned | UN_ | UN_- | Unassigned | UN | UN | Unassigned |
| 5000-	|	Direct-	|	Direct (Cost of Sales) | 20- | MT- | Middle Tennessee | 10- | School- | Services: School | 100- | Charter- | School_Charter | 01 | ST | Speech Therapy |
| 6000-	|	Opex-	|	Indirect (Expense) | 30- | WT- | West Tennessee | 20- | Clinic- | Services: Clinic | 200- | District- | School_District | 02 | OT | Occupational Therapy |
| 7000-	|	SGA- | SGA | | | | 30- | CS- | Client Support | 300- | IND- | Schools_Independent	|	03 | LI |	Low Incidence Services |
| | | | | | | 40- |	OPS- | Operations | 301- | NAS- |	Clinic_Nashville | 04 |	BX | Behavior Services |
| | | | | | | 50- |	Admin- | Admin | 302- |	FRA- | Clinic_Franklin | 05 |	PSY |	Psychological Services |
| | | | | | | | | | 303- | NOL- | Clinic_Nolensville | 06 |	CNS |	Counseling Services |
| | | | | | | | | | 304- | SMY- | Clinic_Smyrna |	07 | SPED | Academic Services |

# **<ins>Google Script</ins>**
```
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
```
# <ins>Function 1</ins>
```
=INDEX('Labor Allocation Key_Index'!D:D,Match(E2,'Labor Allocation Key_Index'!E:E,0))
```

# <ins>Function 2</ins>
```
=H2&I2&J2&K2&L2
```

# <ins>Function 3</ins>
```
=IFERROR(Index(ImportRange(""1YcU6ti_ddN0_VVt2CAcDE614BZL1iN-6rq6q930r9BA"", ""New Codes - Labor Allocation Key!A:A""),
Match(1, (ImportRange(""1YcU6ti_ddN0_VVt2CAcDE614BZL1iN-6rq6q930r9BA"", ""New Codes - Labor Allocation Key!C:C"")="INSERT LOCATION CELL#") *
(ImportRange(""1YcU6ti_ddN0_VVt2CAcDE614BZL1iN-6rq6q930r9BA"", ""New Codes - Labor Allocation Key!D:D"")="INSERT SERVICE CELL #"),0)),""Not Found") 
```
