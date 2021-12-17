import { PageHeader, Button, Table, Space } from "antd";

import "./Carrinho.css";

const Carrinho = ({ productsList, onClickFinalizarPedido }) => {
  const selectedProducts = productsList.map((p, i) => {
    let data;
    if (p.selected === true) {
      data = {
        key: i,
        product: p.product,
        price: p.price,
        description: p.description,
      };
    }

    return data;
  });

  const columns = [
    {
      title: "Nome do Produto",
      dataIndex: "product",
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 4,
      },
    },
    {
      title: "Preço",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      title: "Quantidade",
      dataIndex: "description",
      sorter: {
        compare: (a, b) => a.description - b.description,
        multiple: 2,
      },
    },
    {
      title: "Remover",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>X</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="site-page-header-ghost-wrapper">
      <div className="header">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="Toys Market"
          subTitle="Meu Carrinho"
        />
      </div>
      <div className="my-cart">
        <h1>Meu Carrinho</h1>
        <Table columns={columns} dataSource={selectedProducts} />
      </div>
      <div className="button-finalizar-pedido">
        <Button type="primary" onClick={() => onClickFinalizarPedido(selectedProducts)}>
          Finalizar Pedido
        </Button>
      </div>
    </div>
  );
};

export default Carrinho;
