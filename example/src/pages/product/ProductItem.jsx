import React from 'react'

function ProductItem({ product }) {

    const columns = Object.keys(product).map((key, index) => <td key={index}>{product[key]}</td>)


    return (
        <tr>{columns}</tr>
    )
}

export default ProductItem