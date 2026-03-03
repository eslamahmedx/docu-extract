import { api } from "./client";

export const uploadDocument = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/upload/", formData);
    return response.data;
};

export const summarizeDocument = async (fileId: string) => {
    const response = await api.post("/summarize/", { fileId });
    return response.data;
};

export const extractSheetData = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file, file.name));

    const response = await api.post("/sheet-extraction/upload", formData, {
        responseType: "blob",
    });

    return {
        data: response.data,
        contentType: response.headers["content-type"],
        contentDisposition: response.headers["content-disposition"],
    };
};
