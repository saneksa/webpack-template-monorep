import { forEach, includes } from "lodash";
import { Expander } from "./Expander";

const getSubsystems = async () => {
  try {
    const subsystemsList: { uuid: string }[] = await (
      await fetch("http://www.mocky.io/v2/5e222dd42f0000fee577dab9")
    ).json();

    const promises: any[] = [];
    forEach(subsystemsList, subsystem => {
      const subsystemName = includes(subsystem?.uuid, ".") && subsystem?.uuid?.split(".").slice(-1);

      if (!subsystemName) {
        return;
      }

      const module = import(`../../${subsystemName}/src/index`)
        .then(status => {
          if (status.__esModule) {
            promises.push(module);
          }
        })
        .catch(error => {
          console.error(`ошибка при подключении `, error);
        });
    });

    Promise.all(promises).then(() => {
      Expander.getInstance().build();
    });
  } catch (error) {
    console.warn("Ошибка загрузки списка модулей ", error);
  }
};

getSubsystems();
