import React from 'react'
import Card from '../../components/Card/Card'
import classes from './ProductItem.module.css'

function ProductItem(props) {

    return (
        <Card>
            <figure >
                <img src={props.product.images[0]} alt="" className={classes.productItem_image} />
            </figure>
            <h4 className={classes.productItem_title}>{props.product.title}</h4>
        </Card>
    )
}

export default ProductItem