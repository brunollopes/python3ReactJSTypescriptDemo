import axios from "axios";
import { CreateNoteInput } from "../components/notes/create.note";
import { UpdateNoteInput } from "../components/notes/update.note";
import { INote, INoteResponse, INotesResponse, IPagesCountResponse } from "./types";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const noteApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

noteApi.defaults.headers.common["Content-Type"] = "application/json";

export const createNoteFn = async (note: CreateNoteInput) => {
  const response = await noteApi.post<INoteResponse>("notes/", note);
  return response.data;
};

export const updateNoteFn = async (noteId: string, note: UpdateNoteInput) => {
  const response = await noteApi.patch<INoteResponse>(`notes/${noteId}`, note);
  return response.data;
};

export const deleteNoteFn = async (noteId: string) => {
  return noteApi.delete<null>(`notes/${noteId}`);
};

export const getSingleNoteFn = async (noteId: string) => {
  const response = await noteApi.get<INoteResponse>(`notes/${noteId}`);
  return response.data;
};

export const getNotesFn = async (page = 1, limit = 10) => {
   return await noteApi.get<INotesResponse>(
    `notes?page=${page}&limit=${limit}`
  );
};

export const countPagesFn = async (pageLimit: number) => {
  const response = await noteApi.get<IPagesCountResponse>("notes/count");
  response.data.results = Math.round(response.data.results/pageLimit)+1;
  return response.data;
};