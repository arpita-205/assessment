import React, { useEffect, useMemo, useState } from 'react';
import data from '../data/data.json';
import { AgGridReact } from 'ag-grid-react';
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  colorSchemeLightCold,
  colorSchemeDarkBlue,
  colorSchemeDark,
  colorSchemeLight
} from "ag-grid-community";
import { getAgGridColumns } from '../utils';


ModuleRegistry.registerModules([AllCommunityModule]);

const Dashboard = () => {
  const [rowData, setRowData] = useState(data.employees);
   const [darkMode, setDarkMode] = useState(false)
  const [colDefs, setColDefs] = useState(
    getAgGridColumns(data.employees, ["firstName", "lastName"])
  );
  const [themeColor,setThemeColor]=useState('Blue')

  const defaultColDef = {
    flex: 1,
    minWidth: 124,
    editable:true
  };

  const handleToggle = (id) => {
     setRowData((prev) =>
       prev.map((emp) =>
         emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
       )
     );
  };

  const theme = useMemo(() => {
   const base =
    themeColor === "Neutral"
       ? darkMode
         ? colorSchemeDark
         : colorSchemeLight
       : 
       darkMode
       ? colorSchemeDarkBlue
       : colorSchemeLightCold;

    return  themeQuartz
    .withPart(base)
  }, [darkMode, themeColor]);

  useEffect(() => {
    setColDefs((prev) =>
      prev.map((c) =>
        c.field === "isActive"
          ? {
              ...c,
              headerName: "Active",
              cellRenderer: (params) => (
                <input
                  type="checkbox"
                  checked={params.value}
                  onChange={() => handleToggle(params.data.id)}
                  className='cursor-pointer w-4 h-4'
                />
              ),
            }
          : c
      )
    );
  }, []); 

  return (
    <div className="w-full h-full px-4 py-2">
      <div className="flex flex-col gap-2 mb-5">
        <h2 className="text-blue-600 font-bold text-xl">Employee Dashboard</h2>
        <div className="flex gap-4 items-center">
          <span className='font-medium text-sm'>Theme Colors:</span>
          <button
            onClick={() => setThemeColor("Neutral")}
            className="border px-2 py-1 rounded text-sm w-fit cursor-pointer"
          >
            Neutral
          </button>
          <button
            onClick={() => setThemeColor("Blue")}
            className="border px-2 py-1 rounded text-sm w-fit cursor-pointer"
          >
            Blue
          </button>
        </div>
        <button
          onClick={() => setDarkMode((mode) => !mode)}
          className="border px-2 py-1 rounded text-sm w-fit cursor-pointer"
        >
          <span className="font-medium">Theme:</span>{" "}
          {darkMode ? " Dark" : "Light"} {themeColor}
        </button>
      </div>
      <div className="w-full h-full">
        <div className=" h-full w-full">
          <AgGridReact
            theme={theme}
            rowData={rowData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={20}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard