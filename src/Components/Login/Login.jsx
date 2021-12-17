import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate("/produtos/lista");
  };

  const onClickCadastrar = () => {
    navigate("/cadastro-usuario");
  };

  return (
    <div className="login-container">
      <div className="user-login">
        <p>Bem vindo ao Toys Market</p>
        <Form
          name="basic"
        >
          <Form.Item
            className="username"
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="login-page-buttons">
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={onClickLogin}>
                Login
              </Button>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={onClickCadastrar}
              >
                Cadastrar
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
