import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axios";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/reducers/userSlice";
import { HideLoading, ShowLoading } from "../redux/reducers/alertSlice";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.alerts);
  const { user } = useSelector((state) => state.users);

  const validateToken = async () => {
    try {
      dispatch(ShowLoading());

      const response = await axiosInstance.post(
        "/user/get-user-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(HideLoading());
        dispatch(SetUser(response.data.data));
      } else {
        navigate("/login");
        localStorage.removeItem("token");
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      message.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>{user !== null && <DefaultLayout>{children}</DefaultLayout>}</div>
  );
};

export default ProtectedRoutes;
