import React from 'react'
import cStyles from '../../styles/Slider.module.css'
import { withTheme } from '@mui/styles'
import Slider from '@mui/material/Slider'
import { 
	SECTION_FILTERS,
} from '../pages/pageSections'
import { useStore } from '../store/global/store'
import getComponentCopy from '../store/global/getComponentCopy'
import getCurrencyIcon from '../Helpers/getCurrencyIcon'
import PropertyDistanceToTheSea from '../Properties/PropertyDistanceToTheSea'
import _ from 'lodash'
import { join } from '../Helpers/joinClasses'

export const SLIDER_TYPE_PRICE_RENT = 'price rent'
export const SLIDER_TYPE_PRICE_BUY = 'price buy'
export const SLIDER_TYPE_SQUARE_METERS = 'square meters'
export const SLIDER_TYPE_SQUARE_METERS_SMALL = 'square meters small'
export const SLIDER_TYPE_DISTANCE = 'distance'
export const SLIDER_MIN = 10
export const SLIDER_MAX = 100

export const SLIDER_PRICE_RENT_RANGE = [
    250,
    100000
]

export const SLIDER_PRICE_BUY_RANGE = [
    10000,
    50000000
]

export const SLIDER_SQUARE_METERS_RANGE_SMALL = [
    50,
    5000
]

export const SLIDER_SQUARE_METERS_RANGE = [
    50,
    20000
]

export const SLIDER_DISTANCE_RANGE = [
    100,
    10000
]

const SliderComponent = props => {
	const {
        theme = {},
        styles = {},
        value = "",
        onChange = () => {},
        type,
        label,
        rangeDivision = 2
    } = props

    const [state] = useStore()

    const {
        locale = {},
        currency
    } = state

    const componentCopy = getComponentCopy({
		state,
		section: SECTION_FILTERS
	})

    function valuetext(value) {
        return `${value}°C`;
    }

    function convertToCurrency(price) {
        return getCurrencyIcon({
            locale,
            currency,
            price: price.toString()
        })
    }
    
    function getOptions() {
        let min = SLIDER_MIN
        let max = SLIDER_MAX
        let step = SLIDER_MIN
        let label = `{value}`

        if(type == SLIDER_TYPE_PRICE_RENT) {
            min = SLIDER_PRICE_RENT_RANGE[0]
            max = SLIDER_PRICE_RENT_RANGE[1]
            step = SLIDER_PRICE_RENT_RANGE[0]
            label = `{value} ${componentCopy.perMonth}`
        }

        if(type == SLIDER_TYPE_PRICE_BUY) {
            min = SLIDER_PRICE_BUY_RANGE[0]
            max = SLIDER_PRICE_BUY_RANGE[1]
            step = SLIDER_PRICE_BUY_RANGE[0]
        }

        if(type == SLIDER_TYPE_SQUARE_METERS_SMALL) {
            min = SLIDER_SQUARE_METERS_RANGE_SMALL[0]
            max = SLIDER_SQUARE_METERS_RANGE_SMALL[1]
            step = SLIDER_SQUARE_METERS_RANGE_SMALL[0]
            label = `{value}㎡`
        }

        if(type == SLIDER_TYPE_SQUARE_METERS) {
            min = SLIDER_SQUARE_METERS_RANGE[0]
            max = SLIDER_SQUARE_METERS_RANGE[1]
            step = SLIDER_SQUARE_METERS_RANGE[0]
            label = `{value}㎡`
        }

        if(type == SLIDER_TYPE_DISTANCE) {
            min = SLIDER_DISTANCE_RANGE[0]
            max = SLIDER_DISTANCE_RANGE[1]
            step = SLIDER_DISTANCE_RANGE[0]
        }

        return {
            min,
            max,
            step,
            label
        }
    }

    function getDefaultValues(options) {
        let min = options.min
        let max = options.max / rangeDivision

        let minMaxArray = []
        if(_.isString(value) && value) {
            minMaxArray = value.split(',')
            if(Array.isArray(minMaxArray) && minMaxArray[0] && minMaxArray[1]) {
                min = minMaxArray[0]
                max = minMaxArray[1]
            }
        }

        return {
            min,
            max
        }
    }

    const options = getOptions()
    const defaultValues = getDefaultValues(options)
    const [rangeValue, setRangeValue] = React.useState([defaultValues.min, defaultValues.max])

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        setRangeValue(newValue)
    }

    function getGetLabelValue(value) {
        let labelValue = value 
        if(type == SLIDER_TYPE_PRICE_RENT || type == SLIDER_TYPE_PRICE_BUY) {
            labelValue = convertToCurrency(value)
        }

        if(type == SLIDER_TYPE_DISTANCE) {
            labelValue = PropertyDistanceToTheSea(value.toString())
        }

        return labelValue
    }
    
    return (
        <div 
            className={cStyles['slider']}
            style={{
                ...styles,
                opacity: value ? 1 : 0.5
            }}>

            {label &&
                <span 
                    className={cStyles['slider-title']}
                    style={theme.typography.body1}>

                    {label}
                </span>
            }

            <div 
                className={join(cStyles['slider-labels'], cStyles['container-flex-center'])}
                style={theme.typography.body2}>

                <span style={{ marginRight: 'auto' }}>
                    {componentCopy.from} {options.label.replace('{value}', getGetLabelValue(rangeValue[0]))}
                </span>
                
                <span>
                    {componentCopy.to} {options.label.replace('{value}', getGetLabelValue(rangeValue[1]))}
                </span>
            </div>

            <Slider
                value={rangeValue}
                onChange={handleChange}
                valueLabelDisplay="off"
                getAriaValueText={valuetext}
                min={options.min}
                max={options.max}
                step={options.step}
                onChangeCommitted={(e, values) => onChange(values)}
                disableSwap
            />
        </div>
    )
}

export default withTheme(SliderComponent);