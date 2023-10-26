import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36,
        flexDirection: 'row',
    },

    headerSubLeftContainer: {
        marginRight: 'auto',
        marginLeft: 0,
    },

    headerSubRightContainer: {
        marginLeft: 'auto',
        marginRight: 0,
    },

    billTo: {
        marginTop: 20,
        paddingBottom: 3,
    },
  });


  const BillTo = ({invoice}) => (
    <View style={styles.headerContainer}>
        <View style={styles.headerSubLeftContainer}>
            <Text style={styles.billTo}>From:</Text>
            <Text>{invoice.company.company_name}</Text>
            <Text>{`${invoice.company.address}, ${invoice.company.city}, ${invoice.company.postal_code}`}</Text>
            <Text>{invoice.company.contact_mail} - {invoice.company.contact_phone_number}</Text>
            <Text>KVK: {invoice.company.kvk_number}</Text>
            <Text>VAT: {invoice.company.vat_number}</Text>
        </View>

        <View style={styles.headerSubRightContainer}>
            <Text style={styles.billTo}>Bill To:</Text>
            <Text>{invoice.relation_name}</Text>
            <Text>{`${invoice.relation.relation_address}, ${invoice.relation.relation_city}, ${invoice.relation.relation_postal_code}`}</Text>
            <Text>{invoice.relation.relation_email} - {invoice.relation.relation_phone}</Text>
        </View>
    </View>
  );
  
  export default BillTo