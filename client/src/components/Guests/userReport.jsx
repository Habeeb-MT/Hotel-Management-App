import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const ReportList = () => {
  const [gList, setGList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/user/fetchReport");
        if (response) {
          const jsonData = response.data.report;
          setGList(jsonData);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography
        variant="h5"
        style={{
          textAlign: "center",
          margin: "20px 40px",
          color: "var(--textColor)",
        }}
      >
        Report
      </Typography>
      {gList.length != 0 ? (
        <>
          <div className="table" style={{ padding: "20px" }}>
            <TableContainer
              component={Paper}
              style={{ background: "var(--bg1)" }}
            >
              <Table aria-label="simple table">
                <TableHead className="tablehead">
                  <TableRow>
                    <TableCell
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      InvoiceId
                    </TableCell>
                    <TableCell
                      className="mobile"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      className="mobile"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      Guest-ID
                    </TableCell>
                    <TableCell
                      className="tablet"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      className="tablet"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      Pmethod
                    </TableCell>
                    <TableCell
                      className="tablet"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      CardNumber
                    </TableCell>
                    <TableCell
                      className="minitablet"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      UpiId
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gList.map((user, index) => (
                    <TableRow
                      key={user?.lid}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        style={{ fontSize: "12px", color: "var(--textColor)" }}
                        align="center"
                      >
                        {user.invoiceid}
                      </TableCell>
                      <TableCell
                        className="mobile"
                        style={{ fontSize: "12px", color: "var(--textColor)" }}
                        align="center"
                      >
                        {user.date}
                      </TableCell>
                      <TableCell
                        className="mobile"
                        style={{ fontSize: "12px", color: "var(--textColor)" }}
                        align="center"
                      >
                        {user.guestid}
                      </TableCell>
                      <TableCell
                        className="mobile"
                        style={{ fontSize: "12px", color: "var(--textColor)" }}
                        align="center"
                      >
                        {user.amount}
                      </TableCell>
                      <TableCell
                        className="tablet"
                        style={{ fontSize: "12px", color: "var(--textColor)" }}
                        align="center"
                      >
                        {user.pmethod}
                      </TableCell>
                      <TableCell
                        className="tablet"
                        style={{ fontSize: "12px", color: "var(--textColor)" }}
                        align="center"
                      >
                        {user.cardnumber}
                      </TableCell>
                      <TableCell
                        className="tablet"
                        style={{ fontSize: "12px", color: "var(--textColor)" }}
                        align="center"
                      >
                        {user.upiid}
                      </TableCell>
                      <TableCell
                        className="tablet"
                        style={{ fontSize: "12px", color: "var(--textColor)" }}
                        align="center"
                      >
                        {user.baddress}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
