import DetailForm from "@/components/Application/TrainingSheet/DetailForm";
import { Header } from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Page() {
    const Router = useRouter();

    return (
        <>
            <Head>
                <title>Editar Ficha de Treino - FitGenie</title>
            </Head>
            <Header />
            <DetailForm training_sheet_id={Number(Router.query.id)}/>
        </>
        
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: { }
    }
})