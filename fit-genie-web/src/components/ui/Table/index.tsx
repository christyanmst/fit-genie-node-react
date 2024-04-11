
import Image from 'next/image';
import styles from './styles.module.scss';
import React from 'react';
import { FiEdit, FiX } from "react-icons/fi";

interface NewTableProps {
    columns: TableColumns;
    data: any[];
    pageSize: number;
    extraBtns?: boolean;
    handleEdit?: (row: any, index: number) => void;
    handleDelete?: (id: number) => void
}

export type TableColumns = {
    name: string;
    value: string;
    accessor: string;
}[]

export function CustomizedTable({ ...props }: NewTableProps) {
    const handleButtonClick = (id: number, handler: (id: number) => void) => {
        return () => {
            handler(id);
        };
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr style={{ justifyContent: 'space-between' }}>
                    {
                        props.columns.map((x) => (
                            <th key={x.name}>
                                {x.value}
                            </th>
                        ))
                    }
                    {
                        props.extraBtns && (
                            <th></th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {props.data.map((row, index) => ( 
                    <tr key={row.id}>
                        {props.columns.map((x) => (
                            <td key={x.name}>
                                {typeof row[x.accessor] === 'string' && row[x.accessor].length > 20? `${row[x.accessor].substring(0, 20)}...` : row[x.accessor] }
                            </td>
                        ))}
                        {props.extraBtns && (
                            <td>
                                <div className={styles.buttonContainer}>
                                    <FiEdit key={"button-edit"} className={styles.icon} onClick={() => props.handleEdit && props.handleEdit(row, index)} />
                                    <FiX key={"button-delete"} className={styles.icon} onClick={() => props.handleDelete && props.handleDelete(row['id'])} />
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}