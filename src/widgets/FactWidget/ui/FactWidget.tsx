import {FactForm} from "../../../features/FactForm";
import {Group, Header} from "@vkontakte/vkui";

export const FactWidget = () => {

  return (
    <Group header={<Header mode="primary">CATS FACTS</Header>}>
      <FactForm />
    </Group>
  );
}
