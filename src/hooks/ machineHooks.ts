import { useQuery } from "@tanstack/react-query"
import { Machine } from "../constants"
import api from '../services/AxiosConfig';
import { Config } from "../../config";
import { AxiosError } from "axios";


export const useFetchMachines = () => {
    return useQuery({
        queryKey: ["machines"],
        queryFn: async (): Promise<Machine[]> => {
            try {
                const getMachines = await api.get(`${Config.API_BASE_URL}/api/booking/getAllMachines`)
                return getMachines.data as Machine[];
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    throw new Error(`Failed to fetch machines: ${error.message} (status: ${error.response?.status})`);
                }

                throw new Error("Unexpected error while fetching machines");
            }

        }

    })
}