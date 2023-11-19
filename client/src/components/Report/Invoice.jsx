import React from 'react';
import { PDFViewer, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    // Define more styles as per your requirement
});

export const Invoice = ({ date, billingAddress, paymentMethod, roomDetails }) => {
    return (
        <PDFViewer width="100%" height={600}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={styles.section}>Invoice</Text>
                    <Text style={styles.section}>Date: {date}</Text>
                    <Text style={styles.section}>Billing Address: {billingAddress}</Text>
                    <Text style={styles.section}>Payment Method: {paymentMethod}</Text>
                    {roomDetails.map((room, index) => (
                        <Text key={index} style={styles.section}>
                            Room Type: {room.type}, Room Number: {room.number}
                        </Text>
                    ))}
                    {/* Add more invoice details as Text components */}
                </Page>
            </Document>
        </PDFViewer>
    );
};
