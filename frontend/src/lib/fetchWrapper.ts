import { ApiError } from "../errors/ApiError";

const handleError = async (res: Response) => {
  const json = await res.json();
  if (json && json.error) throw new ApiError(json.error, res.status)
  throw new ApiError((await res.json()).error, res.status)
}

export const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, options);
  if (!res.ok) {
    return handleError(res);
  }
  return res.json() as Promise<T>;
}