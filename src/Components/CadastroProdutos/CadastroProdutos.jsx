import { Form, Input, Button } from "antd";

const CadastroProdutos = ({
  onChangeTitleHandler,
  onChangePriceHandler,
  onChangeDescriptionHandler,
  onClick,
  onFinish
}) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="Nome do Produto"
        name="name"
        placeholder="Nome do Produto"
        rules={[
          {
            required: true,
          }
        ]}
      >
        <Input onChange={onChangeTitleHandler} />
      </Form.Item>

      <Form.Item
        name="price"
        label="Preço"
        placeholder="9999,99"
        rules={[{ required: true }]}
      >
        <Input onChange={onChangePriceHandler} />
      </Form.Item>

      <Form.Item name="descricao" label="Descrição do Produto">
        <Input.TextArea onChange={onChangeDescriptionHandler} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onClick}>
          Cadastrar Produto
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CadastroProdutos;
