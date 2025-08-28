import { useContext, useEffect, useState } from "react";
// import { productsMock } from "../../../productsMock";
import { useParams } from "react-router";
import { CartContext } from "../../../context/CartContext";
import Counter from "../../common/counter/Counter";
import { db } from "../../../firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";
const ItemDetailContainer = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    let productsCollection = collection(db, "products");
    let refDoc = doc(productsCollection, id);
    getDoc(refDoc).then((res) => setProduct({ id: res.id, ...res.data() }));
  }, [id]);

  return (
    <div>
      <h3>{product.title}</h3>
      <h3>{product.price}</h3>
      <Counter product={product} />
    </div>
  );
};

export default ItemDetailContainer;
