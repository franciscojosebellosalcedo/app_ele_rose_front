import "./ItemProduct.css";

const ItemProduct = () => {
  return (
    <div className="item_grid_product">
      <img className="item_image" src={require("../../../../assest/image-test-product.png")} alt="imagen producto" />
      <div className="info_item">
        <p className="text_info">Nombre: <span>Collar de vida</span></p>
        <p className="text_info">Precio unidad: $ <span>20000</span></p>
        <p className="text_info">Cantidad: <span>3</span></p>
        <section className="actions_card">
          <button className="btn btn_card btn_edit">Editar</button>
          <button className="btn btn_card btn_delete">Eliminar</button>
          <button className="btn btn_card btn_new">Es nuevo</button>
        </section>
      </div>
      
    </div>
  )
}

export default ItemProduct