import { useEffect, useState } from "react";
// import { productsMock } from "../../../productsMock";
import ProductCard from "../../common/productCard/ProductCard";
import { useParams } from "react-router";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { name } = useParams(); // {}.name
  useEffect(() => {
    

    let productosCollection = collection(db, "products");
    let consulta = productosCollection;
    if (name) {
      let filtrado = query(productosCollection, where("category", "==", name));
      consulta = filtrado;
    }
    //todos o a veces una parte
    let getProducts = getDocs(consulta);
    getProducts.then((res) => {
      console.log(res.docs);
      let arrayBien = res.docs.map((elemento) => {
        return { id: elemento.id, ...elemento.data() };
      });
      setItems(arrayBien);
    });
  }, [name]);

  // const cargarProductos = () => {
  //   let productsCollection = collection(db, "products"); 

  //   productsMock.forEach((producto) => {
  //     addDoc(productsCollection, producto);
  //   });
  // };

  return (
    <div>
      <h1>Mis productos</h1>
      {/* <button onClick={cargarProductos}>Cargar productos</button> */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {items.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};
// []
// [con productos]
