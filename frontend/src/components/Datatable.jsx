import React from "react";
import Styled from 'styled-components'
import { DataGrid } from "@mui/x-data-grid";


const Datatable = ({ row, column, setRowSelection }) => {
 
  
  return (
    <Container className="datatable">
      <DataGrid
        className="datagrid" 
         rows={row}
        columns={column}
        pageSize={20}
        rowsPerPageOptions={[10]}
        checkboxSelection
        style={{fontSize: '1.8rem'}}
        onSelectionModelChange={itm => setRowSelection && setRowSelection(itm)}
      />
    </Container>
  );
};

const Container = Styled.div`
  height: 80%;
`

export default Datatable;
