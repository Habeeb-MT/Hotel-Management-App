import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

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

  const totalAmount = gList.reduce((total, user) => total + parseInt(user.charge), 0);


  const tableRef = useRef();

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Report", 105, 10, { align: "center" });
    doc.autoTable({
      html: tableRef.current,
      startY: 20,
      styles: { fontSize: 8 },
      theme: "grid",
      margin: { top: 10 },
      columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 40 }, 2: { cellWidth: 30 }, /* Adjust cellWidth as needed */ },
      addPageContent: function (data) {
        doc.text("Page " + data.pageCount, 190, 285);
      },
    });
    doc.save("report.pdf");
  };


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
      {/* <Button variant="contained" onClick={downloadPDF} >
        Download
      </Button> */}
      {gList.length != 0 ? (
        <>
          <div className="table" style={{ padding: "20px" }} ref={tableRef}>
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
                      className="mobile"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      Room No
                    </TableCell>
                    <TableCell
                      className="tablet"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      Pmethod
                    </TableCell>
                    <TableCell
                      className="minitablet"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      Upi Id/Card Number
                    </TableCell>
                    <TableCell
                      className="mobile"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      Checkin-Checkout
                    </TableCell>
                    <TableCell
                      className="tablet"
                      style={{ fontSize: "16px", color: "var(--textColor)" }}
                      align="center"
                    >
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gList.map((user, index) => (
                    <>
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
                          {user.date.slice(0, 10)}
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
                          {user.rnumber}
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
                          {user.upiid} {user.cardnumber}
                        </TableCell>
                        <TableCell
                          className="mobile"
                          style={{ fontSize: "12px", color: "var(--textColor)" }}
                          align="center"
                        >
                          {user.startdate.slice(0, 10)} - {user.enddate.slice(0, 10)}
                        </TableCell>
                        <TableCell
                          className="mobile"
                          style={{ fontSize: "12px", color: "var(--textColor)" }}
                          align="center"
                        >
                          &#8377;{user.charge}
                        </TableCell>

                      </TableRow>
                    </>
                  ))}
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="tablet"
                      style={{ fontSize: "14px", color: "var(--textColor)" }}
                      align="center"
                    >
                      total Amount
                    </TableCell>
                    <TableCell
                      className="tablet"
                      style={{ fontSize: "14px", color: "var(--textColor)" }}
                      align="center"
                    >
                      &#8377;{totalAmount}
                    </TableCell>
                  </TableRow>
                </TableHead>
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
