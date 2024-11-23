import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { HideLoading, ShowLoading } from "../../redux/reducers/alertSlice";
import axiosInstance from "../../helpers/axios";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";

const AdminBuses = () => {
  const [showBusForm, setShowBusForm] = useState(false); // Bus form modal open/close state
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  const dispatch = useDispatch();

  // Get all buses
  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/buses/get-all-buses", {});
      dispatch(HideLoading());

      if (response.data.success) {
        setBuses(response.data.data);
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const deleteBus = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/buses/delete-bus", {
        _id: id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getBuses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  //
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Action", // Table ka column title
      dataIndex: "action", // Data ke kis field se map karna hai (yahan directly nahi use ho raha)
      render: (action, record) => (
        <div className='flex space-x-3'>
          <i
            className='text-xl cursor-pointer text-red-500 ri-delete-bin-line' // Icon ka size aur color set kiya
            onClick={() => {
              deleteBus(record._id); // Bus ka id pass karke delete function call karo
            }}
          ></i>

          {/* Edit icon - bus edit karne ke liye */}

          <i
            className='text-xl cursor-pointer text-blue-500 ri-pencil-line' // Icon ka size aur color set kiya
            onClick={() => {
              setSelectedBus(record); // Selected bus set karo
              setShowBusForm(true); // Edit form ko dikhane ke liye true set karo
            }}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div className='p-4'>
      {/* Page Header */}
      <div className='flex justify-between items-center'>
        {/* Page Title */}
        <PageTitle title={"Buses"} />

        {/* Add Bus Button */}
        <button
          onClick={() => setShowBusForm(true)} // Show bus form when clicked
          className='bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all'
        >
          Add Bus
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={buses.map((bus) => ({ ...bus, key: bus._id }))}
      />

      {/* Bus Form Modal */}
      {showBusForm && (
        <div className='fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          {/* Modal Content */}
          <div className='bg-white rounded-lg p-6 w-full max-w-lg'>
            {/* Bus Form */}
            <BusForm
              showBusForm={showBusForm}
              setShowBusForm={setShowBusForm}
              type={selectedBus ? "edit" : "add"}
              selectedBus={selectedBus}
              setSelectedBus={setSelectedBus}
              getData={getBuses}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBuses;
