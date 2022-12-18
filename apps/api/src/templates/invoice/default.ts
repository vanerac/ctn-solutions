import * as Mustache from 'mustache';
import * as path from "path";
import * as fs from "fs";
import {EvaluateFunc} from "puppeteer";

const simple = path.join(__dirname, "./default.html")

interface data {
    logo: string
    // Data
    invoice_number: string
    invoice_date: string
    due_date: string

    // Customer
    customer_name: string
    customer_address: string
    customer_city: string
    customer_state: string
    customer_zip: string
    customer_country: string

    // Bill


    bill_to_name: string
    bill_to_address: string
    bill_to_city: string
    bill_to_state: string
    bill_to_zip: string
    bill_to_country: string


    // Items
    items: {
        item: string
        description: string
        quantity: string
        unit_price: string
        amount: string
    }[]

    // Totals
    total: string

}

// Puppeteer Function that retrieves the signature from the PDF
const getSignatureBounds: EvaluateFunc<[]> = () => {

    const anchors = document.querySelectorAll('#signature');
    return [...anchors].map((anchor) => {
        const {top, left, height, width} = anchor.getBoundingClientRect();
        return {top, left, height, width};
    })
}

const openFile = (file: string) => fs.readFileSync(file, {encoding: 'utf8'})

const render = (data: data, file?: string) => Mustache.render(file ? openFile(file) : openFile(simple), data)

export {simple, data, render, getSignatureBounds}
