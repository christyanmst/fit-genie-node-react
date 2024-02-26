import { Header } from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";

export default function Dashboard() {
    return(
        <>
            <Head>
                <title>Painel - Fit Genie</title>
            </Head>
            <Header />
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})