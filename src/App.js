import { useState, useEffect } from "react";
import "./ProductApp.css";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newUserName, setNewUserName] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [users, setUsers] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductName, setEditingProductName] = useState("");

  const usersCollectionRef = collection(db, "users");

  // Registrar usuario y producto
  const createUser = async () => {
    if (newUserName && newProductName) {
      await addDoc(usersCollectionRef, { name: newUserName, product: newProductName });
      setNewUserName("");
      setNewProductName("");
      getUsers(); // Actualiza lista de usuarios
    } else {
      alert("Por favor, completa el nombre de usuario y el nombre del producto.");
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers(); // Actualiza lista de usuarios
  };

  // Editar producto
  const editProduct = (id, currentProductName) => {
    setEditingProductId(id);
    setEditingProductName(currentProductName);
  };

  const saveEditedProduct = async () => {
    if (editingProductName) {
      const userDoc = doc(db, "users", editingProductId);
      await updateDoc(userDoc, { product: editingProductName });
      setEditingProductId(null);
      setEditingProductName("");
      getUsers(); // Actualiza lista de usuarios
    } else {
      alert("El nombre del producto no puede estar vacío.");
    }
  };

  // Obtener usuarios
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Nombre de usuario..."
        value={newUserName}
        onChange={(event) => setNewUserName(event.target.value)}
      />
      <input
        placeholder="Nombre del producto..."
        value={newProductName}
        onChange={(event) => setNewProductName(event.target.value)}
      />
      <button onClick={createUser}>Registrar Usuario</button>

      {users.map((user) => (
        <div key={user.id}>
          <h1>Nombre de usuario: {user.name}</h1>
          <h2>Producto: {user.product}</h2>
          <button onClick={() => deleteUser(user.id)}>
            Eliminar Usuario
          </button>
          <button onClick={() => editProduct(user.id, user.product)}>
            Editar Producto
          </button>
        </div>
      ))}

      {editingProductId && (
        <div className="edit-product">
          <h3>Editar Producto</h3>
          <input
            placeholder="Nuevo nombre del producto..."
            value={editingProductName}
            onChange={(e) => setEditingProductName(e.target.value)}
          />
          <button onClick={saveEditedProduct}>Guardar Cambios</button>
          <button onClick={() => setEditingProductId(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default App;
