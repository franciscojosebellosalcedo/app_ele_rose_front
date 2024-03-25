import { formatDate } from "../../../../helpers/helpers";
import "./ItemUser.css";

const ItemUser = ({user}) => {
    return (
        <tr >
            <td>
                <p className="name_product_cart">{user.name}</p>
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {formatDate(user.createdAt)}
            </td>
        </tr>
    )
}

export default ItemUser