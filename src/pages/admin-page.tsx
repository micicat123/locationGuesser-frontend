import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { MUITheme } from "../mui/theme";
import Wrapper from "../components/Wrapper";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AdminPage = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLogs = await axios.get(`/user/admin/logs`, {
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        });
        setLogs(responseLogs.data);
      } catch (err) {
        console.log(err);
      }

      try {
        const responseAdmin = (await axios.get("/auth/admin")).data.body;
        if (responseAdmin.message !== "This user is an admin")
          setHasPermission(false);
        else setHasPermission(true);
      } catch (err) {}
    };
    fetchData();
  }, []);

  if (hasPermission == false) {
    return <Navigate to={"/"} />;
  }

  return (
    <Wrapper>
      <ThemeProvider theme={MUITheme}>
        <Box sx={{ p: 10 }}>
          <Typography color="textPrimary" variant="h2" sx={{ mb: 3 }}>
            User logs
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: "70vh" }}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="sticky table"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                      Action
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                      Component
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                      Value
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                      URL
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                      Created at
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logs.map((log, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.component}</TableCell>
                      <TableCell>{log.newValue}</TableCell>
                      <TableCell>{log.URL}</TableCell>
                      <TableCell>
                        {new Date(log.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

export default AdminPage;
/*
{
  logs.map((log) => (
    <TableRow
      key={log.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {log.name}
      </TableCell>
      <TableCell align="right">{log.calories}</TableCell>
      <TableCell align="right">{log.fat}</TableCell>
      <TableCell align="right">{log.carbs}</TableCell>
      <TableCell align="right">{log.protein}</TableCell>
    </TableRow>
  ));
}*/
