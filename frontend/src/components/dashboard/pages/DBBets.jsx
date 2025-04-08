import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Typography } from "@mui/material";

const DBBets = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await axios.get(
          `/api/users/${JSON.parse(localStorage.getItem("user")).nickname}/matches`
        );
        setBets(response.data);
        setLoading(false);
      } catch (err) {
        console.error("[ERROR] - Unable to fetch bets:", err);
        setError("Failed to load bets. Please try again later.");
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  const columns = [
    { field: "matchId", headerName: "Match ID", width: 150 },
    { field: "teamName", headerName: "Team Name", width: 200 },
    { field: "betAmount", headerName: "Bet Amount ($)", width: 150 },
    { field: "potentialWinnings", headerName: "Potential Winnings ($)", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Typography variant="h6" className="text-red-500">
          {error}
        </Typography>
      </div>
    );
  }

  return (
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden p-6 ml-96 max-w-5xl items-center justify-center">
        <h1 className="text-left text-2xl text-gray-200 font-semibold mb-4">
          My Bets
        </h1>
        <div className="h-96 bg-gray-850 rounded-lg overflow-hidden">
          <DataGrid
            rows={bets.map((bet, index) => ({ id: index, ...bet }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            className="bg-gray-850 text-gray-200"
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1f2937",
                color: "#d1d5db",
                fontSize: "16px",
              },
              "& .MuiDataGrid-row": {
                backgroundColor: "#111827",
                "&:nth-of-type(odd)": { backgroundColor: "#1f2937" },
              },
              "& .MuiDataGrid-cell": {
                color: "#d1d5db",
              },
              border: "none",
            }}
          />
        </div>
      </div>
  );
};

export default DBBets;
