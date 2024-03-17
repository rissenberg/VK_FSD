import {AgeForm} from "../../../features/AgeForm";
import style from './style.module.scss'

export const AgeWidget = () => {

  return (
    <div className={style.ageContainer}>
      GET AGE FROM NAME
      <AgeForm />
    </div>
  );
}