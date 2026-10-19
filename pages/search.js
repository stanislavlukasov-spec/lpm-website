import Head from 'next/head'
import _ from 'lodash'
import { useStore } from '../components/store/global/store'
import SearchPage from '../components/pages/SearchPage'

export default function Search() {
    const [state] = useStore()
    
    const {
        pageConfig = {}
    } = state

    const {
        pages = {}
    } = pageConfig

    if(_.isEmpty(pages.SearchPage)) {
        return false
    }

    return (
        <div>
            <Head>
                <title>Explore Propeties in Cyprus from Leading Estate Egents</title>
                <meta name="description" content="Find properties for rent or buy in Cyprus from top estate agents all in one place."/>
            </Head>

            <SearchPage />
        </div>
    )
}
