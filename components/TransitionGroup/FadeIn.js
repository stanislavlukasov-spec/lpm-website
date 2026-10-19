import React from 'react'
import { Transition } from 'react-transition-group'
import _ from 'lodash'

const TransitionGroupFadeIn = props => {
    const {
        children,
        styles = {},
        speed = 150,
        delay = 150,
        className = ""
    } = props 

    const defaultStyle = {
        transition: `opacity ${speed}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: { opacity: 0 },
        entered:  { opacity: 1 },
    }
    
    return (
        <Transition 
            in={children ? true : false} 
            timeout={{
                appear: delay,
                enter: delay,
                exit: delay
            }}
            appear={true}>
                
            {state => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                    ...styles}}
                    className={className}>

                    {children}
                </div>
            )}
        </Transition>
    )
}

export default TransitionGroupFadeIn