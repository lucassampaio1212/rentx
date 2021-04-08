import crypto from "crypto";
import multer from "multer";
import path from "path";

export default {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    upload(folder: string) {
        const tmpFolder = path.resolve(__dirname, "..", "..", folder);
        return {
            storage: multer.diskStorage({
                destination: tmpFolder,
                filename(request, file, callback) {
                    const filehash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${filehash}-${file.originalname}`;

                    return callback(null, fileName);
                },
            }),
        };
    },
};
