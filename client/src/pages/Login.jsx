import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "../helpers/axios";
import { ShowLoading, HideLoading } from "../redux/reducers/alertSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/user/login", values);
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(response.data.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96 max-w-full'>
        <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>
          Login
        </h2>
        <Form onFinish={onFinish} layout='vertical'>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your email'
            />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your password'
            />
          </Form.Item>

          <Button
            type='primary'
            htmlType='submit'
            className='w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Login
          </Button>

          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-600'>
              Don't have an account?{" "}
              <Link to='/register' className='text-blue-600 hover:underline'>
                Sign up
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
