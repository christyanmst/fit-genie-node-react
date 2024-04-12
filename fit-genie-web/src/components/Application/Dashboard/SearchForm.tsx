import { Flex } from "rebass";
import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip } from "recharts";
import styles from './styles.module.scss';
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { api } from "@/services/apiClient";
import { FaSpinner } from "react-icons/fa";

export default function SearchForm() {
    const { user } = useContext(AuthContext);
    const [checkInToday, setCheckInToday] = useState(false);
    const [loading, setIsLoading] = useState(false);

    const [data, setData] = useState([
        {
            "name": "Jan",
            "Quantidade": 0,
        },
        {
            "name": "Fev",
            "Quantidade": 0,
        },
        {
            "name": "Mar",
            "Quantidade": 0,
        },
        {
            "name": "Abr",
            "Quantidade": 0,
        },
        {
            "name": "Mai",
            "Quantidade": 0,
        },
        {
            "name": "Jun",
            "Quantidade": 0,
        },
        {
            "name": "Jul",
            "Quantidade": 0,
        },
        {
            "name": "Ago",
            "Quantidade": 0,
        },
        {
            "name": "Set",
            "Quantidade": 0,
        },
        {
            "name": "Out",
            "Quantidade": 0,
        },
        {
            "name": "Nov",
            "Quantidade": 0,
        },
        {
            "name": "Dez",
            "Quantidade": 0,
        },
    ])

    useEffect(() => {
        if (user?.id) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const response = await api.get(`/verify-checkIn-today/${user.id}`);
                    const checkInHist = await api.get(`/checkIn-hist/${user.id}`);
                    handleCheckInHist(checkInHist.data?.checkInHist);
                    setCheckInToday(response.data?.checkInToday);

                } catch (error) {
                    console.log(error);
                    toast.error('Não foi possível verificar o check-in');
                } finally {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 800);
                }
            }
            fetchData();
        }
    }, [user?.id])

    async function handleCheckIn() {
        if (user?.id) {
            if (checkInToday) {
                return toast.warn("Você já fez check-in hoje!")
            }
            try {
                await api.post(`/checkIn`, {
                    userId: user.id,
                });
                setCheckInToday(true);
                toast.success('Check-In feito com sucesso!');
            } catch (error) {
                console.log(error);
                toast.error('Não foi possível fazer o check-in')
            }
        }
    }

    function handleCheckInHist(checkInHist: any) {
        const newData = data.map((month, index) => ({
            name: month.name,
            Quantidade: checkInHist[(index + 1)],
        }));

        setData(newData);
    }


    return (
        <>
            <h4 style={{
                textAlign: 'center',
                color: 'white',
                marginTop: '10px',

            }}>Gráfico de Check-in</h4>
            <Flex width={[1, 4 / 5, 3 / 4, 1 / 2, 1 / 2]} style={{
                margin: '1rem auto',
                height: 300,
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: '10px',
                borderBottom: '3px solid #009D9A',
                fontSize: '10px',
                alignItems: 'center'

            }}>
                {loading ? (
                    <FaSpinner className={styles.spin} color="#009D9A" size={40} />
                ) : (
                    <ResponsiveContainer>
                        <BarChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <XAxis dataKey="name" />
                            <YAxis ticks={[0, 5, 10, 15, 20, 25, 30]} />
                            <Tooltip />
                            <Bar type="monotone" dataKey="Quantidade" fill="#009D9A" />
                        </BarChart>
                    </ResponsiveContainer>
                )}

            </Flex>
            <Flex justifyContent={"center"}>
                <button disabled={loading} type="button" className={styles.buttonCheckIn} onClick={() => handleCheckIn()}>{'Fazer Check-in'}</button>
            </Flex>
        </>
    )
}