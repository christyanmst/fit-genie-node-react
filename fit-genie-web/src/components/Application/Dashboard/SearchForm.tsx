import { Flex } from "rebass";
import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip } from "recharts";
import styles from './styles.module.scss';
import { toast } from "react-toastify";

export default function SearchForm() {
    const data = [
        {
            "name": "Jan",
            "uv": 15,
        },
        {
            "name": "Fev",
            "uv": 30,
        },
        {
            "name": "Mar",
            "uv": 25,
        },
        {
            "name": "Abr",
            "uv": 0,
        },
        {
            "name": "Mai",
            "uv": 0,
        },
        {
            "name": "Jun",
            "uv": 0,
        },
        {
            "name": "Jul",
            "uv": 0,
        },
        {
            "name": "Ago",
            "uv": 0,
        },
        {
            "name": "Set",
            "uv": 0,
        },
        {
            "name": "Out",
            "uv": 0,
        },
        {
            "name": "Nov",
            "uv": 0,
        },
        {
            "name": "Dez",
            "uv": 0,
        },
    ]

    return (
        <>
            <h3 style={{
                textAlign: 'center',
                color: 'white',
                marginTop: '50px'
            }}>Em implementação!</h3>
            <h4 style={{
                textAlign: 'center',
                color: 'white',

            }}>Gráfico de Check-in</h4>
            <Flex width={[1, 4 / 5, 3 / 4, 3 / 4, 1 / 2]} style={{
                margin: '1rem auto',
                height: 300,
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                borderRadius: '10px',
                borderBottom: '3px solid #009D9A',
                fontSize: '10px'

                }}>
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
                        <YAxis />
                        <Tooltip />
                        <Bar type="monotone" dataKey="uv" fill="#009D9A" />
                    </BarChart>
                </ResponsiveContainer>
            </Flex>
            <Flex justifyContent={"center"}>
                <button type="button" className={styles.buttonCheckIn} onClick={() => toast.warn("Ainda não implementado")}>{'Check-in'}</button>
            </Flex>
        </>
    )
}