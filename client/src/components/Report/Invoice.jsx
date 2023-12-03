import React from 'react';
import { PDFViewer, Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        padding: 50,
        fontSize: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50,
        fontSize: 20,
        borderBottom: '2px solid #333',
        paddingBottom: 10,
    },
    section: {
        marginBottom: 10,
        fontSize: 12,
    },
    title: {
        fontSize: 22,
        marginBottom: 30,
        textAlign: 'center',
        textDecoration: 'underline',
    },
    hotelInfo: {
        textAlign: 'right',
        fontSize: 12,
        marginRight: 20,
    },
    tableHeader: {
        backgroundColor: '#eeeeee',
        flexDirection: 'row',
        padding: 10,
        fontSize: 12,
        marginTop: 20,
    },
    tableRow: {
        flexDirection: 'row',
        padding: 10,
        fontSize: 12,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    footer: {
        borderTop: '2px solid #333',
        paddingTop: 10,
        marginTop: 20,
        fontSize: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    termsAndConditions: {
        position: 'absolute',
        bottom: 30,
        left: 50,
        right: 50,
        marginTop: 30,
        border: '1pt solid #000',
        padding: 10,
        fontSize: 10,
    },
});

export const Invoice = ({ invoiceData }) => {

    console.log(invoiceData)

    return (
        <PDFViewer width="100%" height={800}>
            <Document>
                <Page size={{ width: 500, height: 700 }} style={styles.page}>
                    <View style={styles.header}>
                        <Text>HillView Resort</Text>
                        <View style={styles.hotelInfo}>
                            <Text style={styles.section}>Date: {invoiceData.invoice?.date?.slice(0, 10)}</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>Invoice</Text>
                    <Text style={styles.section}>Invoice-ID: #{invoiceData.invoice.reserveid}</Text>
                    <Text style={styles.section}>Payment Method: {invoiceData.invoice.pmethod}</Text>

                    {invoiceData.invoice.pmethod === "UPI-Payment" ? (<>
                        <Text style={styles.section}>UPI ID: 4567849</Text>
                    </>) : (<>
                        <Text style={styles.section}>Card Number: {invoiceData.invoice.cardnumber}</Text>
                    </>)}
                    <Text style={styles.section}>Billing Address: Nit Calicut,kerala</Text>

                    {invoiceData.roomDetails ? (
                        <>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Room Type : Luxury Suite</Text>
                                <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Room Number : f321</Text>
                            </View>
                        </>
                    ) : (
                        <Text style={styles.section}>No room details available</Text>
                    )}
                    <View style={styles.footer}>
                        <Text>Total Amount: INR 4599</Text>
                        <Text></Text>
                    </View>
                    <View style={styles.termsAndConditions}>
                        <Text>
                            Terms and Conditions:
                            These are some sample terms and conditions.
                            Please review and agree to them before proceeding.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Fusce mattis felis vitae eros congue tempor.
                            Nulla facilisi. Quisque tincidunt urna et velit lacinia,
                            sed tempor nisi finibus. Etiam varius, mauris nec hendrerit
                            commodo, sapien justo accumsan lacus, nec molestie sapien dui
                            sed libero. In nec lorem commodo, dictum purus eu, tempus lacus.
                            Nunc at enim eget felis vulputate iaculis.
                        </Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};


export const InvoiceDialog = ({ open, onClose, onDownload, invoiceData }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="invoice-dialog-title"
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle id="invoice-dialog-title">Invoice</DialogTitle>
            <DialogContent dividers style={{ width: "100%", height: "100%" }}>
                <Invoice invoiceData={invoiceData} />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

