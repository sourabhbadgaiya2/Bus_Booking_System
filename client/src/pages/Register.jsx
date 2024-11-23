import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, message, Input } from "antd";
import axios from "../helpers/axios";
import { HideLoading, ShowLoading } from "../redux/reducers/alertSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const response = await axios.post("/user/register", values);
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        naviagte("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(response.data.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96 max-w-full'>
        <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>
          Register
        </h2>
        <Form onFinish={onFinish} layout='vertical'>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              type='text'
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your name'
            />
          </Form.Item>

          <Form.Item label='Email' name='email'>
            <Input
              type='email'
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
              type='password'
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your password'
            />
          </Form.Item>

          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Register
          </button>

          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{" "}
              <Link to='/login' className='text-blue-600 hover:underline'>
                Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
