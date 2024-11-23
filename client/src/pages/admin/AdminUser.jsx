import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/reducers/alertSlice";
import axiosInstance from "../../helpers/axios";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";

const AdminUser = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  // Function to fetch all users from the server
  const getUsers = async () => {
    try {
      dispatch(ShowLoading()); // Show loading state while fetching data
      const response = await axiosInstance.post("/user/get-all-users", {});
      dispatch(HideLoading()); // Hide loading state after fetching data
      if (response.data.success) {
        setUsers(response.data.data); // Set users data in the state if the request is successful
      } else {
        message.error(response.data.message); // Show error message if the request fails
      }
    } catch (error) {
      dispatch(HideLoading()); // Hide loading in case of error
      message.error(error.message); // Show error message if there is an exception
    }
  };

  // Function to update user permissions (e.g., block/unblock, make/remove admin)
  const updateUserPermissions = async (user, action) => {
    try {
      let payload = null;

      // Logic to set payload based on the action performed (Make Admin, Remove Admin, Block, UnBlock)
      if (action === "make-admin") {
        payload = {
          ...user,
          isAdmin: true, // Make the user an admin
        };
      } else if (action === "remove-admin") {
        payload = {
          ...user,
          isAdmin: false, // Remove admin rights from the user
        };
      } else if (action === "block") {
        payload = {
          ...user,
          isBlocked: true, // Block the user
        };
      } else if (action === "unblock") {
        payload = {
          ...user,
          isBlocked: false, // Unblock the user
        };
      }

      dispatch(ShowLoading()); // Show loading state while making the request
      const response = await axiosInstance.post(
        "/user/update-user-permissions",
        payload
      );
      dispatch(HideLoading()); // Hide loading after the request is complete

      // Handle response based on success or failure
      if (response.data.success) {
        getUsers(); // Re-fetch users after updating permissions
        message.success(response.data.message); // Show success message
      } else {
        message.error(response.data.message); // Show error message if the update fails
      }
    } catch (error) {
      dispatch(HideLoading()); // Hide loading in case of error
      message.error(error.message); // Show error message if there is an exception
    }
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "Name", // Column for user's name
      dataIndex: "name",
    },
    {
      title: "Email", // Column for user's email
      dataIndex: "email",
    },
    {
      title: "Status", // Column for user's status (Blocked or Active)
      dataIndex: "",
      render: (data) => {
        return data.isBlocked ? "Blocked" : "Active"; // Check if the user is blocked or active
      },
    },
    {
      title: "Role", // Column for user's role (Admin or User)
      dataIndex: "",
      render: (data) => {
        if (data?.isAdmin) {
          return "Admin"; // Return 'Admin' if the user is an admin
        } else {
          return "User"; // Return 'User' if the user is a normal user
        }
      },
    },
    {
      title: "Action", // Column for user actions (Block/Unblock, Make Admin/Remove Admin)
      dataIndex: "action",
      render: (action, record) => (
        <div className='flex gap-3'>
          {record?.isBlocked && (
            <p
              className='underline text-blue-500 cursor-pointer'
              onClick={() => updateUserPermissions(record, "unblock")}
            >
              UnBlock
            </p>
          )}
          {!record?.isBlocked && (
            <p
              className='underline text-red-500 cursor-pointer'
              onClick={() => updateUserPermissions(record, "block")}
            >
              Block
            </p>
          )}
          {record?.isAdmin && (
            <p
              className='underline text-yellow-500 cursor-pointer'
              onClick={() => updateUserPermissions(record, "remove-admin")}
            >
              Remove Admin
            </p>
          )}
          {!record?.isAdmin && (
            <p
              className='underline text-green-500 cursor-pointer'
              onClick={() => updateUserPermissions(record, "make-admin")}
            >
              Make Admin
            </p>
          )}
        </div>
      ),
    },
  ];

  // Fetch users when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className='flex justify-between my-2'>
        <PageTitle title='Users' />
      </div>

      <Table
        columns={columns}
        dataSource={users.map((user) => ({ ...user, key: user._id }))}
      />
    </div>
  );
};

export default AdminUser;
