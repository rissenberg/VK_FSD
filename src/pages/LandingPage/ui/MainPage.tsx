import {FactWidget} from "../../../widgets/FactWidget";
import style from './style.module.scss'
import React from "react";
import {AgeWidget} from "../../../widgets/AgeWidget";

export const MainPage = () => {
  return (
    <div className={style.mainPage}>
      <FactWidget />
      <AgeWidget />
    </div>
  );
}