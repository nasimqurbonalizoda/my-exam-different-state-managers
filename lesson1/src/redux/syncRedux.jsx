import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduser, chexbox, deleteUser, edituser } from '../reducer/todosyncSlice';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Form,
  Space,
  Tag,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const SyncRedux = () => {
  const data = useSelector((state) => state.todosync.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState('all');

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const handleAdd = () => {
    formAdd.validateFields().then((values) => {
      const newUser = {
        id: Date.now(),
        name: values.name,
        age: values.age,
        status: false,
      };
      dispatch(adduser(newUser));
      setAddModalOpen(false);
      formAdd.resetFields();
    });
  };

  const handleEdit = () => {
    formEdit.validateFields().then((values) => {
      const updatedUser = {
        id: editRecord.id,
        name: values.name,
        age: values.age,
      };
      dispatch(edituser(updatedUser));
      setEditModalOpen(false);
      formEdit.resetFields();
      setEditRecord(null);
    });
  };

  const showEditModal = (record) => {
    setEditRecord(record);
    formEdit.setFieldsValue({
      name: record.name,
      age: record.age,
    });
    setEditModalOpen(true);
  };

  const filteredData = data
    ?.filter((el) => {
      if (filtered === 'all') return true;
      if (filtered === 'true') return el.status === true;
      if (filtered === 'false') return el.status === false;
      return true;
    })
    ?.filter((el) =>
      el?.name?.toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="Delete this user?"
            onConfirm={() => dispatch(deleteUser(record.id))}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
          <Button
            icon={record.status ? <DeleteOutlined /> : <PlusOutlined />}
            size="small"
            type={record.status ? 'default' : 'primary'}
            onClick={() => dispatch(chexbox(record.id))}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
    <Space size="large" style={{ width: '100%' }} orientation="vertical">      
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddModalOpen(true)}
          >
            Add User
          </Button>

          <Space>
            <Search
              placeholder="Search by name"
              allowClear
              onSearch={(value) => setSearch(value)}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
            <Select
              value={filtered}
              onChange={setFiltered}
              style={{ width: 120 }}
            >
              <Option value="all">All</Option>
              <Option value="true">Active</Option>
              <Option value="false">Inactive</Option>
            </Select>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: 'No users found' }}
        />
      </Space>

      
      
      <Modal
        title="Add New User"
        open={addModalOpen}
        onCancel={() => {
          setAddModalOpen(false);
          formAdd.resetFields();
        }}
        onOk={handleAdd}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={formAdd} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please enter age' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      
      
      <Modal
        title="Edit User"
        open={editModalOpen}
        onCancel={() => {
          setEditModalOpen(false);
          formEdit.resetFields();
          setEditRecord(null);
        }}
        onOk={handleEdit}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={formEdit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please enter age' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SyncRedux;