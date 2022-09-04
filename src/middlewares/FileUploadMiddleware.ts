import multer from "multer";

const storage = multer.memoryStorage();

export const fileUploadMiddleware = multer({ storage: storage });