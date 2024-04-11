import SearchForm from "@/components/Application/Dashboard/SearchForm";
import { Header } from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Painel - Fit Genie</title>
            </Head>
            <Header />
            <SearchForm />
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})