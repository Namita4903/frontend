// import React, { useEffect, useState } from 'react';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, Checkbox, Form, Input, Spin, notification } from 'antd';
// import {useNavigate } from 'react-router';
// import Illustration from '../assets/images/login6.jpg';
// import axiosInstance from "../../src/axiosinstance";
// import "../register.css";
// import { apiUrl } from "../../config";
// import "../index.css";

// import Navbar from "../../src/components/navbar";
// import Footer from "../../src/components/footer";


// const Login = () => {
//   const [api, contextHolder] = notification.useNotification();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [isNavigating, setIsNavigating] = useState(false);

//   const openNotificationWithIcon = (type, title, description) => {
//     api[type]({
//       message: title,
//       description: description,
//     });
//   };

//   useEffect(() => {
//     console.log("Login component mounted.");
//   }, []);

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.post(`${apiUrl}/api/auth/login`, values);
//       console.log("API Resdsdsdsddsponse:", response.data);

//       if (response) {
//       console.log("API Resdsdsdsddsponse:", response.data);

//         openNotificationWithIcon('success', 'Login Successful', 'Welcome back! 🎉');
//         localStorage.setItem('Username', response.data.userName);
//         localStorage.setItem('userId', response.data.userId);
//         localStorage.setItem('jwtToken',response.data.jwtToken)
//         localStorage.setItem('userEmail',response.data.email)
//         localStorage.setItem('userRole',response.data.role)
//         window.dispatchEvent(new Event("authChange"));
//         sessionStorage.setItem('email', response.data.email);

//         setTimeout(() => {
//           setLoading(false);
//           navigate(response.data.redirectTo || '/dashboard');
//         }, 1500);
//       } else {
//         setLoading(false);
//         openNotificationWithIcon('error', 'Login Failed', response.data.message || 'Invalid credentials.');
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error('Login error:', error);

//       if (error.response && error.response.data) {
//         openNotificationWithIcon('error', 'Login Failed', error.response.data.message || 'User not registered.');
//       } else if (error.code === 'ECONNABORTED') {
//         openNotificationWithIcon('error', 'Request Timeout', 'The request took too long — please try again.');
//       } else {
//         openNotificationWithIcon('error', 'Network Error', 'Check your internet connection or server.');
//       }
//     }
//   };

//   const handleNavigateToRegister = () => {
//     setIsNavigating(true);
//     setTimeout(() => {
//       navigate("/register");
//     }, 1500);
//   };

//   return (
//     <>
//       {contextHolder}

//       {isNavigating && (
//         <div className="full-page-loader">
//           <Spin size="large" tip="Redirecting to Register..." />
//         </div>
//       )}

//       {!isNavigating && (
//         <>
//         <Navbar/>

//           <div className="login-page">
//             <div className="login-container">
//               <div className="login-left">
//                 <div className="login-header">
//                   <h2>Holla, Welcome Back</h2>
//                   <p>Hey, welcome back to your special place</p>
//                 </div>

//                 <Spin spinning={loading} tip="Logging in...">
//                   <Form
//                     name="login"
//                     initialValues={{ remember: true }}
//                     className="login-form"
//                     onFinish={onFinish}
//                   >
//                     <Form.Item
//                       name="email"
//                       rules={[{ required: true, message: 'Please input your email!' }]}
//                     >
//                       <Input prefix={<UserOutlined />} placeholder="Email" />
//                     </Form.Item>

//                     <Form.Item
//                       name="password"
//                       rules={[{ required: true, message: 'Please input your Password!' }]}
//                     >
//                       <Input.Password prefix={<LockOutlined />} placeholder="Password" />
//                     </Form.Item>

//                     <Form.Item className="login-options">
//                       <Checkbox>Remember me</Checkbox>
//                       <a href="#" className="forgot-password">Forgot Password?</a>
//                     </Form.Item>

//                     <Form.Item>
//                       <Button className='button' block type="primary" htmlType="submit">Sign In</Button>
//                     </Form.Item>

//                     <p className="register-text">
//                       Don't have an account? <Button type="link" onClick={handleNavigateToRegister}>Sign Up</Button>
//                     </p>
//                   </Form>
//                 </Spin>
//               </div>

//               <div className="login-right">
//                 <img src={Illustration} alt="Login Illustration" className="login-illustration" />
//               </div>
//             </div>
//           </div>
//           <Footer/>
//         </>
//       )}
//     </>
//   );
// };

// export default Login;
import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Spin, notification } from 'antd';
import { useNavigate } from 'react-router';
import Illustration from '../assets/images/login6.jpg';
import axiosInstance from "../../src/axiosinstance";
import "../register.css";
import { apiUrl } from "../../config";
import "../index.css";

import Navbar from "../../src/components/navbar";
import Footer from "../../src/components/footer";

const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  useEffect(() => {
    console.log("Login component mounted.");
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`${apiUrl}/api/auth/login`, values);
      console.log("API Response:", response.data);

      if (response) {
        openNotificationWithIcon('success', 'Login Successful', 'Welcome back! 🎉');
        localStorage.setItem('Username', response.data.userName);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('jwtToken', response.data.jwtToken);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userRole', response.data.role);
        window.dispatchEvent(new Event("authChange"));
        sessionStorage.setItem('email', response.data.email);

        setTimeout(() => {
          setLoading(false);
          // Redirect based on role
          if (response.data.role === 'doctor') {
            navigate('/doctor');
          } else {
            navigate('/dashboard');
          }
        }, 1500);
      } else {
        setLoading(false);
        openNotificationWithIcon('error', 'Login Failed', response.data.message || 'Invalid credentials.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);

      if (error.response && error.response.data) {
        openNotificationWithIcon('error', 'Login Failed', error.response.data.message || 'User not registered.');
      } else if (error.code === 'ECONNABORTED') {
        openNotificationWithIcon('error', 'Request Timeout', 'The request took too long — please try again.');
      } else {
        openNotificationWithIcon('error', 'Network Error', 'Check your internet connection or server.');
      }
    }
  };

  const handleNavigateToRegister = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/register");
    }, 1500);
  };

  return (
    <>
      {contextHolder}

      {isNavigating && (
        <div className="full-page-loader">
          <Spin size="large" tip="Redirecting to Register..." />
        </div>
      )}

      {!isNavigating && (
        <>
          <Navbar />

          <div className="login-page">
            <div className="login-container">
              <div className="login-left">
                <div className="login-header">
                  <h2>Holla, Welcome Back</h2>
                  <p>Hey, welcome back to your special place</p>
                </div>

                <Spin spinning={loading} tip="Logging in...">
                  <Form
                    name="login"
                    initialValues={{ remember: true }}
                    className="login-form"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="email"
                      rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                      <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item className="login-options">
                      <Checkbox>Remember me</Checkbox>
                      <a href="#" className="forgot-password">Forgot Password?</a>
                    </Form.Item>

                    <Form.Item>
                      <Button className='button' block type="primary" htmlType="submit">Sign In</Button>
                    </Form.Item>

                    <p className="register-text">
                      Don't have an account? <Button type="link" onClick={handleNavigateToRegister}>Sign Up</Button>
                    </p>
                  </Form>
                </Spin>
              </div>

              <div className="login-right">
                <img src={Illustration} alt="Login Illustration" className="login-illustration" />
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Login;
