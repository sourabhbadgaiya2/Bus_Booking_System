import { Col, Form, message, Modal, Input, Row } from "antd";
import axios from "../helpers/axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/reducers/alertSlice";

const BusForm = ({
  showBusForm,
  setShowBusForm,
  type = "add",
  getData,
  selectedBus,
  setSelectedBus,
}) => {
  // Agar modal dikhana hai to `showBusForm` true hona chahiye
  if (!showBusForm) return null;
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      let response = null; // Response ko initialize kiya
      dispatch(ShowLoading());

      // Agar bus add karni ho toh
      if (type === "add") {
        response = await axios.post("/buses/add-bus", values); // Add bus API call
      } else {
        // Agar bus update karni ho toh
        response = await axios.post("/buses/update-bus", {
          ...values, // Form ke values ko include kiya
          _id: selectedBus._id, // Update ke liye selected bus ka id bhejna zaroori hai
        });
      }

      // Agar API call successful ho
      if (response.data.success) {
        message.success(response.data.message); // Success message dikhaya
      } else {
        message.error(response.data.message);
      }

      dispatch(HideLoading());
      getData(); // Table ya list ko refresh karne ke liye data ko dobara fetch kiya
      setShowBusForm(false); // Form ko band kar diya
      setSelectedBus(null); // Selected bus ko null kar diya
    } catch (error) {
      message.error(error.message); // Catch block me agar koi error aaye toh error message dikhaya
      dispatch(HideLoading()); // Loading spinner hata diya
    }
  };

  return (
    <Modal
      width={800}
      title={
        <div className='text-xl font-semibold text-blue-600'>
          {type === "add" ? "Add Bus" : "Update Bus"}
        </div>
      }
      open={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={false}
    >
      <Form onFinish={onFinish} initialValues={selectedBus}>
        <Row className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Bus Name */}
          <Col className='col-span-full'>
            <Form.Item
              label={
                <span className='font-medium text-gray-700'>Bus Name</span>
              }
              name='name'
            >
              <Input
                type='text'
                placeholder='Enter bus name'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'
              />
            </Form.Item>
          </Col>

          {/* Bus Number */}
          <Col>
            <Form.Item
              label={
                <span className='font-medium text-gray-700'>Bus Number</span>
              }
              name='number'
            >
              <Input
                type='text'
                placeholder='Enter bus number'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'
              />
            </Form.Item>
          </Col>

          {/* Capacity */}
          <Col>
            <Form.Item
              label={
                <span className='font-medium text-gray-700'>Capacity</span>
              }
              name='capacity'
            >
              <Input
                type='text'
                placeholder='Enter capacity'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'
              />
            </Form.Item>
          </Col>

          {/* From */}
          <Col>
            <Form.Item
              label={<span className='font-medium text-gray-700'>From</span>}
              name='from'
            >
              <Input
                type='text'
                placeholder='Starting location'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'
              />
            </Form.Item>
          </Col>

          {/* To */}
          <Col>
            <Form.Item
              label={<span className='font-medium text-gray-700'>To</span>}
              name='to'
            >
              <Input
                type='text'
                placeholder='Destination'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'
              />
            </Form.Item>
          </Col>

          {/* Journey Date */}
          <Col>
            <Form.Item
              label={
                <span className='font-medium text-gray-700'>Journey Date</span>
              }
              name='journeyDate'
            >
              <Input
                type='date'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'
              />
            </Form.Item>
          </Col>

          {/* Departure */}
          <Col>
            <Form.Item
              label={
                <span className='font-medium text-gray-700'>Departure</span>
              }
              name='departure'
            >
              <Input
                type='time'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'
              />
            </Form.Item>
          </Col>

          {/* Arrival */}
          <Col>
            <Form.Item
              label={<span className='font-medium text-gray-700'>Arrival</span>}
              name='arrival'
            >
              <Input
                type='time'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'
              />
            </Form.Item>
          </Col>

          {/* Type */}
          <Col>
            <Form.Item
              label={<span className='font-medium text-gray-700'>Type</span>}
              name='type'
            >
              <select className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'>
                <option value='AC'>AC</option>
                <option value='Non-AC'>Non-AC</option>
              </select>
            </Form.Item>
          </Col>

          {/* Fare */}
          <Col>
            <Form.Item
              label={<span className='font-medium text-gray-700'>Fare</span>}
              name='fare'
            >
              <Input
                type='text'
                placeholder='Enter fare'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'
              />
            </Form.Item>
          </Col>

          {/* Status */}
          <Col>
            <Form.Item
              label={<span className='font-medium text-gray-700'>Status</span>}
              name='status'
            >
              <select className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm'>
                <option value='Yet To Start'>Yet To Start</option>
                <option value='Running'>Running</option>
                <option value='Completed'>Completed</option>
              </select>
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
        <div className='flex justify-end mt-6'>
          <button
            className='px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-md shadow-md hover:from-blue-600 hover:to-green-600 transition-all duration-200'
            type='submit'
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default BusForm;
