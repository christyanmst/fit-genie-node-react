import { FormEvent, useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import logoImg from '../../../public/logo.svg';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { RiLockPasswordLine, RiMailLine, RiUser3Line  } from 'react-icons/ri';
import { canSSRGuest } from '@/utils/canSSRGuest';

export default function SignUp() {
    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (!(name && email && password)) {
            toast.warning('Preencha todos os campos');
            return;
        }

        setLoading(true);

        const data = { name, email, password };

        await signUp(data);

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>FitGenie - Faça seu cadastro</title>
            </Head>
            <div className={styles.containerCenter}>
                <div className={styles.login}>
                    <Image src={logoImg} alt="Logo Fit Genie" className={styles.logo} />
                    <form onSubmit={handleSignUp}>
                        <Input icon={RiUser3Line} placeholder='Digite seu nome' type='text' onChange={(e) => setName(e.target.value)} maxLength={100} />

                        <Input  icon={RiMailLine} placeholder='Digite seu e-mail' type='text' onChange={(e) => setEmail(e.target.value)} maxLength={100} />

                        <Input icon={RiLockPasswordLine} placeholder='Digite sua senha' type='password' onChange={(e) => setPassword(e.target.value)} maxLength={20} />

                        <Button type="submit" loading={loading}>Cadastrar</Button>

                        <Link href={"/"} className={styles.text}>
                            <span>Já possui uma conta? Faça login!</span>
                        </Link>

                    </form>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})
