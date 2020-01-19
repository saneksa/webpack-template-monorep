import { forEach, includes } from "lodash";
import { Expander } from "./Expander";

const appModule = () => import("../../app/src/index");
const app2Module = () => import("../../app2/src/index");

//@ts-ignore
const Modules = new Map([
  ["com.company.app", appModule],
  ["com.company.app2", app2Module]
]);

const getSubsystems = async () => {
  try {
    const subsystemsList: { uuid: string }[] = await (
      await fetch("http://www.mocky.io/v2/5e222dd42f0000fee577dab9")
    ).json();

    const promises: any[] = [];
    forEach(subsystemsList, subsystem => {
      const module = Modules.get(subsystem.uuid)?.();

      if (!module) {
        console.error(`Модуль ${subsystem.uuid} не найден!`);
        return;
      }

      promises.push(module);
    });

    Promise.all(promises).then(() => {
      Expander.getInstance().build();
    });
  } catch (error) {
    console.warn("Ошибка загрузки списка модулей ", error);
  }
};

getSubsystems();
