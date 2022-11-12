import { useEffect, useState } from 'react'
import { } from 'react'
import './App.css'
import { Card, CardContent } from './components/layout/card'
import { Button } from './components/ui/button'
import Icon from './components/ui/icon/Icon'
import { Switch } from './components/ui/switch'
import { Title } from './components/ui/title'
import { Typography } from './components/ui/typography'
import { Video } from './components/ui/video'
import { THEME_DARK, THEME_LIGHT } from './constants'
import ContextProvider from './store/ContextProvider'

import video1 from './assets/video/video1.mp4'
import { useRef } from 'react'

function App() {

    const [theme, setTheme] = useState('light')

    useEffect(() => {


    }, [])

    const handleChangeTheme = () => {
        setTheme(prev => {
            if (prev.localeCompare(THEME_LIGHT) === 0)
                return THEME_DARK
            return THEME_LIGHT
        });
    }

    const handleOK = () => {
        console.log("OK");
    };

    const videoRef = useRef(null)

    const handlePlay = () => {
        videoRef.current.play()
    }
    const handlePause = () => {
        videoRef.current.pause()
    }


    return (
        <ContextProvider value={theme}>
            <Video src={video1} ref={videoRef} />

            <Button onClick={handlePlay}>Play</Button>
            <Button color="info" onClick={handlePause}>Pause</Button>
            <Button color="info" bg>Edit</Button>
            <Button color="success" onClick={handleOK}>Add new</Button>
            <Button color="success" bg >Delete</Button>
            <Switch onClick={handleChangeTheme} />
            <Card>
                <CardContent>
                    <Icon
                        src='https://cdn-icons-png.flaticon.com/128/774/774502.png'
                        alt='Icon hi hi!'
                        md
                    />
                    <Title text='Hello World' />
                    <Typography text='You can change the mapping globally using the theme' />
                </CardContent>
            </Card>
        </ContextProvider>
    )
}

export default App
