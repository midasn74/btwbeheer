import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import InvoiceTitle from './PDFComponents/InvoiceTitle'
import BillTo from './PDFComponents/BillTo'
import InvoiceNo from './PDFComponents/InvoiceNo'
import QuoteNo from './PDFComponents/QuoteNo'
import InvoiceItemsTable from './PDFComponents/InvoiceItemsTable'
import InvoiceThankYouMsg from './PDFComponents/InvoiceThankYouMsg'
import QuoteThankYouMsg from './PDFComponents/QuoteThankYouMsg'

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const mapItemsToInvoiceFormat = (items) => {
    return items.map((item, index) => ({
      sno: index + 1,
      desc: item.product_description,
      qty: item.quantity,
      rate: item.price_per_unit_ex_vat * ((item.vat_percentage/100)+1) * (1-(item.discount_percentage/100)), 
      vat: item.vat_percentage
    }));
};

const mapItemsToQuotationFormat = (items) => {
    return items.map((item, index) => ({
      sno: index + 1,
      desc: item.product_description,
      qty: item.quantity,
      rate: item.price_per_unit_ex_vat * ((item.vat_percentage/100)+1) * (1-(item.discount_percentage/100)), 
      vat: item.vat_percentage
    }));
};

const InvoicePDF = ({invoice}) => {
    const invoiceData = {
        ...invoice,
        items: mapItemsToInvoiceFormat(invoice.products)
    };
    
    return (
        <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={invoice.company.company_logo} />
            <InvoiceTitle title='Invoice'/>
            <InvoiceNo invoice={invoiceData}/>
            <BillTo invoice={invoiceData}/>
            <InvoiceItemsTable invoice={invoiceData} />
            <InvoiceThankYouMsg invoice={invoiceData} />
        </Page>
    </Document>
    );
};             

const QuotationPDF = ({quotation}) => {
    const invoiceData = {
        ...quotation,
        items: mapItemsToQuotationFormat(quotation.products)
    };
    
    return (
        <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={quotation.company.company_logo} />
            <InvoiceTitle title='Quotation'/>
            <QuoteNo invoice={invoiceData}/>
            <BillTo invoice={invoiceData}/>
            <InvoiceItemsTable invoice={invoiceData} />
            <QuoteThankYouMsg invoice={invoiceData} />
        </Page>
    </Document>
    );
};

const ErrorPDF = () => {
    return (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Something went wrong, please try again later.</Text>
            </View>
          </Page>
        </Document>
    );
};         

// Create Document Component
export const GeneratePDF = ({ object }) => {
    // object is a JSON object, invoice or quotation

    if (object.type === 'quotation') {
        return (
            <QuotationPDF quotation={object}/>
        )
    }

    if (object.type === 'invoice') {
        return (
            <InvoicePDF invoice={object}/>
        )
    }

    return (
        <ErrorPDF />
    )
};