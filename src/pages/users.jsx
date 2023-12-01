import React, {
  useCallback,
  useMemo,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import AgColHastagComp from "../components/ag-grid-component/ag-col-hastag-text.jsx";
import AgColActionComp from "../components/ag-grid-component/ag-col-action.jsx";

export default function UsersPage() {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
      {
        headerName: 'Component By Name',
        field: 'country',
        cellRenderer: 'agColActionComp',
      },
      {
        headerName: 'Component By Direct Reference',
        field: 'country',
        cellRenderer: AgColActionComp,
      },
    ]);
    const defaultColDef = useMemo(() => {
      return {
        flex: 1,
        minWidth: 100,
        resizable: true,
      };
    }, []);
    const components = useMemo(() => {
      return {
        agColActionComp: AgColActionComp,
      };
    }, []);
  
    const onGridReady = useCallback((params) => {
      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => setRowData(data));
    }, []);
  return (
    <>
    <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            components={components}
            onGridReady={onGridReady}
          />
        </div>
    </div>
    </>
  );
}
