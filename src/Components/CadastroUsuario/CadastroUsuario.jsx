import { useState } from 'react';
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

import "./CadastroUsuario.css";

const CadastroUsuario = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const createNewUser = async (newUser) => {
    await fetch("http://localhost:3001/produtos", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const onClickCadastrar = () => {
    createNewUser({ name, userName, email, userPassword});
    navigate("/");
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onChangeName = (e) => {
    const { value } = e.target;
    setName(value);
  }

  const onChangeUserName = (e) => {
    const { value } = e.target;
    setUserName(value);
  }

  const onChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  }

  const onChangeUserPassword = (e) => {
    const { value } = e.target;
    setUserPassword(value);
  }

  return (
    <div className="cadastro-container">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={onChangeName}/>
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input onChange={onChangeEmail} />
        </Form.Item>

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
          <Input onChange={onChangeUserName} />
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
          <Input.Password onChange={onChangeUserPassword} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            onClick={onClickCadastrar}
          >
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CadastroUsuario;
