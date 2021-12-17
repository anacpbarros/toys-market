import { useState, useEffect, useCallback } from "react";
import { Table } from "antd";

const ListaPedidos = () => {
  const [pedido, setPedido] = useState("");

  const fetchTasksHandler = useCallback(() => {
    fetch("http://localhost:3001/tarefas", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Algum erro aconteceu!");
        return response.json();
      })
      .then((data) => {
        setPedido(data);
      })
      .catch((error) => 
      console.log(error)
      );
  }, []);

  useEffect(() => {
      fetchTasksHandler();
  }, [fetchTasksHandler]);

  const columns = [
    { title: "Produto", dataIndex: "product", key: "product" },
    { title: "Preço", dataIndex: "price", key: "price" },
    { title: "Descrição", dataIndex: "description", key: "description" },
    {
      title: "Remover",
      dataIndex: "",
      key: "x",
      render: () => <a>X</a>,
    },
  ];

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>{record.description}</p>
        )
      }}
      dataSource={pedido}
    />
  );
};

export default ListaPedidos;
