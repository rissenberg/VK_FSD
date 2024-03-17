import style from "./style.module.scss"
import React, {useEffect, useRef, useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {QueryArg, SimpleFetch} from "../../../shared/utils/SimpleFetch";
import {validateEnglishText} from "../../../shared/validators/validateEnglishText";

const AGE_API_URL: string = 'https://api.agify.io';

interface AgeResponse {
  name: string,
  age: number
}

export const AgeForm = () => {
  const timerRef = useRef<NodeJS.Timeout>();
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

  useEffect(() => {
    timerRef.current = setTimeout(sendRequest, 3000);

    return () => clearTimeout(timerRef.current);
  }, [queryArg]);

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
    if (!queryArg || (data && data.name === queryArg.value))
      return;

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
      <div className={style.inputContainer}>
        <input type="text"
               className={style.formInput}
               onInput={handleInput}
        />
        <button className={style.submitButton}> Get </button>
      </div>

      {validatorError &&
          <div className={style.errorField}>
            {validatorError}
          </div>
      }

      {error &&
        <div className={style.errorField}>
          {error.toString()}
        </div>
      }

      {!error &&
        <div className={style.resultField}>
          {isFetching ? 'Loading...' :
            data && ( data.age ? `Person ${data.name} is ${data.age} year old` : 'Not found' )
          }
        </div>
      }
    </form>
  )
}