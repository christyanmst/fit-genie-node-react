import styles from './styles.module.scss';
import { FormEvent, useContext, useEffect, useState } from "react";
import { api } from "../../../services/apiClient";
import { toast } from "react-toastify";
import Router from "next/router";
import { CustomizedTable, TableColumns } from '@/components/ui/Table';
import { AuthContext } from '@/contexts/AuthContext';
import { Flex, Box } from 'reflexbox';

type TrainingSheetToRemove = number[];

type TrainingSheetItemDetails = {
    id: number | null;
    name: string;
    description: string;
    repetitions: number;
    series: number;
    link: string;
    training_sheet?: {
        id: number | null;
        name: string;
    }
}[]


export default function DetailForm(props: Readonly<{ training_sheet_id?: number | null }>) {
    const { training_sheet_id = null } = props;
    const { user } = useContext(AuthContext);
    const [nameTrainingSheet, setNameTrainingSheet] = useState('');

    const [nameItem, setNameItem] = useState('');
    const [idItem, setIdItem] = useState<null | number>(null);
    const [descriptionItem, setDescriptionItem] = useState('');
    const [seriesItem, setSeriesItem] = useState(0);
    const [repetitionItem, setRepetitionsItem] = useState(0);
    const [linkItem, setLinkItem] = useState('');
    const [showTrainingSheetItem, setShowTrainingSheetItem] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);


    const [trainingSheetItems, setTrainingSheetItems] = useState<TrainingSheetItemDetails>([]);
    const [trainingSheetsToRemove, setTrainingSheetsToRemove] = useState<TrainingSheetToRemove>([]);
    const [loading, setLoading] = useState(false);

    const columns: TableColumns = [
        {
            name: 'name',
            value: 'Nome',
            accessor: 'name',
        },
        {
            name: 'description',
            value: 'Descrição',
            accessor: 'description',
        },
        {
            name: 'series',
            value: 'Séries',
            accessor: 'series',
        },
        {
            name: 'repetitions',
            value: 'Repetições',
            accessor: 'repetitions',
        },
        {
            name: 'link',
            value: 'Link',
            accessor: 'link',
        },
    ]

    useEffect(() => {
        const getTrainingSheetInfo = async () => {
            try {
                const response = await api.get(`/training-sheet/detail/${training_sheet_id}`);
                setNameTrainingSheet(response.data[0]?.training_sheet.name);
                setTrainingSheetItems(response.data);
            } catch (error) {
                Router.push('/');
                console.log(error);
                toast.error('Não foi possível obter informações sobre essa Ficha de Treino');
            }
        };

        const fetchData = async () => {
            setLoading(true);
            if (training_sheet_id) {
                await getTrainingSheetInfo();
            }
            setLoading(false);
        };

        fetchData();
    }, [training_sheet_id]);

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            if (!nameTrainingSheet) {
                toast.warn("Insira o nome da Ficha de Treino")
                return;
            }
            if (!trainingSheetItems.length) {
                toast.warn("Insira exercícios na Ficha de Treino")
                return;
            }

            const result = await api.post('/training-sheet', { name: nameTrainingSheet, user_id: user?.id })

            await api.post('/training-sheet-item', { items: trainingSheetItems, training_sheet_id: result.data.id })

            toast.success('Ficha cadastrada com sucesso');
            Router.push('/trainingSheets');

        } catch (error) {
            console.log(error);
            toast.error('Não foi possível cadastrar a ficha')
        }
    }

    async function handleEdit(event: FormEvent) {
        event.preventDefault();
        try {
            if (!(nameTrainingSheet && trainingSheetItems.length)) {
                return;
            }


            await api.put(`/training-sheet/update`, { name: nameTrainingSheet, training_sheet_id });

            const updateItems = trainingSheetItems.filter((x) => x.id != null);
            if (updateItems.length) {
                await api.put('/training-sheet-item/update', { items: updateItems });
            }


            const newItems = trainingSheetItems.filter((x) => x.id == null);
            if (newItems.length) {
                await api.post('/training-sheet-item', { training_sheet_id: training_sheet_id, items: newItems });
            }

            toast.success('Ficha editada com sucesso');
            Router.push('/trainingSheets');

        } catch (error) {
            console.log(error);
            toast.error('Não foi possível editar a ficha')
        }
    }

    async function handleDelete(id?: number) {
        if (id) {
            trainingSheetsToRemove.push(id);
            setTrainingSheetsToRemove(trainingSheetsToRemove);
        }
        setTrainingSheetItems(trainingSheetItems.filter(x => x.id !== id));
    }

    async function handleEditItem(item: any, index: number) {
        setShowTrainingSheetItem(true);
        setNameItem(item.name);
        setDescriptionItem(item.description);
        setLinkItem(item.link);
        setRepetitionsItem(item.repetitions);
        setSeriesItem(item.series);
        setIdItem(item.id);
        setSelectedIndex(index);
    }

    async function cleanFieldsTrainingSheetItem() {
        setNameItem('');
        setDescriptionItem('');
        setLinkItem('');
        setRepetitionsItem(0);
        setSeriesItem(0);
        setIdItem(null);
        setSelectedIndex(null);
    }

    function changeEditItem(selectedIndex: number | null) {
        const updatedTrainingSheetItems = [...trainingSheetItems];
        if (!nameItem) {
            toast.warn("Insira um nome para o exercício")
            return;
        }


        if (selectedIndex != null) {
            updatedTrainingSheetItems[selectedIndex] = {
                training_sheet: {
                    name: nameTrainingSheet,
                    id: training_sheet_id
                },
                id: idItem,
                name: nameItem,
                description: descriptionItem,
                link: linkItem,
                repetitions: repetitionItem,
                series: seriesItem,
            };
        } else {
            updatedTrainingSheetItems.push({
                training_sheet: {
                    name: nameTrainingSheet,
                    id: training_sheet_id
                },
                id: idItem,
                name: nameItem,
                description: descriptionItem,
                link: linkItem,
                repetitions: repetitionItem,
                series: seriesItem,
            })
        }

        setTrainingSheetItems(updatedTrainingSheetItems);
        setShowTrainingSheetItem(false);
        cleanFieldsTrainingSheetItem();
    }

    return (
        <div className={styles.container}>
            <h1>{training_sheet_id ? 'Editar Ficha de Treino' : 'Nova Ficha de Treino'}</h1>
            <form className={styles.form} onSubmit={(e) => training_sheet_id ? handleEdit(e) : handleRegister(e)}>
                <input type="text" placeholder="Nome da Ficha de Treino" className={styles.input} value={nameTrainingSheet} onChange={(e) => setNameTrainingSheet(e.target.value)} />

                {showTrainingSheetItem ? (
                    <>
                        <h1 style={{ marginTop: '10px', marginBottom: '10px' }}>Exercícios da Ficha</h1>
                        <Flex className={styles.exercisesInputs} flexWrap="wrap" justifyContent="space-between" alignItems="center">
                            <Box width={[1, 2 / 4]}>
                                <div>Nome do Exercício</div>
                                <input type="text" placeholder="Nome do Exercício" className={styles.input} value={nameItem} onChange={(e) => setNameItem(e.target.value)} />
                            </Box>
                            <Box width={[1, 1 / 5]}>
                                <div>Séries</div>
                                <input type="number" placeholder="Séries" className={styles.input} value={seriesItem} onChange={(e) => setSeriesItem(Number(e.target.value))} />
                            </Box>
                            <Box width={[1, 1 / 5]}>
                                <div>Repetições</div>
                                <input type="number" placeholder="Repetições" className={styles.input} value={repetitionItem} onChange={(e) => setRepetitionsItem(Number(e.target.value))} />
                            </Box>
                            <Box width={[1]}>
                                <div>Link guia do exercício</div>
                                <input type="text" placeholder="Link do exercício" className={styles.input} value={linkItem} onChange={(e) => setLinkItem(e.target.value)} />
                            </Box>
                            <Box width={[1]}>
                                <div>Descreva o exercício</div>
                                <textarea placeholder="Descreva o exercício..." className={styles.input} value={descriptionItem} onChange={(e) => setDescriptionItem(e.target.value)} />
                            </Box>
                        </Flex>
                        <button type="button" className={styles.buttonAdd} onClick={() => changeEditItem(selectedIndex)}>{idItem ? 'Editar item' : 'Cadastrar item'}</button>
                    </>
                ) : (
                    <button type="button" className={styles.buttonAdd} onClick={() => { setIdItem(null); setShowTrainingSheetItem(true) }}>Novo exercício</button>
                )}


                <div style={{ width: '100%' }}>
                    <CustomizedTable columns={columns} data={trainingSheetItems} pageSize={15} extraBtns={true} handleDelete={handleDelete} handleEdit={handleEditItem} />
                </div>

                <button type="submit" className={styles.buttonAdd}>{training_sheet_id ? 'Editar' : 'Cadastrar'}</button>
            </form>
        </div>
    )
}