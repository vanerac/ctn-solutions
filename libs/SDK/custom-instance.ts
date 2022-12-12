// custom-instance.ts

import Axios, {AxiosError, AxiosRequestConfig} from 'axios';

export const AXIOS_INSTANCE = Axios.create({baseURL: process.env.API_URL ?? 'http://localhost:3000'}); // use your own URL here or environment variable

AXIOS_INSTANCE.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        } else {
            throw new Error('No token found');
        }
        return config;
    });

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({data}) => data);

    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled');
    };

    return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = CamelCase<BodyData>;


type CamelCase<T> = {
    [K in keyof T as K extends string ? Lowercase<K> : K]: T[K];
}
