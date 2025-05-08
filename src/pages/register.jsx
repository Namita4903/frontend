// import React, { useState } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   DatePicker,
//   Select,
//   Spin,
//   notification,
// } from "antd";
// import { NavLink, useNavigate } from "react-router";
// import axios from "axios";
// import Logo from "../assets/images/logo.jpg";
// import "../register.css"
// import "../assets/images/register.jpg"

// const { Option } = Select;

// const Register = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isNavigating, setIsNavigating] = useState(false);
//   const [api, contextHolder] = notification.useNotification();
//   const navigate = useNavigate();

//   const openNotificationWithIcon = (type, title, description) => {
//     api[type]({
//       message: title,
//       description,
//     });
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     console.log("Form Values:", values);

//     try {
//       const response = await axios.post("http://localhost:5001/api/auth/register", values);

//       if (response.data.success) {
//         openNotificationWithIcon("success", "Registration Successful", "You have registered successfully! 🎉");
//         setTimeout(() => {
//           setLoading(false);
//           navigate(response.data.redirectTo || "/dashboard");
//         }, 1500);
//       } else {
//         setLoading(false);
//         openNotificationWithIcon("error", "Registration Failed", response.data.message || "Something went wrong.");
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Registration Error:", error);
//       openNotificationWithIcon("error", "Registration Failed", error.response?.data?.message || "Server error, please try again later.");
//     }
//   };

//   const handleNavigateToLogin = () => {
//     setIsNavigating(true);
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500);
//   };

//   return (
//     <>
//       {contextHolder}
//       {isNavigating && (
//         <div className="full-page-loader">
//           <Spin size="large" tip="Redirecting to Login..." />
//         </div>
//       )}

//       {!isNavigating && (
//         <>
//           <header className="main-header">
//             <div className="container">
//               <div className="logo-container">
//                 <img src={Logo} alt="Medical Tracker Logo" className="logo" />
//                 <h1 className="site-name">Medical History Tracker</h1>
//               </div>
//               <nav className="navbar">
//                 <ul>
//                   <li><NavLink to="/">Home</NavLink></li>
//                   <li><NavLink to="/dashboard">Dashboard</NavLink></li>
//                   <li><NavLink to="/doctor">Doctors</NavLink></li>
//                   <li><NavLink to="/login">Login</NavLink></li>
//                   <li><NavLink to="/reports">Reports</NavLink></li>
//                   <li><NavLink to="/contact">Contact</NavLink></li>
//                 </ul>
//               </nav>
//             </div>
//           </header>

//           <div className="register-container">
//             <Spin spinning={loading} tip="Registering...">
//               <Form
//                 form={form}
//                 name="register"
//                 onFinish={handleSubmit}
//                 style={{
//                   maxWidth: 600,
//                   margin: "50px auto",
//                   padding: "20px",
//                   border: "1px solid #ddd",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <Form.Item
//                   name="email"
//                   label="E-mail"
//                   rules={[{ type: "email", required: true, message: "Enter a valid email!" }]}
//                 >
//                   <Input />
//                 </Form.Item>

//                 <Form.Item
//                   name="password"
//                   label="Password"
//                   rules={[{ required: true, message: "Enter your password!" }]}
//                 >
//                   <Input.Password />
//                 </Form.Item>

//                 <Form.Item
//                   name="confirmPassword"
//                   label="Confirm Password"
//                   dependencies={["password"]}
//                   hasFeedback
//                   rules={[
//                     { required: true, message: "Confirm your password!" },
//                     ({ getFieldValue }) => ({
//                       validator(_, value) {
//                         return value === getFieldValue("password") ? Promise.resolve() : Promise.reject("Passwords do not match!");
//                       },
//                     }),
//                   ]}
//                 >
//                   <Input.Password />
//                 </Form.Item>

//                 <Form.Item
//                   name="Username"
//                   label="Name"
//                   rules={[{ required: true, message: "Enter your name!" }]}
//                 >
//                   <Input />
//                 </Form.Item>

//                 <Form.Item
//                   name="phone"
//                   label="Phone Number"
//                   rules={[{ required: true, message: "Enter your phone number!" }]}
//                 >
//                   <Input />
//                 </Form.Item>

