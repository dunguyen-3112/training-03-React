import React from 'react'
import Card from '../../components/Card/Card'
import ProductItem from './ProductItem'
import classes from './Product.module.css'

function Product(props) {

    const listProduct = props.products.map(product => <ProductItem key={product.id} product={product} />)
    return (
        <div className={classes.products}>
            {listProduct}
        </div>
    )
}

export default Product