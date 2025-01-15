import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Row, Col, Table, Spin, Alert, message, Tabs, Input, Tag, Form } from "antd";
import { CheckCircleOutlined, FilePdfOutlined, PlayCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import useOrderDetails from "../hooks/useOrderDetailss";
import { inventoryColumns, processColumns, processIOColumns, processLogColumns } from "../Components/OrderDetails/Columns";
import { EndProcessModal, StartProcessModal } from "../Components/OrderDetails/Modals";
import StepsComponent from "../Components/OrderDetails/Steps";
import { useColors } from "../hooks/useColors";
import { UserContext } from "../Context/userContext";
import useProcessAction from "../hooks/useProcessAction";
import { useInventory } from "../hooks/useInventory";
import ReceiveItemModal from "../Components/Inventory/ReceiveItemModal";
import Header from "../Components/OrderDetails/Header";
import OrderInfo from "../Components/OrderDetails/OrderInfo";

const { Title } = Typography;
const { TabPane } = Tabs;

const getStatusTag = (status) => {
  switch (status) {
    case "COMPLETED":
      return <Tag color="green">Completed</Tag>;
    case "IN_PROGRESS":
      return <Tag color="blue">In Progress</Tag>;
    case "PENDING":
      return <Tag color="orange">Pending</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const OrderDetailsLayout = () => {
  const { id: orderId } = useParams();

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const { orderDetails, processes: initialProcesses, loading, error, processLogs, fetchProcessLogs, fetchProcesses, fetchOrderById, processInputs, processOutputs, fetchProcessInputs, fetchProcessOutputs } = useOrderDetails(orderId);
  const { startProcess, endProcess, fetchRequiredMaterials } = useProcessAction();
  const { fiberColors } = useColors();
  const { createInventory } = useInventory();

  const [processes, setProcesses] = useState([]);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [selectedFibers, setSelectedFibers] = useState([]);
  const [startProcessModalVisible, setStartProcessModalVisible] = useState(false);
  const [totalInputWeight, setTotalInputWeight] = useState(0);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  const [endProcessModalVisible, setEndProcessModalVisible] = useState(false);
  const [outputMaterial, setOutputMaterial] = useState("");
  const [outputWeight, setOutputWeight] = useState(0);

  const [outputColor, setOutputColor] = useState("");

  const [wastes, setWastes] = useState([]);
  const [wasteData, setWasteData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();


  const [noInventory, setNoInventory] = useState(false);

  const handleReceiveItem = async (values) => {
    const requestBody = {
      fiberMaterial: values.fiberMaterial,
      customerName: values.customerName,
      fiberColor: values.fiberColor,
      fiberType: values.fiberType,
      roughWeight: values.roughWeight,
      baleWeight: values.baleWeight,
      bobbinWeight: values.bobbinWeight,
      baleNum: values.baleNum,
      bobbinNum: values.bobbinNum,
    };

    try {
      await createInventory(requestBody);
      message.success('Амжилттай хүлээн авлаа');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Хүлээн авахад алдаа гарлаа');
    }
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    setProcesses(initialProcesses);
  }, [initialProcesses]);

  const getWastesForSelectedProcess = (selectedProcess) => {
    if (!selectedProcess || !orderDetails?.factoryProcesses) return [];
    const factoryProcess = orderDetails.factoryProcesses.find(
      (fp) => fp.name === selectedProcess.processName
    );
    return factoryProcess?.waste ? factoryProcess.waste.split(", ") : [];
  };

  useEffect(() => {
    if (processes.length > 0 && processes[selectedProcessIndex]) {
      const selectedProcess = processes[selectedProcessIndex];
      const processWastes = getWastesForSelectedProcess(selectedProcess);
      setWastes(processWastes);

      const initialWasteData = processWastes.reduce((acc, waste) => {
        acc[waste] = 0;
        return acc;
      }, {});
      setWasteData(initialWasteData);
    }
  }, [selectedProcessIndex, processes]);

  useEffect(() => {
    if (processes.length > 0 && processes[selectedProcessIndex]) {
      fetchMaterialsForProcess(processes[selectedProcessIndex].processName);

      const availableInventory = filteredInventory.length > 0;
      setNoInventory(!availableInventory);
    }
  }, [selectedProcessIndex, processes]);

  useEffect(() => {
    const totalWeight = selectedFibers.reduce(
      (sum, fiber) => sum + (parseFloat(fiber.selectedWeight) || 0),
      0
    );
    setTotalInputWeight(totalWeight);
  }, [selectedFibers]);

  const handleProcessClick = (index) => {
    setSelectedProcessIndex(index);
  };

  const handleStartProcess = async () => {
    const selectedProcess = processes[selectedProcessIndex];
    if (!selectedProcess) {
      message.error("Процесс сонгогдоогүй байна.");
      return;
    }

    try {
      const payload = {
        processId: selectedProcess.id,
        orderId: parseInt(orderId),
        processName: selectedProcess.processName,
        customerName: orderDetails.customerName,
        userId: currentUser.id,
        fibers: selectedFibers.map((fiber) => ({
          inventoryId: fiber.id,
          inputMaterialWeight: fiber.selectedWeight,
          inputMaterial: fiber.fiberMaterial
        })),
        totalInputWeight,
      };

      const updatedProcesses = processes.map((process, index) =>
        index === selectedProcessIndex
          ? { ...process, status: "IN_PROGRESS" }
          : process
      );
      setProcesses(updatedProcesses);

      await startProcess(payload);
      await fetchProcessInputs();
      await fetchOrderById(orderId);
      await fetchProcesses();
      await fetchProcessLogs();

      setSelectedFibers([]);
      setTotalInputWeight(0);
      setStartProcessModalVisible(false);
    } catch (error) {
      message.error(error.response?.data?.message || "Процесс эхлүүлэхэд алдаа гарлаа.");
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);

    if (key === "2") {
      const firstIncompleteIndex = processes.findIndex(
        (process) => process.status !== "COMPLETED"
      );

      setSelectedProcessIndex(firstIncompleteIndex !== -1 ? firstIncompleteIndex : 0);
    }
  };

  const handleEndProcess = async () => {
    const selectedProcess = processes[selectedProcessIndex];
    if (!selectedProcess) {
      message.error("Процесс сонгогдоогүй байна.");
      return;
    }

    const processOutput = orderDetails.factoryProcesses.find(
      (factoryProcess) => factoryProcess.name === selectedProcess.processName
    )?.outputs

    await fetchProcesses();
    await fetchProcessLogs();
    await fetchOrderById(orderId);

    setSelectedFibers([]);
    setTotalInputWeight(0);
    setOutputMaterial("");
    setOutputWeight(0);
    setOutputMaterial(processOutput);
    setEndProcessModalVisible(true);
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reports/order/${orderId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Order_Report_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      message.success("PDF татах амжилттай боллоо.");
    } catch (error) {
      console.error("Error downloading the report:", error);
      message.error("PDF татахад алдаа гарлаа.");
    }
  };

  const submitEndProcess = async () => {
    const selectedProcess = processes[selectedProcessIndex];
    if (!selectedProcess) {
      message.error("Процесс сонгогдоогүй байна.");
      return;
    }

    try {
      const wastesArray = Object.entries(wasteData).map(([material, weight]) => ({
        material,
        weight: parseFloat(weight) || 0,
      }));

      const payload = {
        processId: selectedProcess.id,
        orderId: parseInt(orderId),
        userId: currentUser.id,
        fiberType: orderDetails.fiberType,
        outputMaterial,
        outputWeight: parseFloat(outputWeight),
        outputColor,
        wastes: wastesArray,
      };

      const response = await axios.post("http://localhost:8080/api/processes/end", payload);

      message.success(`${selectedProcess.processName} процесс амжилттай дууслаа.`);

      const updatedProcesses = processes.map((process, index) =>
        index === selectedProcessIndex
          ? { ...process, status: "COMPLETED" }
          : process
      );
      setProcesses(updatedProcesses);

      const allProcessesCompleted = updatedProcesses.every(
        (process) => process.status === "COMPLETED"
      );

      if (!allProcessesCompleted) {
        const nextProcessIndex = updatedProcesses.findIndex(
          (process, index) =>
            process.status !== "COMPLETED" && index > selectedProcessIndex
        );
        setSelectedProcessIndex(nextProcessIndex !== -1 ? nextProcessIndex : 0);
      }

      await fetchOrderById(orderId);
      await fetchProcessLogs();
      await fetchProcessOutputs();
      setEndProcessModalVisible(false);
      setOutputMaterial("");
      setOutputWeight(0);
      setWasteData({});
    } catch (error) {
      message.error(error.response?.data?.message || "Процесс дуусгахад алдаа гарлаа.");
    }
  };

  const fetchMaterialsForProcess = async (processName) => {
    try {
      const response = await axios.get("http://localhost:8080/api/processes/required-materials", {
        params: {
          processName,
          customerName: orderDetails.customerName,
        },
      });
      setFilteredInventory(response.data);
    } catch (error) {
      message.error("Шаардлагатай материалыг татаж чадсангүй.");
    }
  };

  if (loading) { return (<div style={{ textAlign: "center", marginTop: "50px" }}><Spin size="large" /></div>); }

  if (error) { return (<Alert message="Алдаа" description={error} type="error" showIcon style={{ margin: "20px" }} />); }

  if (!orderDetails) { return (<Alert message="Захиалгын дэлгэрэнгүй мэдээлэл олдсонгүй" type="warning" showIcon style={{ margin: "20px" }} />); }


  const canStartProcess = (selectedIndex) => {
    if (selectedIndex === 0) return true; // Эхний процесс байнга эхлэх боломжтой
    const previousProcess = processes[selectedIndex - 1];
    return previousProcess?.status === "COMPLETED";
  };


  return (
    <div style={{ padding: "10px", maxWidth: "1800px", margin: "0 auto" }}>
      
      <Header orderId={orderId} navigate={navigate} />

      <Tabs
        activeKey={activeTab}
        onChange={(key) => handleTabChange(key)}>
        <TabPane tab="Захиалгын дэлгэрэнгүй" key="1">
          <Row gutter={[16, 16]}>
            {/* Захиалгын дэлгэрэнгүй */}
            <Col xs={24} md={16}>
            
              <OrderInfo orderDetails={orderDetails} getStatusTag={getStatusTag} />

              <Card
                title="Гаралтын процесс лог"
                style={{ marginBottom: "20px" }}
                bodyStyle={{ padding: "15px" }}
              >
                <Table
                  columns={processIOColumns}
                  dataSource={processOutputs}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                  bordered
                  style={{ borderRadius: '8px' }}
                />
              </Card>

              <Card
                title="Оролтын процесс лог"
                style={{ marginBottom: "20px" }}
                bodyStyle={{ padding: "15px" }}
              >
                <Table
                  columns={processIOColumns}
                  dataSource={processInputs}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                  bordered
                  style={{ borderRadius: '8px' }}
                />
              </Card>

            </Col>


            {/* Сонголтууд */}
            <Col xs={24} md={8}>
              <Card
                title="Сонголтууд"
                style={{ marginBottom: "20px" }}
                bodyStyle={{ padding: "15px" }}
              >
                <Button
                  icon={<FilePdfOutlined />}
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    background: "#1890ff",
                    color: "#fff",
                  }}
                  onClick={handleDownloadReport}
                >
                  PDF татах
                </Button>
              </Card>

              <Card
                title="Процессууд"
                style={{ marginBottom: "20px" }}
                bodyStyle={{ padding: "15px" }}
              >
                <Table
                  columns={processColumns}
                  dataSource={processes}
                  pagination={false}
                  bordered
                  size="small"
                  rowKey="id"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Процессууд" key="2">
          <StepsComponent processes={processes} handleProcessClick={handleProcessClick} />

          {/* Inventory Table */}
          {inventoryLoading ? (
            <div className="text-center py-8">
              <Spin size="large" />
            </div>
          ) : filteredInventory.length > 0 ? (
            <div className="mb-5 p-5 bg-white rounded-lg shadow-lg">
              <div className="text-xl font-semibold mb-4 text-blue-600">{processes[selectedProcessIndex]?.processName} боломжтой түүхий эдийн мэдээлэл</div>
              <Table
                columns={inventoryColumns(selectedFibers, setSelectedFibers)}
                dataSource={filteredInventory}
                pagination={{ pageSize: 5 }}
                rowKey="id"
                className="rounded-lg"
              />
            </div>
          ) : (
            <div className="mb-5 p-5 bg-white rounded-lg shadow-lg text-center">
              <div className="text-xl font-semibold mb-4 text-red-600">
                Түүхий эд байхгүй байна
              </div>
              {processes[selectedProcessIndex - 1]?.status !== "COMPLETED" ? (
                <div className="text-lg text-gray-700 mb-4">
                  Урьдчилсан процесс дуусаагүй байна. Процессийн хяналт хэсгээс шалгана уу.
                </div>
              ) : (
                <div className="text-lg text-gray-700 mb-4">
                  Түүхий эдийг хүлээн авах шаардлагатай байна. Хүлээн авах товч дарж, түүхий эд нэмнэ үү.
                </div>
              )}
              <Button
                type="primary"
                icon={<PlusOutlined />}

                onClick={handleOpenModal}
              >
                Түүхий эд хүлээн авах
              </Button>
            </div>
          )}



          {/* Process Logs Table */}
          <div className="p-5 bg-white rounded-lg shadow-lg">
            <div className="text-xl font-semibold mb-4 text-blue-600">Процесийн лог</div>
            <Table
              columns={processLogColumns}
              dataSource={processLogs}
              pagination={{ pageSize: 5 }}
              rowKey="id"
              className="rounded-lg"
              rowClassName={(record, index) =>
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }
            />
          </div>
        </TabPane>

      </Tabs>

      {activeTab === "2" && processes[selectedProcessIndex]?.status !== "COMPLETED" && canStartProcess(selectedProcessIndex) && (
        <button
          onClick={() => {
            if (processes[selectedProcessIndex]?.status === "IN_PROGRESS") {
              handleEndProcess();
            } else {
              setStartProcessModalVisible(true);
            }
          }}
          className={`fixed bottom-6 right-6 flex items-center justify-center gap-3 px-6 py-3 ${processes[selectedProcessIndex]?.status === "IN_PROGRESS"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-blue-700"
            } text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out`}
        >
          {processes[selectedProcessIndex]?.status === "IN_PROGRESS" ? (
            <>
              <CheckCircleOutlined className="text-2xl" />
              <span>Процесс дуусгах</span>
            </>
          ) : (
            <>
              <PlayCircleOutlined className="text-2xl" />
              <span>Процесс эхлүүлэх</span>
            </>
          )}
        </button>
      )}

      <StartProcessModal
        visible={startProcessModalVisible}
        onCancel={() => setStartProcessModalVisible(false)}
        onOk={handleStartProcess}
        inventoryColumns={inventoryColumns(selectedFibers, setSelectedFibers)}
        selectedFibers={selectedFibers}
        totalInputWeight={totalInputWeight}
      />

      <EndProcessModal
        visible={endProcessModalVisible}
        onCancel={() => setEndProcessModalVisible(false)}
        onOk={submitEndProcess}
        outputMaterial={outputMaterial}
        setOutputMaterial={setOutputMaterial}
        outputWeight={outputWeight}
        setOutputWeight={setOutputWeight}
        outputColor={outputColor}
        setOutputColor={setOutputColor}
        fiberColors={fiberColors}
        orderDetails={orderDetails}
        wasteData={wasteData}
        setWasteData={setWasteData}
        wastes={wastes}
      />

      <ReceiveItemModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleReceiveItem={handleReceiveItem}
        form={form}
        defaultCustomerName={orderDetails?.customerName}
        defaultColor={orderDetails?.fiberColor}
        defaultFiberType={orderDetails?.fiberType}
      />
    </div>
  );
};

export default OrderDetailsLayout;