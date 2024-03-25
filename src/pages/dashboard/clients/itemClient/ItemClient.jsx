import { formatDate } from '../../../../helpers/helpers'

const ItemClient = ({ client }) => {
    return (
        <tr >
            <td>
                <p className="name_product_cart">{client.name}</p>
            </td>
            <td>
                {client.address}
            </td>
            <td>
                {client.phone}
            </td>
            <td>
                {client.email}
            </td>
            <td>
                {formatDate(client.createdAt)}
            </td>
        </tr>
    )
}

export default ItemClient;