import React, { useContext } from "react";
import { useOrders } from "../hooks/useOrders";
import { formatDate } from '../Utils/DateFormat';
import { UserContext } from "../Context/userContext";
import { Link } from "react-router-dom";
import { useHomeData } from "../hooks/useHome";

const Home = () => {

  const { currentUser } = useContext(UserContext);
  const { orders } = useOrders();
  const { latestLogs, myJobs } = useHomeData(currentUser?.id);

  if (!orders) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">
          Тавтай морил, <span className="text-blue-500">{currentUser?.username}</span>
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Хайх"
            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>


      {/* Overview Section */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {/* Production Volume */}
        <div className="bg-white shadow-sm p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Үйлдвэрлэл</h3>
          <div className="flex items-center justify-between mt-4">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle
                  className="text-gray-300"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="transparent"
                  r="15.91549430918954"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-green-500"
                  strokeWidth="3.8"
                  strokeDasharray="100,100"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  fill="transparent"
                  r="15.91549430918954"
                  cx="18"
                  cy="18"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
                100%
              </div>
            </div>
            <div>
              <p className="font-bold text-xl">9,040 Kg</p>
              <p className="text-green-500 text-sm mt-1">+3.6%</p>
            </div>
          </div>
        </div>

        {/* Downtime */}
        <div className="bg-white shadow-sm p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Зогсолт</h3>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-3xl font-bold">4цаг 18мин</p>
              <p className="text-green-500 text-sm mt-1">-5.7%</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div>
              <p className="text-sm">Цэвэрлэгээ</p>
              <div className="bg-gray-200 w-full h-2 rounded">
                <div className="bg-orange-400 h-full w-2/5 rounded"></div>
              </div>
            </div>
            <div>
              <p className="text-sm">Засвар үйлчилгээ</p>
              <div className="bg-gray-200 w-full h-2 rounded">
                <div className="bg-orange-500 h-full w-1/3 rounded"></div>
              </div>
            </div>
            <div>
              <p className="text-sm">Төлөвлөөгүй</p>
              <div className="bg-gray-200 w-full h-2 rounded">
                <div className="bg-orange-600 h-full w-1/4 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Machines Active */}
        <div className="bg-white shadow-sm p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Миний хийсэн ажил</h3>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              LIVE
            </span>
          </div>
          <div className="mt-4">
            {myJobs.length > 0 ? (
              <ul className="space-y-3">
                {myJobs.slice(0, 5).map((process) => (
                  <li key={process.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{process.processName}</p>
                      <p className="text-sm text-gray-600">{formatDate(process.dateTime)}</p>
                    </div>
                    <Link to={`/order/${process.orderId}`} className="text-blue-500 hover:underline">
                      Дэлгэрэнгүй
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Танд хийсэн ажил байхгүй байна.</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        {/* Material Inventory Overview */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Агуулах дахь материал</h3>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="table-auto w-full text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4">Түүхий эд</th>
                  <th className="py-3 px-4">Цэвэр жин</th>
                  <th className="py-3 px-4">Харилцагч</th>
                  <th className="py-3 px-4">Өнгө</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {Array.from({ length: 5 }, (_, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">Түүхий эд</td>
                    <td className="py-3 px-4">50 кг</td>
                    <td className="py-3 px-4">turuu</td>
                    <td className="py-3 px-4 text-green-500 font-semibold">Ногоон</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Сүүлийн захиалгууд</h3>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="table-auto w-full text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4">Захиалгын дугаар</th>
                  <th className="py-3 px-4">Харилцагчийн нэр</th>
                  <th className="py-3 px-4">Захиалгын огноо</th>
                  <th className="py-3 px-4">Төлөв</th>
                  <th className="py-3 px-4">Дэлгэрэнгүй</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.customerName}</td>
                    <td className="py-3 px-4">{formatDate(order.orderDate)}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                        }`}
                    >
                      {order.status}
                    </td>
                    <td className="py-3 px-4">
                      <Link to={`/order/${order.id}`} className="text-blue-500 hover:underline">
                        Дэлгэрэнгүй
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Finished Products Inventory Overview */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Сүүлийн процессын бүртгэлүүд</h3>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="table-auto w-full text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4">Бүртгэлийн дугаар</th>
                  <th className="py-3 px-4">Захиалгын дугаар</th>
                  <th className="py-3 px-4">Процессын нэр</th>
                  <th className="py-3 px-4">Ажилтны нэр</th>
                  <th className="py-3 px-4">Оролтын материал</th>
                  <th className="py-3 px-4">Гаралтын материал</th>
                  <th className="py-3 px-4">Эхлэх цаг</th>
                  <th className="py-3 px-4">Дуусах цаг</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {latestLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{log.id}</td>
                    <td className="py-3 px-4">{log.orderId}</td>
                    <td className="py-3 px-4">{log.processName}</td>
                    <td className="py-3 px-4">{log.username}</td>
                    <td className="py-3 px-4">{log.inputMaterial}</td>
                    <td className="py-3 px-4">{log.outputMaterial}</td>
                    <td className="py-3 px-4">{formatDate(log.processStartTime)}</td>
                    <td className="py-3 px-4">{formatDate(log.processEndTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
