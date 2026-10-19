import Head from 'next/head'
import SearchPage from '../../../components/pages/SearchPage'
import { BASIC_TITLE, BASIC_DESCRIPTION } from '../../../components/pages/seoText'
import { TYPE_RENT, TYPE_SALE } from '../../../components/store/global/types'

export default function RentApartmentPaphos() {
    return (
        <div>
            <Head>
                <title>
                    {BASIC_TITLE
                        .replace('{properties}', 'Properties')
                        .replace('{rentSale}', 'rent')
                    }
                </title>

                <meta name="description" content={BASIC_DESCRIPTION.replace('{rentSale}', 'rent')}/>
            </Head>

            <SearchPage query={{ 
                saleRent: TYPE_RENT, 
                district: 'Paphos', 
                type: 'Apartment' 
            }}/>  
        </div>
    )
}
