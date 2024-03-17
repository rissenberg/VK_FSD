import {AgeForm} from "../../../features/AgeForm";
import {Group, Header} from "@vkontakte/vkui";

export const AgeWidget = () => {

  return (
    <Group header={<Header mode="primary">GET AGE FROM NAME</Header>}>
      <AgeForm />
    </Group>
  );
}
