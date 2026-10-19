import BedroomParentIcon from '@mui/icons-material/BedroomParentOutlined';
import ShowerIcon from '@mui/icons-material/ShowerOutlined';
import CropFreeIcon from '@mui/icons-material/CropFreeOutlined';
import BusinessIcon from '@mui/icons-material/BusinessOutlined';
import PoolIcon from '@mui/icons-material/PoolOutlined';
import KitchenIcon from '@mui/icons-material/KitchenOutlined';
import WindowIcon from '@mui/icons-material/WindowOutlined';
import WeekendIcon from '@mui/icons-material/WeekendOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnitOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCarOutlined';
import ApartmentIcon from '@mui/icons-material/ApartmentOutlined';
import BeachAccessIcon from '@mui/icons-material/BeachAccessOutlined';
import TodayIcon from '@mui/icons-material/TodayOutlined';
import SecurityIcon from '@mui/icons-material/SecurityOutlined';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';

export const INT_OPTIONS = [
    '1+',
    '2+',
    '3+',
    '4+',
    '5+',
    '6+'
]

export const FILTER_TYPE_INT = 'int'
export const FILTER_TYPE_BOOL = 'bool'
export const FILTER_TYPE_METERS = 'meters'
export const FILTER_TYPE_DISTANCE = 'distance'
export const FILTER_TYPE_TEXT = 'text'

export const FILTER_BEDROOMS = 'bedrooms'
export const FILTER_BATHROOMS = 'bathrooms'
export const FILTER_LIVING_SPACE = 'livingSpace'
export const FILTER_TOTAL_AREA = 'totalArea'
export const FILTER_POOL = 'pool'
export const FILTER_NEW_BUILDING = 'newBuilding'
export const FILTER_PARKING = 'parking'
export const FILTER_STOREYS = 'storeys'
export const FILTER_APPLIENCES = 'appliances'
export const FILTER_VIEW = 'view'
export const FILTER_FURNITURE = 'furniture'
export const FILTER_AIR_CONDITIONING = 'airConditioning'
export const FILTER_DISTANCE_TO_THE_SEA = 'distanceToTheSea'
export const FILTER_YEAR_OF_CONSTRUCTION = 'yearOfConstruction'
export const FILTER_GATED_COMPLEX = 'gatedComplex'
export const FILTER_TITLE = 'title'

export const FILTERS = [
    {
        name: FILTER_BEDROOMS,
        icon: BedroomParentIcon,
        type: FILTER_TYPE_INT
    },
    {
        name: FILTER_BATHROOMS,
        icon: ShowerIcon,
        type: FILTER_TYPE_INT
    },
    {
        name: FILTER_LIVING_SPACE,
        icon: CropFreeIcon,
        type: FILTER_TYPE_METERS
    },
    {
        name: FILTER_TOTAL_AREA,
        icon: CropFreeIcon,
        type: FILTER_TYPE_METERS
    },
    {
        name: FILTER_POOL,
        icon: PoolIcon,
        type: FILTER_TYPE_BOOL
    },
    {
        name: FILTER_NEW_BUILDING,
        icon: ApartmentIcon,
        type: FILTER_TYPE_BOOL
    },
    {
        name: FILTER_PARKING,
        icon: DirectionsCarIcon,
        type: FILTER_TYPE_BOOL
    },
    {
        name: FILTER_STOREYS,
        icon: BusinessIcon,
        type: FILTER_TYPE_INT
    },
    {
        name: FILTER_APPLIENCES,
        icon: KitchenIcon,
        type: FILTER_TYPE_BOOL
    },
    {
        name: FILTER_VIEW,
        icon: WindowIcon,
        type: FILTER_TYPE_TEXT
    },
    {
        name: FILTER_FURNITURE,
        icon: WeekendIcon,
        type: FILTER_TYPE_BOOL
    },
    {
        name: FILTER_AIR_CONDITIONING,
        icon: AcUnitIcon,
        type: FILTER_TYPE_BOOL
    },
    {
        name: FILTER_DISTANCE_TO_THE_SEA,
        icon: BeachAccessIcon,
        type: FILTER_TYPE_DISTANCE
    },
    {
        name: FILTER_YEAR_OF_CONSTRUCTION,
        icon: TodayIcon,
        type: FILTER_TYPE_INT
    },
    {
        name: FILTER_GATED_COMPLEX,
        icon: SecurityIcon,
        type: FILTER_TYPE_BOOL
    },
    {
        name: FILTER_TITLE,
        icon: DescriptionIcon,
        type: FILTER_TYPE_BOOL
    }
]