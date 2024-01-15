import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#212529'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#212529',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '35%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '15%',
        borderRightColor: borderColor,
        textAlign: 'center',
        borderRightWidth: 1,
    },
    rate: {
        width: '20%',
        borderRightColor: borderColor,
        textAlign: 'center',
        borderRightWidth: 1,
    },
    vat: {
        width: '15%',
        borderRightColor: borderColor,
        textAlign: 'center',
        borderRightWidth: 1,
    },
    amount: {
        width: '15%',
        textAlign: 'center',
    },
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( item => 
        <View style={styles.row} key={item.sno.toString()}>
            <Text style={styles.description}>{item.desc}</Text>
            <Text style={styles.qty}>{item.qty}</Text>
            <Text style={styles.rate}>€{item.rate.toFixed(2)}</Text>
            <Text style={styles.vat}>{item.vat}%</Text>
            <Text style={styles.amount}>€{(item.qty * item.rate).toFixed(2)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableRow