# LaborAllocationCodes
-- **<ins>PROBLEM</ins>** -- <br/>
Business needs a way to track their expenses and their revenue based upon specific sectors of the business.

-- **<ins>SOLUTION</ins>** -- <br/>
Create a specific, granular key that combines different references of specific sectors of the business. This will allow for Business Intelligence and Financial tracking in order to create profit and loss analysis and strategic improvement opportunites. 

-- **<ins>FILES</ins>** --
1. "*Labor Allocation Key*" Google Sheet [LINK](https://docs.google.com/spreadsheets/d/1YcU6ti_ddN0_VVt2CAcDE614BZL1iN-6rq6q930r9BA/edit?gid=1538980541#gid=1538980541)
2. "*Master Location & Payor Standardized Naming*" Google Sheet [LINK](https://docs.google.com/spreadsheets/d/1xew3Fz8rNAwvZk8FN6g8eATSc1I0curJoea75LL7cus/edit?gid=0#gid=0)
3. "*CreateLocations.js*" Google Script
4. "*AllocationLookup.js*" Google Script

-- **<ins>PROCESS</ins>** -- 
1. **Create Labor Allocation Codes framework**
  - Business sectors are identified and broken down using a specific string for each sector.
    * Reference: "*Labor Allocation Key*"
      - Tab: "*INDEX_LaborAllocationKey*"
    - Business sectors:
      - P&L
      - Region
      - Department
      - Location
      - Services

2. **Create a spreadsheet with all possible references, starting by greatest order of magnitude (Work Locations)**
  - All work locations are added from their master google sheet
    - Reference: "*Master Location & Payor Standarized Naming*"
      - Tab: "*School Naming*"
  - Copy all locations into spreadsheet.
    - Use "*CreateLocations.js*" Google Script to create Initial Spreadsheet with data.
      - Format column headers correctly
      - Add specific locations data
        - Region & Type of Location

3. **Fill in remaining data**
  - Use existing data to update the rest of the data via an Index match.
    - Use "*AllocationLookup.js*" Google Script to search for missing data using existing data as a reference.
      - Searches for missing data within the index sheet of "*INDEX_LaborAllocationKey*"
      - Uses exisiting data as a search key.
        - Return specific data into specific corresponding columns.

4. **Review Data**
  - Search for missing or incomplete data
    - Change or fill any data manually that is missed or incomplete.

5. **Compile Full LaborAllocationKey**
  - Use ArrayFormula to compile the full LaborAllocationKey for each Service at each Location.
    - *=ARRAYFORMULA(C2:C&E2:E&H2:H&K2:K&N2:N&Q2:Q)*