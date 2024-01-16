import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        marginTop: 12
    },
    reportTitle:{
        fontSize: 12,
        textAlign: 'center',
    },
    invoiceNumber:{
        color: '#858585',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
    }
  });

  const InvoiceThankYouMsg = ({invoice}) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Please respond to this quotation before {invoice.valid_until_string}</Text>
        <Text style={styles.invoiceNumber}>Quotation no. {invoice.id}</Text>
    </View>
  );
  
  export default InvoiceThankYouMsg