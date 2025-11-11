import React, { useEffect, useState } from 'react';
import data from '../data/data.json';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry,themeQuartz,colorSchemeLightCold } from "ag-grid-community";
import { getAgGridColumns } from '../utils';


ModuleRegistry.registerModules([AllCommunityModule]);

const Dashboard = () => {
  const [rowData, setRowData] = useState(data.employees);
   const themeLightCold = themeQuartz.withPart(colorSchemeLightCold);
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
        <h2 className="text-blue-600 font-bold mb-4 text-xl">
          Employee Dashboard
        </h2>
        <div className='w-full h-full'>
          <div  className=' h-full w-full'>
            <AgGridReact
              theme={themeLightCold}
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