import React from 'react'
import { useState } from 'react'
import Button from '../../components/ui/button/Button'
import Table from '../../components/ui/table/Table'
import NewProduct from './NewProduct'
import ProductItem from './ProductItem'

function Products() {

    const products = [{
        id: '1',
        name: 'Iphone 11',
        description: 'This is a phone 11!'
    }, {
        id: '2',
        name: 'Iphone 12',
        description: 'This is a phone 12!'
    }, {
        id: '3',
        name: 'Iphone 13',
        description: 'This is a phone 13!'
    }, {
        id: '4',
        name: 'Iphone 14',
        description: 'This is a phone 14!'
    }]

    const [isOpen, setIsOpen] = useState(false)

    const listProduct = products.map(product => <ProductItem key={product.id} product={product} />)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Button onClick={handleClick}>New</Button>
            <Table body={listProduct} />
            {isOpen && <NewProduct />}
        </>
    )
}

export default Products