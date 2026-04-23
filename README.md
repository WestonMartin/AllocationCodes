# LaborAllocationCodes
-- **<ins>PROBLEM</ins>** -- <br/>
Business needs a way to track their expenses and their revenue based upon specific sectors of the business.

-- **<ins>SOLUTION</ins>** -- <br/>
Create a specific, granular key that combines different references of specific sectors of the business. This will allow for Business Intelligence and Financial tracking in order to create profit and loss analysis and strategic improvement opportunites. 

-- **<ins>FILES</ins>** --
1. Google Sheet: "*Labor Allocation Key*"
  - Tab: [*INDEX_LaborAllocationKey*](GoogleSheets/Labor%20Allocation%20Key_INDEX_LaborAllocationKey.png)
  - Tab: [*Income_Allocation*](GoogleSheets/Labor%20Allocation%20Key_Income_Allocation.png)
2. Google Sheet: "*Master Location & Payor Standardized Naming*"
  - Tab: [*School Naming*](GoogleSheets/Master%20Location%20&%20Payor%20Standardized%20Naming_School%20Naming.png)
3. Google Script: ["*CreateLocations.js*"](GoogleScripts/CreateLocations.js)
4. Google Script: ["*AllocationLookup.js*"](GoogleScripts/AllocationLookup.js)

-- **<ins>PROCESS</ins>** -- 
1. **Create Labor Allocation Codes framework**
  - Business sectors are identified and broken down using a specific string for each sector.
    * Reference: "*Labor Allocation Key*"
      - Tab: [*Income_Allocation*](GoogleSheets/Labor%20Allocation%20Key_Income_Allocation.png)
    - Business sectors:
      - P&L
      - Region
      - Department
      - Location
      - Services

2. **Create a spreadsheet with all possible references, starting by greatest order of magnitude (Work Locations)**
  - All work locations are added from their master google sheet
    - Reference: "*Master Location & Payor Standarized Naming*"
      - Tab: [*School Naming*](GoogleSheets/Master%20Location%20&%20Payor%20Standardized%20Naming_School%20Naming.png)
  - Copy all locations into spreadsheet.
    - Use ["*CreateLocations.js*"](GoogleScripts/CreateLocations.js) to create Initial Spreadsheet with data.
      - Format column headers correctly
      - Add specific locations data
        - Region & Type of Location

3. **Fill in remaining data**
  - Use existing data to update the rest of the data via an Index match.
    - Use ["*AllocationLookup.js*"](GoogleScripts/AllocationLookup.js) to search for missing data using existing data as a reference.
      - Searches for missing data within the index sheet of "*INDEX_LaborAllocationKey*"
      - Uses exisiting data as a search key.
        - Return specific data into specific corresponding columns.

4. **Review Data**
  - Search for missing or incomplete data
    - Change or fill any data manually that is missed or incomplete.

5. **Compile Full LaborAllocationKey**
  - Use ArrayFormula to compile the full LaborAllocationKey for each Service at each Location.
    - *=ARRAYFORMULA(C2:C&E2:E&H2:H&K2:K&N2:N&Q2:Q)*