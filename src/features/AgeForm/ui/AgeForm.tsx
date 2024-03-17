import style from "./style.module.scss"

export const AgeForm = () => {

  return (
    <form className={style.form}>
      <div className={style.inputContainer}>
        <input type="text" className={style.formInput}/>
        <button className={style.submitButton}> GET</button>
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