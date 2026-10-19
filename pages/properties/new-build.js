import Head from 'next/head'
import SearchPage from '../../components/pages/SearchPage'
import { TYPE_TITLE, BASIC_DESCRIPTION } from '../../components/pages/seoText'

export default function NewBuild() {
    return (
        <div>
            <Head>
                <title>
                    {TYPE_TITLE
                        .replace('{type}', 'new build')
                        .replace('{rentSale}', 'buy and rent')
                    }
                </title>

                <meta name="description" content={BASIC_DESCRIPTION.replace('{rentSale}', 'buy and rent')}/>
            </Head>

            <SearchPage query={{ newBuild: true }}/>  
        </div>
    )
}
