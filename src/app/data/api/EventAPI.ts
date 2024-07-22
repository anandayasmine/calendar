import * as Manager from "@/app/core/ConnectionManager";


export type TEventDataItem = {
  id: number,
  created_at: string,
  name?: string,
  description?: string,
  time?: string,
  is_all_day?: string,
  user_id: number
}

const getEvents:any = async (query:any) => {
  const data = await Manager.streamRouting({
    url: "/api/get-event",
    method: "GET",
    query: query,
  });

  return data;
};
const postEvent:any = async (query:any, body:any) => {
  const data = await Manager.streamRouting({
    url: "/api/post-event",
    method: "POST",
    query: query,
    body: body,
  });

  return data;
};

export { 
  getEvents, 
  postEvent,
};
