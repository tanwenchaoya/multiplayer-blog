import NetWork from "./network";
export const registerUser = (data: {}) => NetWork.post("/user/register", data);
export const sendEmailCode = (data: {}) => NetWork.get("/user/emailCode", data);
export const sendPhoneCode = (data: {}) => NetWork.get("/phoneCode", data);
export const loginUser = (data: {}) => NetWork.post("/user/login", data);
export const getUserArticle = (data: {}) =>
  NetWork.post("/page/getUserArticle", data);

export const getImageCode = (data: any) =>
  NetWork.get(`/user/ImageCode?t=${data}`);

export const getUsers = (data: {}) => NetWork.get("/api/v1/users", data);
export const addNewUser = (data: {}) => NetWork.post("/api/v1/users", data);
export const deleteUser = (id: string) => NetWork.delete(`/api/v1/users/${id}`);
export const updateUser = (id: string, data: {}) =>
  NetWork.put(`/api/v1/users/${id}`, data);

export const getRoles = (data: {}) => NetWork.get("/api/v1/roles", data);
export const addNewRole = (data: {}) => NetWork.post("/api/v1/roles", data);
export const deleteRole = (id: string) => NetWork.delete(`/api/v1/roles/${id}`);
export const updateRole = (id: string, data: {}) =>
  NetWork.put(`/api/v1/roles/${id}`, data);

export const addUserRole = (data: {}) =>
  NetWork.post("/api/v1/userRoles", data);

export const deleteUserRole = (userId: string, data: {}) =>
  NetWork.delete(`/api/v1/userRoles/${userId}`, data);
// 权限管理相关
export const getRights = (data: {}) => NetWork.get("/api/v1/rights", data);
// export const getRightsCategory = (type:string,data:{})=>Network.get(`/api/v1/rights/${type}`, data);
export const createRights = (data: {}) => NetWork.post("/api/v1/rights", data);
export const destroyRights = (id: string) =>
  NetWork.delete(`/api/v1/rights/${id}`);
export const updateRights = (id: string, data: {}) =>
  NetWork.put(`/api/v1/rights/${id}`, data);

// 分配角色相关
export const createRoleRights = (data: {}) =>
  NetWork.post("/api/v1/roleRights", data);
export const destroyRoleRights = (roleId: string, data: {}) =>
  NetWork.delete(`/api/v1/roleRights/${roleId}`, data);
