// import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
// const onFinish = values => {
//   console.log('Success:', values);
// };
// const onFinishFailed = errorInfo => {
//   console.log('Failed:', errorInfo);
// };
// const Login = () => (
//   <Form
//     name="basic"
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ remember: true }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="Username"
//       name="username"
//       rules={[{ required: true, message: 'Please input your username!' }]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[{ required: true, message: 'Please input your password!' }]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item name="remember" valuePropName="checked" label={null}>
//       <Checkbox>Remember me</Checkbox>
//     </Form.Item>

//     <Form.Item label={null}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );
// export default Login;



import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axiosInstance from "../../../src/axiosinstance";
import {apiUrl} from "../../../config";
import { useNavigate, NavLink } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/api/auth/login`,
        values
      );
      console.log(response);

      if (response.data.success) {
        const { jwtToken, role,email } = response.data;

        // ✅ Allow only admin or user role to login
        if (role) {
          toast.success(response.data.message);
          localStorage.setItem("accessToken", jwtToken);
          localStorage.setItem("role", role);
          localStorage.setItem("userEmail", email);

          setIsLoading(true);

          setTimeout(() => {
            setIsLoading(false);
            if (role === "admin") {
              navigate("/dashboard");
            } else if (role === "user") {
              navigate("/dashboard"); // Make sure this route exists
            }
          }, 1000);
        } else {
          toast.error("Access denied. Only admin and user roles are allowed.");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="... animate__animated animate__fadeInDown">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-100 to-red-50 px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border-t-8 border-yellow-500 animate-fade-in-down">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm">Login to continue</p>
          </div>

          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              label={<span className="text-gray-700 font-medium">Email</span>}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="you@example.com"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-gray-700 font-medium">Password</span>
              }
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="••••••••"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-2 text-lg transition-all duration-200"
              >
                Log in
              </Button>
            </Form.Item>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <NavLink
                to="/register"
                className="text-yellow-600 font-semibold hover:underline"
              >
                Register
              </NavLink>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
