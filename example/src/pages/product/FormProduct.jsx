import React, { useState } from 'react'
import { useEffect } from 'react'
import Input from '../../components/ui/input/Input'
import DropDown from '../../components/ui/select/DropDown'
import classes from './FormProduct.module.css'
import Button from '../../components/ui/button/Button'

function FormProduct() {

    const [image, setImage] = useState()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleChangeImage = (event) => {
        const file = event.target.files[0]

        file.url = URL.createObjectURL(file)
        setImage(file)
    }

    const handleChangeName = (event) => setName(event.target.value)

    const handleChangeDescription = (event) => setDescription(event.target.value)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Name: ", name, ", description: ", description);
        setName('')
        setDescription('')
    }

    useEffect(() => {

        return (() => {
            return image && URL.revokeObjectURL(image.url)
        })
    }, [image])

    return (
        <div className={classes.form_container}>
            <figure className={classes.figure} title="Image product">
                <img src={(image && image.url) || 'https://s.cdnshm.com/catalog/za/t/89441011/apple-iphone-13-pro-max-256gb.jpg'} alt="" className={classes.avatar} />
                <input className={classes.select_file} type="file" onChange={handleChangeImage} />
            </figure>
            <form>
                <Input label="Name" onChange={handleChangeName} value={name} />
                <Input label="Description" type="textarea" onChange={handleChangeDescription} value={description} />
                <Button onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default FormProduct