//                 <Form.Item
//                   name="bloodGroup"
//                   label="Blood Group"
//                   rules={[{ required: true, message: "Select your blood group!" }]}
//                 >
//                   <Select placeholder="Select your blood group">
//                     {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
//                       <Option key={bg} value={bg}>{bg}</Option>
//                     ))}
//                   </Select>
//                 </Form.Item>

//                 <Form.Item
//                   name="dob"
//                   label="Date of Birth"
//                   rules={[{ required: true, message: "Enter your date of birth!" }]}
//                 >
//                   <DatePicker format="YYYY-MM-DD" placeholder="Select Date" />
//                 </Form.Item>

//                 <Form.Item
//                   name="gender"
//                   label="Gender"
//                   rules={[{ required: true, message: "Select your gender!" }]}
//                 >
//                   <Select placeholder="Select your gender">
//                     <Option value="male">Male</Option>
//                     <Option value="female">Female</Option>
//                     <Option value="other">Other</Option>
//                   </Select>
//                 </Form.Item>

//                 <Form.Item>
//                   <Button className="button" type="primary" htmlType="submit" block loading={loading}>
//                     Register
//                   </Button>
//                   <p style={{ marginTop: "10px" }}>
//                     Already have an account?{" "}
//                     <Button type="link" onClick={handleNavigateToLogin}>
//                       Login now!
//                     </Button>
//                   </p>
//                 </Form.Item>
//               </Form>
//             </Spin>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Register;

// import React, { useState } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   DatePicker,
//   Select,
//   Spin,
//   notification,
// } from "antd";
// import { NavLink, useNavigate } from "react-router";
// import axios from "axios";
// import Logo from "../assets/images/logo.jpg";
// import RegisterIllustration from "../assets/images/register4.png";
// import "../register.css";

// const { Option } = Select;

// const Register = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [api, contextHolder] = notification.useNotification();
//   const navigate = useNavigate();

//   const openNotificationWithIcon = (type, title, description) => {
//     api[type]({
//       message: title,
//       description,
//     });
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:5001/api/auth/register", values);

//       if (response.data.success) {
//         openNotificationWithIcon("success", "Registration Successful", "You have registered successfully! 🎉");
//         setTimeout(() => {
//           setLoading(false);
//           navigate(response.data.redirectTo || "/dashboard");
//         }, 1500);
//       } else {
//         setLoading(false);
//         openNotificationWithIcon("error", "Registration Failed", response.data.message || "Something went wrong.");
//       }
//     } catch (error) {
//       setLoading(false);
//       openNotificationWithIcon("error", "Registration Failed", error.response?.data?.message || "Server error, please try again later.");
//     }
//   };

//   return (
//     <>
//       {contextHolder}

//       <div className="register-container">
//         <div className="register-box">
//           <div className="register-form-container">
//             <h2>Create Your Account</h2>
//             <p>Sign up to track your medical history easily.</p>

//             <Form form={form} name="register" onFinish={handleSubmit}>
//               <Form.Item
//                 name="email"
//                 label="E-mail"
//                 rules={[{ type: "email", required: true, message: "Enter a valid email!" }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 name="password"
//                 label="Password"
//                 rules={[{ required: true, message: "Enter your password!" }]}
//               >
//                 <Input.Password />
//               </Form.Item>

//               <Form.Item
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 dependencies={["password"]}
//                 hasFeedback
//                 rules={[
//                   { required: true, message: "Confirm your password!" },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       return value === getFieldValue("password") ? Promise.resolve() : Promise.reject("Passwords do not match!");
//                     },
//                   }),
//                 ]}
//               >
//                 <Input.Password />
//               </Form.Item>

//               <Form.Item
//                 name="username"
//                 label="Full Name"
//                 rules={[{ required: true, message: "Enter your name!" }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 name="phone"
//                 label="Phone Number"
//                 rules={[{ required: true, message: "Enter your phone number!" }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 name="dob"
//                 label="Date of Birth"
//                 rules={[{ required: true, message: "Enter your date of birth!" }]}
//               >
//                 <DatePicker format="YYYY-MM-DD" placeholder="Select Date" />
//               </Form.Item>

//               <Form.Item
//                 name="gender"
//                 label="Gender"
//                 rules={[{ required: true, message: "Select your gender!" }]}
//               >
//                 <Select placeholder="Select your gender">
//                   <Option value="male">Male</Option>
//                   <Option value="female">Female</Option>
//                   <Option value="other">Other</Option>
//                 </Select>
//               </Form.Item>

