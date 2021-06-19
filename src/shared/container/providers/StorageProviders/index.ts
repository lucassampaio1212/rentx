import { container } from "tsyringe";

import LocalStorageProvider from "./implementations/LocalStorageProvider";
import S3storageProvider from "./implementations/S3StorageProvider";
import IStorageProvider from "./IStorageProviders";

const providers = {
    local: LocalStorageProvider,
    s3: S3storageProvider,
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    providers[process.env.STORAGE_PROVIDER]
);
