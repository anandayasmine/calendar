import * as Manager from "@/app/core/ConnectionManager"

const getUsers:any = async (query = {}, body = {}) => {
  const data = await Manager.stream({
    url: "/users",
    method: "GET",
    query: query,
  });

  return data
};

export { getUsers }