//               <Form.Item>
//                 <Button type="primary" htmlType="submit" block loading={loading}>
//                   Register
//                 </Button>
//                 <p style={{ marginTop: "10px" }}>
//                   Already have an account?{" "}
//                   <NavLink to="/login">Login now!</NavLink>
//                 </p>
//               </Form.Item>
//             </Form>
//           </div>

//           {/* Right Side - Illustration */}
//           <div className="register-illustration">
//             <img src={RegisterIllustration} alt="Register Illustration" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;

import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Spin,
  notification,
} from "antd";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import Logo from "../assets/images/logo.jpg";
import RegisterIllustration from "../assets/images/register4.png";
import "../register.css";
import "../index.css";
import {useGoogleLogin} from "@react-oauth/google";

import Navbar from "../../src/components/navbar";
import Footer from "../../src/components/footer";

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description,
    });
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        values
      );

      if (response.data.success) {
        openNotificationWithIcon(
          "success",
          "Registration Successful",
          "You have registered successfully! 🎉"
        );
        setTimeout(() => {
          setLoading(false);
          navigate(response.data.redirectTo || "/login");
        }, 1500);
      } else {
        setLoading(false);
        openNotificationWithIcon(
          "error",
          "Registration Failed",
          response.data.message || "Something went wrong."
        );
      }
    } catch (error) {
      setLoading(false);
      openNotificationWithIcon(
        "error",
        "Registration Failed",
        error.response?.data?.message || "Server error, please try again later."
      );
    }
  };

  const responseGoogle = async (authResult) => {
    console.log("Google Auth Response:", authResult);
    try {
        if (authResult.code) {
            const res = await axios.post(`http://localhost:5001/api/auth/google?code=${authResult.code}`);
            console.log("Response from backend:", res);
            const { email, name, image } = res.data.user;
            const token = res.data.token;
            const obj = { email, name, token, image };
            localStorage.setItem("user-info", JSON.stringify(obj));
            navigate("/AdminDashboard");
        } else {
            throw new Error("Google authentication failed");
        }
    } catch (e) {
        console.log("Error while Google Login...", e);
    }
};

const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
});

  return (
    <>
      {contextHolder}
      <Navbar />

      <div className="login-page">
        <div className="login-container">
          <div className="login-left">
            <div className="login-header">
              <h2>Create Your Account</h2>
              <p>Sign up to track your medical history easily.</p>
            </div>

            <Spin spinning={loading} tip="Registering...">
              <Form
                form={form}
                name="register"
                onFinish={handleSubmit}
                className="login-form"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Enter a valid email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Enter your password!" }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        return value === getFieldValue("password")
                          ? Promise.resolve()
                          : Promise.reject("Passwords do not match!");
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Enter your name!" }]}
                >
                  <Input placeholder="Full Name" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Enter your phone number!" },
                  ]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>

                <Form.Item
                  name="dob"
                  rules={[
                    { required: true, message: "Enter your date of birth!" },
                  ]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    placeholder="Select Date of Birth"
                  />
                </Form.Item>

                <Form.Item
                  name="gender"
                  rules={[{ required: true, message: "Select your gender!" }]}
                >
                  <Select placeholder="Select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="role"
                  label="Register As"
                  initialValue="patient"
                  rules={[{ required: true, message: "Please select a role!" }]}
                >
                  <Select>
                    <Option value="user">User</Option>
                    <Option value="patient">Patient</Option>
                    <Option value="doctor">Doctor</Option>
                    <Option value="admin">Admin</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="button"
                  >
                    Register
                  </Button>
                </Form.Item>

                <p className="register-text">
                  Already have an account?{" "}
                  <NavLink to="/login">Login now!</NavLink>
                </p>
              </Form>
              <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-700 text-sm">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <button
                    onClick={googleLogin}
                    className="flex items-center justify-center gap-2 w-full text-[#000] bg-white border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-100 transition mb-4"
                >
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="G" className="w-5 h-5" />
                    Continue with Google
                </button>
            
            </Spin>
          </div>

          <div className="login-right">
            <img
              src={RegisterIllustration}
              alt="Register Illustration"
              className="login-illustration"
            />
          </div>
        </div>
       
      </div>
      
      <Footer/>
      
    </>
  );
};

export default Register;
