// eslint-disable-next-line import-helpers/order-imports
import { container } from "tsyringe";
import IDateProvider from "./IDateProvider";
import DayjsDateProvider from "./implementations/DayjsProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
