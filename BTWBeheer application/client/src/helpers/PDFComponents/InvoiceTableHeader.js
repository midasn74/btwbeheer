import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#212529'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#212529',
        backgroundColor: '#5e6a75',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '35%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingTop: 4,
    },
    qty: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingTop: 4,
    },
    rate: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingTop: 4,
    },
    vat: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingTop: 4,
    },
    amount: {
        width: '15%',
        paddingTop: 4,
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Item Description</Text>
        <Text style={styles.qty}>Quantity</Text>
        <Text style={styles.rate}>Price (VAT incl.)</Text>
        <Text style={styles.vat}>VAT</Text>
        <Text style={styles.amount}>Amount</Text>
    </View>
  );
  
  export default InvoiceTableHeader