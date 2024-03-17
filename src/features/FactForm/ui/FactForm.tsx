import style from "./style.module.scss"
import React, {useEffect, useRef} from "react";
import {setTextareaCursor} from "../lib/setCursor";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {SimpleFetch} from "../../../shared/utils/SimpleFetch";
import {FactResponse} from "../types/types";
import {Button, FormStatus, Textarea} from "@vkontakte/vkui";

const FACT_API_URL: string = 'https://catfact.ninja/fact';

export const FactForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const { data, refetch, error, isFetching } = useQuery<FactResponse>({
    queryKey: ['getFact'],
    queryFn: ({signal}) => SimpleFetch(FACT_API_URL, signal),
    enabled: false,
    retryDelay: 1000,
  });

  // При получении ответа на запрос, курсор переместится после первого слова
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
      {error && <FormStatus header={error.toString()} mode="error"/>}

      <Textarea getRef={textareaRef}
                className={style.textArea}
                value={data && data.fact}
                placeholder="Facts will be here"
      />

      <Button type='submit' size="m" loading={isFetching}>
        Get more!
      </Button>
    </form>
  )
}
