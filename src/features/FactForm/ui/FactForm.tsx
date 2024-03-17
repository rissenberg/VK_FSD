import style from "./style.module.scss"
import React, {useEffect, useRef} from "react";
import {setTextareaCursor} from "../lib/setCursor";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {SimpleFetch} from "../../../shared/utils/SimpleFetch";

const Fact_API_URL: string = 'https://catfact.ninja/fact';

interface FactResponse {
  fact: string,
  length: number
}

export const FactForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const { data, refetch, error, isLoading } = useQuery<FactResponse>({
    queryKey: ['getFact'],
    queryFn: () => SimpleFetch(Fact_API_URL),
    enabled: false,
    retryDelay: 1000,
  });

  useEffect(() => {
    setTextareaCursor(textareaRef.current);
  }, [data]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    queryClient.cancelQueries({
      queryKey: ['getFact'],
    }).then(() => {
      return refetch();
    });
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {error &&
          <div className={style.errorField}>
            {error.toString()}
          </div>
      }
      <textarea className={style.textArea}
                ref={textareaRef}
                value={data && data.fact}
      />
      <button className={style.submitButton} type={'submit'}>
        {isLoading ? 'Loading...' : 'Get more!'}
      </button>
    </form>
  )
}