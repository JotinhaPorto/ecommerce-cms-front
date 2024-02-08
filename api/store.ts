import { req } from "@/api/axios";
import { TLoginSchema, TregisterSchema } from "@/app/types/Auth";
import { Color, Size } from "@/app/types/Store";
import { getCookie } from "cookies-next";

export const register = async (data: TregisterSchema) => {
  const response = await req.post("/auth/register", data);
  return response.data;
};

export const signIn = async (data: TLoginSchema) => {
  try {
    const response = await req.post("/auth/login", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (userToken: string) => {
  const response = await req.get("/auth/profile", {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data.loggedUser;
};

export const getStore = async (userToken: string) => {
  const response = await req.get("/store", {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};
export const getStoreByStoreId = async (storeId: string, userToken: string) => {
  const response = await req.get(`/store/${storeId}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};

export const getAllStores = async (userToken: string) => {
  const response = await req.get("/store/all", {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};

export const createStore = async (data: any) => {
  const token = getCookie("token");
  const response = await req.post("/store/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const editStore = async (
  data: any,
  idStore: string
) => {
  const token = getCookie("token");
  const response = await req.patch(`/store/${idStore}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const deleteStore = async (idStore: string) => {
  const token = getCookie("token");
  const response = await req.delete(`/store/${idStore}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createColor = async (data: any, storeId: string) => {
  const token = getCookie("token");
  const response = await req.post(`/store/${storeId}/color/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllColors = async (
  storeId: string,
  userToken: string
): Promise<Color[]> => {
  const response = await req.get(`/store/${storeId}/color/all`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};

export const getColorById = async (
  storeId: string,
  colorId: string,
  userToken: string
): Promise<Color | null> => {
  const response = await req.get(`/store/${storeId}/color/${colorId}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};

export const updateColor = async (
  data: any,
  storeId: string,
  colorId: string
): Promise<Color> => {
  const token = getCookie("token");
  const response = await req.patch(`/store/${storeId}/color/${colorId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteColor = async (storeId: string, colorId: string) => {
  const token = getCookie("token");
  const response = await req.delete(`/store/${storeId}/color/${colorId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const getAllSizes = async (
  storeId: string,
  userToken: string
): Promise<Size[]> => {
  const response = await req.get(`/store/${storeId}/size/all`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};
export const getSizeById = async (
  storeId: string,
  sizeId: string,
  userToken: string
): Promise<Size> => {
  const response = await req.get(`/store/${storeId}/size/${sizeId}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};

export const updateSize = async (
  data: any,
  storeId: string,
  sizeId: string
): Promise<Color> => {
  const token = getCookie("token");
  const response = await req.patch(`/store/${storeId}/size/${sizeId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteSize = async (storeId: string, sizeId: string) => {
  const token = getCookie("token");
  const response = await req.delete(`/store/${storeId}/size/${sizeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createSize = async (data: any, storeId: string) => {
  const token = getCookie("token");
  const response = await req.post(`/store/${storeId}/size/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
