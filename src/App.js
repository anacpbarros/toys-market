import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useHistory,
  useParams,
} from "react-router-dom";
import { Spin, Modal, Form } from "antd";
import Login from "./Components/Login/Login.jsx";
import CadastroUsuario from "./Components/CadastroUsuario/CadastroUsuario.jsx";
import ListagemProdutos from "./Components/ListagemProdutos/ListagemProdutos.jsx";
import Carrinho from "./Components/Carrinho/Carrinho.jsx";
import Admin from "./Components/Admin/Admin.jsx";

function App() {
  const isAdmin = false;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(title);
  console.log(price);
  console.log(description);
  console.log(productsList);

  const onChangeTitleHandler = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const onChangePriceHandler = (e) => {
    const { value } = e.target;
    setPrice(value);
  };

  const onChangeDescriptionHandler = (e) => {
    const { value } = e.target;
    setDescription(value);
  };

  const createNewProduct = async (newProduct) => {
    await fetch("http://localhost:3001/produtos", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const fetchProductsHandler = useCallback(() => {
    setIsLoading(true);
    fetch("http://localhost:3001/produtos", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Algum erro aconteceu!");
        return response.json();
      })
      .then((data) => {
        setProductsList(data);
      })
      .catch((error) => {
        setError(error);
      });
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const onClickSubmitNovoProduto = (e) => {
    e.preventDefault();
    createNewProduct({
      title,
      price,
      description,
      selected,
      checked,
    });

    fetchProductsHandler();

    setTitle("");
    setPrice("");
    setDescription("");
  };

  const loading = (
    <div className="loading">
      <>
        <p>Carregando...</p>
        <Spin animation="border" variant="primary" />
      </>
    </div>
  );

  const updateSelectedStatusHandler = (completedItem) => {
    fetch(`http://localhost:3001/tarefas/${completedItem.id}`, {
      method: "PUT",
      body: JSON.stringify(completedItem),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  };

  const onClickAddHandler = (id) => {
    productsList.filter((p) => {
      if (p.id === id)
        return updateSelectedStatusHandler({
          ...p,
          selected: !p.selected,
        });
      return p;
    });
  };

  const createNewPedido = async (newPedido) => {
    await fetch("http://localhost:3001/pedidos", {
      method: "POST",
      body: JSON.stringify(newPedido),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const onClickFinalizarPedido = (pedido) => {
  
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route
          path="/produtos/lista"
          element={
            <ListagemProdutos
              productsList={productsList}
              onClickAddHandler={onClickAddHandler}
              fetchProductsHandler={fetchProductsHandler}
              block={!isAdmin}
            />
          }
        />
        <Route
          path="/meu-carrinho"
          element={<Carrinho onClickFinalizarPedido={onClickFinalizarPedido} />}
        />
        {isAdmin && (
          <Route
            path="/produtos"
            exact
            element={
              <Admin
                onChangeTitleHandler={onChangeTitleHandler}
                onChangePriceHandler={onChangePriceHandler}
                onChangeDescriptionHandler={onChangeDescriptionHandler}
                onClick={onClickSubmitNovoProduto}
                productsList={productsList}
              />
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
