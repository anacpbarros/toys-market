import { useState } from "react";
import { PageHeader, Radio } from "antd";
import ListaPedidos from "../ListagemPedidos/ListagemPedidos";
import CadastroProdutos from "../CadastroProdutos/CadastroProdutos";

import "./Admin.css";
import { useNavigate } from "react-router";

const Admin = ({
  onChangeTitleHandler,
  onChangePriceHandler,
  onChangeDescriptionHandler,
  onClick,
  productsList,
}) => {
    const navigate = useNavigate();

    const onClickBack = () => {
      navigate("/produtos/lista");
    };
    
  const [tabValue, setTabValue] = useState("1");

  const onHandleModeChange = (e) => {
    const { value } = e.target;
    setTabValue(value);
  };

  const option =
    tabValue === "2" ? (
      <CadastroProdutos
        onChangeTitleHandler={onChangeTitleHandler}
        onChangePriceHandler={onChangePriceHandler}
        onChangeDescriptionHandler={onChangeDescriptionHandler}
        onClick={onClick}
      />
    ) : (
      <ListaPedidos productsList={productsList} />
    );

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={onClickBack}
        title="Toys Market"
        subTitle="Produtos"
        extra={[
          <Radio.Group
            value={tabValue}
            buttonStyle="solid"
            onChange={onHandleModeChange}
          >
            <Radio.Button value="1">Lista de Pedidos</Radio.Button>
            <Radio.Button value="2">Cadastrar Produtos</Radio.Button>
          </Radio.Group>,
        ]}
      />
      <div className="option-container">{option}</div>
    </div>
  );
};

export default Admin;
