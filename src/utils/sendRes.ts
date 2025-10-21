import { Response } from "express";

interface IMetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface IResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  meta?: IMetaData;
}

const sendRes = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: true,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};

export default sendRes;
