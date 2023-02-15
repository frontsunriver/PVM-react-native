import React from 'react'
import {Button} from 'react-native-paper'
import { ICON_TYPE, IconX } from '../Icons'
import theme from '../Themes/configs/default'

export default ({label, color, style, mode,  zeroMargin, onPress, loading,  icon = false, contentStyle, ...other}) => {    
    return(
        <Button
            style={[{ marginTop: zeroMargin ? 0 : 20 } , style]}
            loading={loading}
            mode ={mode || 'contained'}
            contentStyle={{ padding:8, ...contentStyle }}
            color={color}
            onPress={!loading ? onPress : null}
            {...other}
        >
            {icon? iconLabel : ''}
            {label}
        </Button>
    )
}

const iconLabel = () => {
    return (
        <IconX color={theme.colors.primary} origin={ICON_TYPE.FONT_AWESOME} name={'home'} />
    )
}
