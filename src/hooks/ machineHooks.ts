import { useQuery } from "@tanstack/react-query"
import { Machine } from "../constants"


export const useFetchMachines = (userId: string) => {
    return useQuery({
        queryKey: ["machines"],
        queryFn: async (): Promise<Machine[]>=> {
            try{

            }catch (err){
                throw new Error()
            }
        }
    })
}