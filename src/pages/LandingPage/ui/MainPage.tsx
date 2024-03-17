import {FactWidget} from "../../../widgets/FactWidget";
import React from "react";
import style from './style.module.scss'
import {AgeWidget} from "../../../widgets/AgeWidget";
import {Div, PanelHeader} from "@vkontakte/vkui";

export const MainPage = () => {
  return (
    <>
      <PanelHeader> VK Internship Test </PanelHeader>
      <Div className={style.mainPage}>
        <FactWidget />
        <AgeWidget />
      </Div>
    </>

  );
}
