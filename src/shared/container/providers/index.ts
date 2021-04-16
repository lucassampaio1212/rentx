import { container } from "tsyringe";

import IDateProvider from "./DateProvider/IDateProvider";
import DayjsDateProvider from "./DateProvider/implementations/DayjsProvider";
import IMailProvider from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import LocalStorageProvider from "./StorageProviders/implementations/LocalStorageProvider";
import S3storageProvider from "./StorageProviders/implementations/S3StorageProvider";
import IStorageProvider from "./StorageProviders/IStorageProviders";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
);

const providers = {
    disk: LocalStorageProvider,
    s3: S3storageProvider,
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    providers[process.env.STORAGE_PROVIDER]
);
