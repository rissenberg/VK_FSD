import {FactForm} from "../../../features/FactForm";
import style from './style.module.scss'

export const FactWidget = () => {

  return (
    <div className={style.factContainer}>
      CATS FACTS
      <FactForm />
    </div>
  );
}