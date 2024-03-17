import style from "./style.module.scss"
import React, {useState} from "react";

export const AgeForm = () => {
  const [input, setInput] = useState<string>('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  return (
    <form className={style.form}>
      <div className={style.inputContainer}>
        <input type="text"
               className={style.formInput}
               onInput={handleInput}
        />
        <button className={style.submitButton}> Get </button>
      </div>
      <div className={style.errorField}>
        Error occurred!
      </div>
      <div className={style.resultField}>
        RESULT
      </div>
    </form>
  )
}