import React from 'react'
import Card from '../../../layouts/Card/Card'
import classes from '../ListProduct/ProductItem.module.css'

function ProductItem(props) {
    return (
        <Card>
            <h4 className={classes.productItem_title}>{props.txt}</h4>
        </Card>
    )
}

export default ProductItem