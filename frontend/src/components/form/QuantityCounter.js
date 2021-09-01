import React from 'react'
import { Button } from 'rebass/styled-components'

const QuantityCounter = ({setter, quantity}) => {
    return (
        <div>
            <Button onClick={setter.decrease}>-</Button>
            <span> {quantity} </span>
            <Button onClick={setter.increase}>+</Button>
        </div>
    )
}

export default QuantityCounter
