// // lib/deviceService.ts
// import { api, authHeader } from "./api";

// // GET todos los dispositivos del usuario
// export const getMyDevices = async () => {
//   const res = await api.get("/device/get-my-devices", await authHeader());
//   return res.data;
// };

// // GET estado de un dispositivo por ID
// export const getDevice = async (id: string) => {
//   const res = await api.get(`/device/${id}`, await authHeader());
//   return res.data;
// };

// // POST crear nuevo dispositivo
// export const postDevice = async (attributes: {
//   alias: string;
//   kind: string;
//   port: string;
// }) => {
//   const res = await api.post(
//     "/device",
//     {
//       alias: attributes.alias,
//       kind: attributes.kind,
//       port: attributes.port,
//     },
//     await authHeader()
//   );
//   return res.data;
// };

// // PUT actualizar dispositivo (entero)
// export const putDevice = async (
//   id: string,
//   attributes: {
//     alias: string;
//     kind: string;
//     port: string;
//   }
// ) => {
//   const res = await api.put(
//     `/device/${id}`,
//     {
//       alias: attributes.alias,
//       kind: attributes.kind,
//       port: attributes.port,
//     },
//     await authHeader()
//   );
//   return res.data;
// };

// // PATCH parcial (estado y plan)
// export const patchDevice = async (
//   id: string,
//   attributes: {
//     alias?: string;
//     kind?: string;
//     port?: string;
//     status?: any;
//     plan?: any;
//   }
// ) => {
//   const res = await api.patch(`/device/${id}`, attributes, await authHeader());
//   return res.data;
// };

// // DELETE dispositivo
// export const deleteDevice = async (id: string) => {
//   const res = await api.delete(`/device/${id}`, await authHeader());
//   return res.data;
// };

import { api, authHeader } from "./api";

export const getMyDevices = async () => {
  const res = await api.get("/device/get-my-devices", await authHeader());
  return res.data;
};

export const getDevice = async (id: string) => {
  const res = await api.get(`/device/${id}`, await authHeader());
  return res.data;
};

export const postDevice = async (attributes: {
  alias: string;
  kind: string;
  port: string;
}) => {
  const res = await api.post("/device", attributes, await authHeader());
  return res.data;
};

export const patchDevice = async (
  id: string,
  attributes: {
    alias?: string;
    kind?: string;
    port?: string;
    status?: any;
    plan?: any;
  }
) => {
  const res = await api.patch(`/device/${id}`, attributes, await authHeader());
  return res.data;
};

export const deleteDevice = async (id: string) => {
  const res = await api.delete(`/device/${id}`, await authHeader());
  return res.data;
};

