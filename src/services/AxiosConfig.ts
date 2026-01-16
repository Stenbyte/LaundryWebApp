
import axios from "axios";

import {
} from "@tanstack/react-query";
import { Config } from "../../config";

export const api = axios.create({
  baseURL: `${Config.API_BASE_URL}/api`,
  withCredentials: true, // Crucial for your HTTP-only cookies!
});

export const refreshTokenApi = axios.create({
  baseURL: `${Config.API_BASE_URL}/api`,
  withCredentials: true
})

