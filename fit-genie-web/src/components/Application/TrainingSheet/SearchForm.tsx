import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/services/apiClient';
import { ModalTrainingSheet } from './ModalTrainingSheetItems';
import { AuthContext } from '@/contexts/AuthContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Router from 'next/router';

type TrainingSheets = {
    id: number;
    user_id: number;
    name: string;
}[]

export type TrainingSheetItems = {
    id: number;
    name: string;
    description: string;
    repetitions: number;
    series: number;
    link: string;
    training_sheet: {
        id: number,
        name: true,
    }
}[]

export default function SearchForm() {
    const { user } = useContext(AuthContext);
    const [trainingSheets, setTrainingSheets] = useState<TrainingSheets>([]);
    const [loading, setLoading] = useState(false);
    const [modalItem, setModalItem] = useState<TrainingSheetItems>([]);
    const [modalItemVisible, setModalItemVisible] = useState(false);


    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                setLoading(true);

                await getTrainingSheets(user?.id);
                setLoading(false);
            };

            fetchData();
        }
    }, [user]);

    async function getTrainingSheets(user_id: number) {
        try {
            const response = await api.get(`/training-sheet/user/${user_id}`);
            const trainingSheets: TrainingSheets = response.data;
            setTrainingSheets(trainingSheets);
        } catch (error) {
            toast.error('Erro ao obter fichas de treino');
        }
    }

    async function handleOpenModalView(id: number) {

        const response = await api.get(`/training-sheet/detail/${id}`);

        setModalItem(response.data);
        setModalItemVisible(true);
    }

    async function handleEditTrainingSheet(id: number) {

    }

    async function handleDeleteTrainingSheet(id: number) {
        try {
            await api.delete(`/training-sheet/delete/${id}`);
            toast.success('Sucesso ao deletar a ficha de treino');
            setTrainingSheets(prevTrainingSheets => prevTrainingSheets.filter(trainingSheet => trainingSheet.id !== id))
        } catch (error) {
            toast.error('Não foi possível deletar a ficha de treino');
        } 
    }

    return (
        <>
            <div className={styles.containerSearchForm}>
                <div className={styles.containerHeader}>
                    <h1>Fichas de treino</h1>
                    <button onClick={() => { }}>
                        <FaPlus className={styles.addButton} onClick={() => Router.push('/trainingSheets/create')} />
                    </button>
                </div>

                <article className={styles.listTrainingSheets}>
                    {trainingSheets.map((x) => (
                        <section key={x.id} className={styles.trainingSheetItem}>
                            <div className={styles.trainingSheetContent}>
                                <button onClick={() => handleOpenModalView(x.id)}>
                                    <div className={styles.tag} />
                                    <span>{x.name}</span>
                                </button>
                                <div className={styles.actions}>
                                    <button className={styles.editButton}>
                                        <FaEdit onClick={(() => Router.push(`/trainingSheets/update/${x.id}`))}/>
                                    </button>
                                    <button className={styles.deleteButton}>
                                        <FaTrash onClick={() => handleDeleteTrainingSheet(x.id) }/>
                                    </button>
                                </div>
                            </div>
                        </section>
                    ))}
                </article>
            </div>

            {modalItemVisible && <ModalTrainingSheet isOpen={modalItemVisible} onRequestClose={() => setModalItemVisible(false)} trainingSheetItem={modalItem} />}

        </>
    )
}
