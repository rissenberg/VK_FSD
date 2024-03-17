import style from "./style.module.scss"
import React, {useEffect, useRef, useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {SimpleFetch} from "../../../shared/utils/SimpleFetch";
import {validateEnglishText} from "../../../shared/validators/validateEnglishText";
import {AgeResponse} from "../types/types";
import {QueryArg} from "../../../shared/types";
import {Button, FormItem, FormStatus, Input} from "@vkontakte/vkui";

const AGE_API_URL: string = 'https://api.agify.io';

export const AgeForm = () => {
  // Референс таймера отправки запросов
  const timerRef = useRef<NodeJS.Timeout>();
  // Объект, содержащий query запрос - название параметра и его значение
  const [queryArg, setQueryArg] = useState<QueryArg | null>(null);
  const [validatorError, setValidatorError] = useState<string>('');
  const queryClient = useQueryClient();

  const { data, refetch, error, isFetching } = useQuery<AgeResponse>({
    queryKey: ['getAge'],
    queryFn: ({ signal}) => SimpleFetch(
      AGE_API_URL,
      signal,
      queryArg ? Object.values({queryArg}) : []
    ),
    enabled: false,
    retryDelay: 1000,
  });

  // Реализация таймера отправки запроса
  useEffect(() => {
    timerRef.current = setTimeout(sendRequest, 3000);

    return () => clearTimeout(timerRef.current);
  }, [queryArg]);

  // Реализация таймера проверки введенных данных
  useEffect(() => {
    const validatorTimer = setTimeout(() => {
        setValidatorError(queryArg && !validateEnglishText(queryArg.value) ?
          'Only english alphabet is allowed'
          : ''
        );
    }, 700);

    return () => clearTimeout(validatorTimer);
  }, [queryArg]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearTimeout(timerRef.current);
    sendRequest();
  }

  const sendRequest = () => {
    // Равносильно, что: если input пустой или имя такое же, как в предыдущем запросе
    if (!queryArg || (data && data.name === queryArg.value))
      return;

    // Еще одна валидация, если таймер не успел сработать
    if (!validateEnglishText(queryArg.value)) {
      setValidatorError('Only english alphabet is allowed');
      return;
    }
    setValidatorError('');


    queryClient.cancelQueries({
      queryKey: ['getAge'],
    }).then(() => {
      return refetch();
    });
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryArg( event.target.value ?
      {
        parameter: 'name',
        value: event.target.value,
      }
      : null
    );
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {validatorError &&  <FormStatus header={validatorError} mode="error"/>}
      {error &&  <FormStatus header={error.toString()} mode="error"/>}

      <FormItem htmlFor="nameInput" top="Enter name">
        <Input type="text" id="nameInput" onInput={handleInput} />
      </FormItem>

      <Button type="submit" size="m" loading={isFetching}> Get! </Button>

      {(!error && data) &&
        <FormStatus mode="default"
          header={data && ( data.age ? `Person ${data.name} is ${data.age} year old` : 'Not found' )}
        />
      }
    </form>
  )
}
