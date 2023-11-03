import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../component/Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../constants";

const ResponseList = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) {
      alert("Enter Form ID");
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${SERVER_URL}/form-res-list/${search}`);
      setTableData(data);
      setSearch("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const redirFormAnalysis = (resId) => {
    navigate(`/response/id/${resId}`);
  };

  return (
    <>
      <Header />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: "65px",
          display: "flex",
          justifyContent: "center",
          padding: "7px",
        }}
      >
        <TextField
          id="input-id"
          label="Enter Form ID"
          variant="outlined"
          required
          style={{ margin: 10 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        ""
      )}
      {tableData && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl.no</TableCell>
                <TableCell>Response ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData &&
                tableData.map((info, i) => (
                  <TableRow key={info.resId}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "inherit",
                          "&:hover": {
                            textDecoration: "underline",
                            color: "blue",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => redirFormAnalysis(info.resId)}
                      >
                        {info.resId}
                      </Typography>
                    </TableCell>
                    <TableCell>{info.date}</TableCell>
                    <TableCell>{info.time}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ResponseList;
