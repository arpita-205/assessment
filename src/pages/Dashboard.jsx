import React, { useEffect, useMemo, useState } from 'react';
import data from '../data/data.json';
import { AgGridReact } from 'ag-grid-react';
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  colorSchemeLightCold,
 colorSchemeDarkBlue
} from "ag-grid-community";
import { getAgGridColumns } from '../utils';


ModuleRegistry.registerModules([AllCommunityModule]);

const Dashboard = () => {
  const [rowData, setRowData] = useState(data.employees);
   const [darkMode, setDarkMode] = useState(false);
  const [colDefs, setColDefs] = useState(
    getAgGridColumns(data.employees, ["firstName", "lastName"])
  );

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
    const base = darkMode
      ? themeQuartz.withPart(colorSchemeDarkBlue)
      : themeQuartz.withPart(colorSchemeLightCold);

    return base
  }, [darkMode]);

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
      <div className="flex flex-col gap-4 pb-4">
        <h2 className="text-blue-600 font-bold mb-4 text-xl">
          Employee Dashboard
        </h2>
        <button
          onClick={() => setDarkMode((mode) => !mode)}
          className="border px-3 py-1 rounded text-sm hover:bg-blue-100 dark:hover:bg-blue-900 w-fit"
        >
          <span className='font-medium'>Theme:</span> {darkMode ? " Dark" : "Light"}
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