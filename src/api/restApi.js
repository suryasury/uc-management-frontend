const USER_END_POINT = "http://localhost:3002/api/user";
const COMPANY_END_POINT = "http://localhost:3002/api/company";

export const getCompanyList = async () => {
  const res = await fetch(`${COMPANY_END_POINT}/list-companies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const addCompany = async (body) => {
  const res = await fetch(`${COMPANY_END_POINT}/add-company`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getCompanyDetails = async (id) => {
  const res = await fetch(`${COMPANY_END_POINT}/get-company/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const addUser = async (body) => {
  const res = await fetch(`${USER_END_POINT}/add-user`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const updateUser = async (body) => {
  const res = await fetch(`${USER_END_POINT}/update`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const migrateUser = async (body) => {
  const res = await fetch(`${COMPANY_END_POINT}/migrate-user`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const removeUser = async (body) => {
  const res = await fetch(`${COMPANY_END_POINT}/remove-user`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const updateCompanyDetails = async (body) => {
  const res = await fetch(`${COMPANY_END_POINT}/update`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const deleteCompany = async (companyId) => {
  const res = await fetch(`${COMPANY_END_POINT}/delete/${companyId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getUsersList = async () => {
  const res = await fetch(`${USER_END_POINT}/list-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const deleteUser = async (id) => {
  const res = await fetch(`${USER_END_POINT}/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const changeUserActiveStatus = async (body) => {
  const res = await fetch(`${USER_END_POINT}/change-status`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
