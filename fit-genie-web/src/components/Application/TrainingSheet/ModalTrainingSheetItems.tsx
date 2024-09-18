import Modal from 'react-modal';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { TrainingSheetItems } from './SearchForm';

interface ModalTrainingSheetProps {
    isOpen: boolean;
    onRequestClose: () => void;
    trainingSheetItem: TrainingSheetItems;
}

Modal.setAppElement('#__next');

export function ModalTrainingSheet({ isOpen, onRequestClose, trainingSheetItem }: ModalTrainingSheetProps) {
    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1c1b1f',
            borderRadius: '20px',
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} >
            <button className="react-modal-close" onClick={onRequestClose} style={{ background: 'transparent', border: 0 }}>
                <FiX size={45} color="#f34738" />
            </button>

            <div className={styles.containerModal}>
                <h2>{`Detalhes da Ficha: ${trainingSheetItem[0].training_sheet.name}`}</h2>

                {trainingSheetItem.map((item, index) => (
                    <section key={item.id} className={styles.containerModalItem}>
                        <span>{index + 1} - <strong>{item.name}</strong> - {item.series}x de {item.repetitions} repetições</span>
                        {item.link && (
                            <span className={styles.modalDescription}>
                                {item.link}
                            </span>
                        )}
                        <span className={styles.modalDescription}>{item.description}</span>
                    </section>
                ))}
            </div>
        </Modal>
    )
}