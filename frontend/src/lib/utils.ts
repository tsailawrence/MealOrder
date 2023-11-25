import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';
import { useCookies } from 'react-cookie';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const instance = axios.create({
  baseURL: process?.env?.baseUrl
});

instance.interceptors.request.use(async (config) => {
  // try {
  //   const [cookies, setCookie] = useCookies(['refreshToken', 'accessToken']);

  //   let { accessToken, refreshToken} = cookies;
  //   if (!accessToken) {
  //     const { data: response } = await axios.post(`/token/refresh`, 
  //         {
  //           refreshToken
  //         }
  //       );

  //       ({ accessToken, refreshToken } = response?.data);

  //       console.info('Refresh', { accessToken, refreshToken});

  //       setCookie("accessToken", accessToken, {
  //         path: "/",
  //         maxAge: 600,
  //         sameSite: true,
  //       })

  //       setCookie("refreshToken", refreshToken, {
  //         path: "/",
  //         maxAge: 86400 * 7,
  //         sameSite: true,
  //       })
  //   }
  // } catch (err) {
  //   console.error('Refresh error', err);
  // }
  

  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});