import axios from "axios";
import { message } from "antd";

const API_BASE_URL = "http://localhost:8080/api";

const useProcessAction = () => {
    const startProcess = async (payload) => {
        try {
            await axios.post(`${API_BASE_URL}/processes/start`, payload);
            message.success(`${payload.processName} процесс амжилттай эхэллээ.`);
        } catch (err) {
            message.error(err.response?.data?.message || "Процесс эхлүүлэхэд алдаа гарлаа.");
        }
    };

    const endProcess = async (payload) => {
        try {
            await axios.post(`${API_BASE_URL}/processes/end`, payload);
            message.success(`${payload.processName} процесс амжилттай дууслаа.`);
        } catch (err) {
            message.error(err.response?.data?.message || "Процесс дуусгахад алдаа гарлаа.");
        }
    };

    const fetchRequiredMaterials = async (processName, customerName) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/processes/required-materials`, {
                params: { processName, customerName },
            });
            return response.data;
        } catch (err) {
            message.error("Шаардлагатай материалыг татаж чадсангүй.");
            return [];
        }
    };

    return { startProcess, endProcess, fetchRequiredMaterials };
}


export default useProcessAction;