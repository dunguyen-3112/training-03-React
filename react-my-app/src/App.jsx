import { useEffect, useState, useCallback, useRef } from 'react'
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

    const videoRef = useRef(null)

    const handlePlay = useCallback(() => {
        videoRef.current.play()
    }, [])
    const handlePause = useCallback(() => {
        videoRef.current.pause()
    }, [])


    return (
        <ContextProvider value={theme}>
            <Switch onClick={handleChangeTheme} />
            <Video src={video1} ref={videoRef} />
            <Button onClick={handlePlay}>Play</Button>
            <Button color="info" onClick={handlePause}>Pause</Button>

            <Icon
                src='https://findicons.com/files/icons/1250/halloween_2009/256/skello_kitty.png'
                alt="Hello Kitty"
                lg
            />

            <Card col>
                <Card>
                    <Icon
                        src='https://cdn-icons-png.flaticon.com/128/774/774502.png'
                        alt='Icon hi hi!'
                        md
                    />
                    <CardContent>
                        <Title text='Hello World' />
                        <Typography text='You can change the mapping globally using the theme' />
                    </CardContent>
                </Card>
                <Card>
                    <Icon
                        src='https://cdn-icons-png.flaticon.com/512/188/188987.png'
                        alt="Pikachu"
                        md
                    />
                    <CardContent>
                        <Title text='Hello World' />
                        <Typography text='You can change the mapping globally using the theme' />
                    </CardContent>
                </Card>
            </Card>
        </ContextProvider>
    )
}

export default App
