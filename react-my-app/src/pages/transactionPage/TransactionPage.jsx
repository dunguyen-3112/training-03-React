import { useState, useEffect } from 'react'
import { Box } from '../../components/ui/box'
import { Table } from '../../components/ui/table'

function TransactionPage() {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        setTransactions([{
            id: "1",
            name: "Iphone 13 Pro MAX",
            date: new Date(2022, 7, 14),
            business: 'Apple Inc',
            amount: 420.84,
            invoiceId: 'MGL0124877'
        }])
    }, [])

    return (
        <Box className="" col>
            <Table>
                <Table.Head>
                    <Table.Row>
                        < Table.Cell > Name / Business</ Table.Cell>
                        <Table.Cell>Type</Table.Cell>
                        < Table.Cell > Amount</Table.Cell >
                        <Table.Cell> Date</Table.Cell >
                        <Table.Cell>Invoice Id</Table.Cell>
                        <Table.Cell>Action</Table.Cell>
                    </Table.Row >
                </Table.Head >
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Gadget Gallery LTD</Table.Cell>
                        <Table.Cell>14 Apr 2022</Table.Cell>
                        <Table.Cell>20</Table.Cell>
                        <Table.Cell>$420.84</Table.Cell>
                        <Table.Cell>Pending</Table.Cell>
                        <Table.Cell>...</Table.Cell>
                    </Table.Row>
                </Table.Body>

            </Table>
        </Box>);
}

export default TransactionPage

