import React from 'react'
import Sorter from '../../components/Sorter';
import { Button } from 'rebass/styled-components';
import { Table } from './../../theme/globalElements';

const AdminTable = ({
    headers, body, orderHandler, editHandler, deleteHandler
}) => {
    return (
        <Table width={[1, 1, .9]}>
            <thead>
                <tr>
                    {Object.keys(headers).map(header => (
                        <th>
                            <Sorter handler={orderHandler} type={header} title={headers[header]} />
                        </th>
                    ))}
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                {body.map(item => (
                    <tr key={item._id}>
                        {Object.keys(headers).map(header => {
                            if (item[header]?.username) {
                                console.log('item', item)
                                return <p>{item[header].username}</p>
                            }
                            else {
                                return (
                                    <td>{item[header]}</td>
                                )
                            }
                        }
                        )}
                        <td>
                            <Button
                                mx={[3, 4]}
                                type="button"
                                data-id={item._id}
                                onClick={deleteHandler}
                            >
                                Törlés
                            </Button>
                            <Button
                                type="button"
                                data-id={item._id}
                                onClick={editHandler}
                            >
                                Szerkeszt
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default AdminTable;
