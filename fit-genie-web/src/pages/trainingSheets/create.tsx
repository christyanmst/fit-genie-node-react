import DetailForm from "@/components/Application/TrainingSheet/DetailForm";
import { Header } from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";

export default function Page() {
    return (
        <>
            <Head>
                <title>Nova Ficha de treino - FitGenie</title>
            </Head>
            <Header />
            <DetailForm />
        </>
        
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: { }
    }
})