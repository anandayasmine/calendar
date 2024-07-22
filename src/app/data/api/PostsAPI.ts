import * as Manager from "@/app/core/ConnectionManager";
import { Helpers } from "@/app/utils";

const getPosts:any = async (query:{
  id?: string | number
} = {}) => {
  const data = await Manager.stream({
    url: "/posts/" + (query?.id || ""),
    method: "GET",
    query: Helpers.filterObjectByKey(query, "id"),
  });

  return data;
};

export { getPosts };
