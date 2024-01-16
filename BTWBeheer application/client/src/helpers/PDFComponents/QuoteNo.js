import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceTopContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceBelowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    label: {
        paddingRight: 4,
        fontWeight: 'bold',
    }
  });


  const InvoiceNo = ({invoice}) => (
        <Fragment>
            <View style={styles.invoiceTopContainer}>
                <Text style={styles.label}>Quotation reference:</Text>
                <Text style={styles.invoiceDate}>{invoice.quotation_reference_no}</Text>
            </View >
            <View style={styles.invoiceBelowContainer}>
                <Text style={styles.label}>Date:</Text>
                <Text >{invoice.creation_date_string}</Text>
            </View >
        </Fragment>
  );
  
  export default InvoiceNo