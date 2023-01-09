import {gql, useQuery} from '@apollo/client';
import CurveGraph from "../dataviz/CurveGraph";
import {DateValue} from "@visx/mock-data/lib/generators/genDateValue";


let InvoicesQuery = gql`
    query invoices {
        invoices {
            status
            id
            title
            date
            items {
                id
                discount
                unitPrice
                quantity
            }
        }
    }
`


export default function InvoicesWidget() {


    const {data, loading, error} = useQuery(InvoicesQuery, {
        variables: {
            input: {
                period: "WEEK",
                date: new Date().toISOString()
            }
        }
    });

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    if (!data) {
        return <div>No data</div>;
    }


    const formattedInvoices = data.invoices.map((invoice: any) => {
        return {
            title: invoice.title,
            date: invoice.date,
            status: invoice.status,
            total: invoice.items.reduce((acc: any, item: any) => {
                return acc + item.unitPrice * item.quantity * (1 - item.discount);
            }, 0)
        }
    });

    // Group by month
    const groupedData: DateValue[][] = formattedInvoices.reduce((acc: any, invoice: any) => {
        const date = new Date(invoice.date);
        const month = date.getMonth();
        const year = date.getFullYear();

        // Set year to 2022
        const currentYear = new Date('2022-01-01').getFullYear();
        // const currentYear = new Date().getFullYear();

        if (currentYear === year) {
            acc[month] = [...acc[month], invoice];
        } else {
            console.log('year', year, 'is not eq to', currentYear)
        }

        return acc;
    }, new Array(12).fill([]));

    const months = Object.keys(groupedData)
    // console.log('months', months)

    // turn onject to array
    const dataToGraph: DateValue[] = months.reduce((acc: DateValue[], monthKey: string) => {
        const month = parseInt(monthKey);
        const invoices = groupedData[month];
        const total = invoices.reduce((acc: any, invoice: any) => {
            return acc + invoice.total;
        }, 0);

        // Todo: Debug only:
        const year = new Date(2022, 1, 1,).getFullYear();

        const date = new Date(
            year,
            month,
            1
        )
        // console.log(`${year}-${month}-01`)

        return [...acc, {date, value: total, color: 'green'}];
    }, []);

    // console.log("dataToGraph", dataToGraph);
    //
    // console.log("groupedData", groupedData);

    return (
        <CurveGraph data={[dataToGraph]}/>
    );
}
