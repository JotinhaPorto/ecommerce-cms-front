import { req } from "@/api/axios";
import { TLoginSchema, TregisterSchema } from "@/app/types/Auth";
import { Billboard, BillboardWithImage, Categories, Category, Color, ImageUpload, Product, Size } from "@/app/types/Store";
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


export const getAllBillboards = async (
  billboardId: string,
  userToken: string
): Promise<Billboard[]> => {
  const response = await req.get(`/store/${billboardId}/billboard/all`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};

export const getBillboardById = async (
  storeId: string,
  billboardId: string,
  userToken: string
): Promise<BillboardWithImage> => {
  const response = await req.get(`/store/${storeId}/billboard/${billboardId}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};

export const createImageS3 = async (data: any): Promise<ImageUpload> => {
  const token = getCookie("token");
  const response = await req.post(`/image/store`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const createBillboard = async (data: any, storeId: string) => {
  const token = getCookie("token");
  const response = await req.post(`/store/${storeId}/billboard/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const updateBillboard = async (data: any, storeId: string, billboardId: string) => {
  const token = getCookie("token");
  const response = await req.patch(`/store/${storeId}/billboard/${billboardId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const deleteBillboard = async (storeId: string, billboardId: string) => {
  const token = getCookie("token");
  const response = await req.delete(`/store/${storeId}/billboard/${billboardId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const getCategoryById = async (storeId: string, categoryId: string, tokenId: string): Promise<Category> => {
  const response = await req.get(`/store/${storeId}/category/${categoryId}`, {
    headers: { Authorization: `Bearer ${tokenId}` },
  });
  return response.data;
}
export const getAllCategories = async (storeId: string, tokenId: string): Promise<Categories[]> => {
  const response = await req.get(`/store/${storeId}/category/all`, {
    headers: { Authorization: `Bearer ${tokenId}` },
  });
  return response.data;
}

export const createCategory = async (data: any, storeId: string) => {
  const token = getCookie("token");
  const response = await req.post(`/store/${storeId}/category/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data
}
export const updateCategory = async (data: any, storeId: string, categoryId: string) => {
  const token = getCookie("token");
  const response = await req.patch(`/${storeId}/category/${categoryId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data
}
export const deleteCategory = async (storeId: string, categoryId: string) => {
  const token = getCookie("token");
  const response = await req.delete(`/store/${storeId}/category/${categoryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getAllProducts = async (storeId: string, tokenId: string): Promise<any[]> => {
  const response = await req.get(`/store/${storeId}/product/all`, {
    headers: { Authorization: `Bearer ${tokenId}` },
  });
  return response.data;
}
export const getProductById = async (storeId: string, productId: string, tokenId: string): Promise<Product | null> => {
  const response = await req.get(`/store/${storeId}/product/${productId}`, {
    headers: { Authorization: `Bearer ${tokenId}` },
  });
  return response.data;
}
export const createProduct = async (data: any, storeId: string) => {
  const token = getCookie("token");
  const response = await req.post(`/store/${storeId}/product/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data
}
export const createImagesS3 = async (data: any): Promise<ImageUpload[] | null> => {
  const token = getCookie("token");
  const response = await req.post(`/images/store`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
export const updateProduct = async (data: any, storeId: string, productId: string) => {
  const token = getCookie("token");
  const response = await req.patch(`/store/${storeId}/product/${productId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data
}
export const deleteProduct = async (storeId: string, productId: string) => {
  const token = getCookie("token");
  const response = await req.delete(`/store/${storeId}/product/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}