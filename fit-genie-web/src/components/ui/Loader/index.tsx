import styles from './styles.module.scss';

import { FaSpinner } from "react-icons/fa";

export function Loader(props: { color: string, size: number }): JSX.Element {
    const { color, size } = props;
    return (
        <div className={styles.containerLoading}>
            <FaSpinner className={styles.spin} color={color} size={size} />
        </div>
    )
}
