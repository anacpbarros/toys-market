import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, PageHeader, Button, Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import "./ListagemProdutos.css";

const ListagemProdutos = ({
  productsList,
  fetchProductsHandler,
  onClickAddHandler,
  block
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onClickMyCard = () => {
    navigate("/meu-carrinho");
  };

  const onClickAdminResources = () => {
    navigate("/produtos");
  };

  const productItem = productsList.map((product) => (
    <div className="product-items">
      <Card
        title={product.title}
        actions={[
          <PlusCircleOutlined onClick={() => onClickAddHandler(product.id)} />,
        ]}
      >
        <p>{product.description}</p>
      </Card>
    </div>
  ));

  const loading = (
    <div className="loading">
      <>
        <p>Carregando...</p>
        <Spin animation="border" variant="primary" />
      </>
    </div>
  );

  useEffect(() => {
    setIsLoading(setIsLoading);
    setTimeout(() => {
      fetchProductsHandler();
      setIsLoading(false);
    }, 2000);
  }, [fetchProductsHandler]);

  return (
    <>
      {!isLoading && (
        <div className="site-page-header-ghost-wrapper">
          <div className="header">
            <PageHeader
              ghost={false}
              title="Toys Market"
              subTitle="Produtos"
              extra={[
                <Button
                  key="2"
                  type="secondary"
                  onClick={onClickAdminResources}
                  disabled={block}
                >
                  Área do Admin
                </Button>,
                <Button key="1" type="primary" onClick={onClickMyCard} >
                  Meu Carrinho
                </Button>,
              ]}
            />
          </div>
          <div className="cards-list">{productItem}</div>
        </div>
      )}
      ;{isLoading && loading}
    </>
  );
};

export default ListagemProdutos;
