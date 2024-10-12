"use client";
import * as React from "react";
import Grid from "@mui/material/Grid2"
import Box from "@mui/material/Box"
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {initialRows} from './data'
import { Button } from "@mui/material";
// +Create Invoice button
// Search Invoice text search
//Invoice Status - pending, downloading, mailed , done 
// status - pending, downloading, mailed , done 
// profile - icon
// Balance - paid, money
// Action - Delete, view/hidden/edit /:
// Initial rows
// {
//   id: "#5020",
//   status: "mailed", // green or red
//   name: "John Doe",
//   email: "john@example.com",
//   total: "$200",
//   issued_date: "10 Oct 2024",
//   balance: "Paid",
  
// }

// Main component
export default function App() {
  const [rows, setRows] = useState(initialRows);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
 
  // Delete row handler
  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };
// Create New Invoice
const handleCreateRow = () => {
  const newRow = {
    id: rows.length + 1,
    col1: "New Row",
    col2: "Enter Data",
  };
  const newRows = [...rows, newRow];
  setRows(newRows);
  setFilteredRows(newRows);
};

// Handle Search Query
const handleSearch = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);
  const filtered = rows.filter(
    (row) =>
      row.col1.toLowerCase().includes(query) ||
      row.col2.toLowerCase().includes(query)
  );
  setFilteredRows(filtered);
};
  // Column definitions
  const columns= [
    { field: "id", headerName: "#", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "total", headerName: "Total", width: 100 },
    { field: "issued_date", headerName: "Issued Date", width: 150 },
    { field: "balance", headerName: "Balance", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <div>
          {params.value === "pending" ? (
            <svg height="20" width="20">
              <circle cx="10" cy="10" r="8" fill="green" />
            </svg>
          ) : (
            <svg height="20" width="20">
              <circle cx="10" cy="10" r="8" fill="red" />
            </svg>
          )}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <EditIcon
            style={{ cursor: "pointer", marginRight: "10px" }}
            onClick={() => alert(`Edit row with id: ${params.row.id}`)}
          />
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(params.row.id)}
          />
        </div>
      ),
    },
  ];

  return (

   <Grid container rowSpacing={3} >
     <Button variant="contained">+ Create Invoice</Button>
    <Box sx={{ height: '80%', width: '100%' }}>
      <div> </div>
      <div>
        
        {/* <button onClick={handleCreateRow}>+ Create Invoice</button> */}
        
        {/* <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        /> */}
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      </div>
      <DataGrid rows={rows} columns={columns} 
      pageSizeOptions={[50]}
      checkboxSelection
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },}}
      
      />
      </Box>
      </Grid>
  );
}
