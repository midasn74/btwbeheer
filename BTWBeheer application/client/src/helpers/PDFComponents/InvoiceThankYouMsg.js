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
        <Text style={styles.reportTitle}>Bank no. {invoice.company.bank_number}</Text>
        <Text style={styles.reportTitle}>Please pay before {invoice.due_date_string}</Text>
        <Text style={styles.invoiceNumber}>Invoice no. {invoice.id}</Text>
    </View>
  );
  
  export default InvoiceThankYouMsg