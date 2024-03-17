import style from "./style.module.scss"
import React, {useEffect, useRef, useState} from "react";
import {setTextareaCursor} from "../lib/setCursor";

export const FactForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [textareaContent, setTextareaContent] = useState<string>('Hello! hello! HELLO! olleH!');

  useEffect(() => {
    setTextareaCursor(textareaRef.current);
  }, [textareaContent]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTextareaCursor(textareaRef.current);
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.errorField}>
        Error occurred!
      </div>
      <textarea className={style.textArea}
                ref={textareaRef}
                value={textareaContent}
      />
      <button className={style.submitButton} type={'submit'}> GET MORE</button>
    </form>
  )
}