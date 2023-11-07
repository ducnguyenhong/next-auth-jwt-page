import Router from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from './api';
import { getCookieFromBrowser, removeCookie, setCookie } from './cookies';

const AuthContext = createContext<any>({});

interface User {
  username: string;
  fullName: string;
  id: number;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = getCookieFromBrowser('token');

      if (token) {
        try {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          // const userData: any = jwt.jwtDecode(token);
          // const { data: user } = await api.get(`/api/user/${userData.id}`);
          // if (user){
          //   setUser(user)
          // };
          setUser({
            username: 'duc.nguyenhong',
            fullName: 'Nguyễn Hồng Đức',
            id: 1
          });
        } catch (e: any) {
          // if (401 === e.response.status) {
          //   removeCookie('token');
          //   setUser(null);
          //   alert('Session expired, veuillez vous reconnecter');
          // }
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (email: string, password: string) => {
    // const { data: response } = await api.post('/api/login', {
    //   email,
    //   password
    // });
    // const token = response.token;
    // if (token) {
    //   setCookie('token', token);
    //   api.defaults.headers.Authorization = `Bearer ${token}`;
    //   const userData: any = jwt.jwtDecode(token);
    //   const { data: user } = await api.get(`/api/user/${userData.id}`);
    //   setUser(user);
    //   await Router.push('/');
    // }
    setCookie(
      'token',
      'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJpc3N1ZXIiLCJzdWIiOiJzdWJqZWN0IiwiYXVkIjpbImF1ZGllbmNlIiwiaW9zIiwib25saW5lIiwidHJhZGVhcGkiLCJhdXRoIl0sImV4cCI6MTY5OTM3MDgzNiwibmJmIjoxNjk5MzQxOTc2LCJpYXQiOjE2OTkzNDIwMzYsImFsbG93U2hhcmluZ1Byb2ZpbGUiOiIiLCJyb2xlcyI6IltdIiwiYWNjb3VudFR5cGUiOm51bGwsInZfdXNlcklkIjoiMjIwMDcwOTA4Mjc0NDMwOSIsInVzZXJJZCI6Im51bGwiLCJ2ZXJzaW9uIjoiVjIiLCJjdXN0b21lck5hbWUiOiJOZ3V54buFbiBI4buTbmcgxJDhu6ljIiwidHJhZGluZ0V4cCI6MCwiaWRnSWQiOm51bGwsInBob25lIjoiMDM4OTc1NTIwMiIsImN1c3RvbWVySWQiOm51bGwsInJldGlyZWRBY2NvdW50cyI6bnVsbCwidXNlclR5cGUiOm51bGwsImVtYWlsIjoiZHVjLm5ndXllbmhvbmdAdm5kaXJlY3QuY29tLnZuIiwidXNlcm5hbWUiOiJkdWMubmd1eWVuaG9uZyIsInN0YXR1cyI6Ik5vdCB1c2VkIn0.L1zkiM2XOT4KsqtuvEDhzkTP1hQ3YrZR3d35lnoO6VDFHG7Q_OMKRvZktwtyrFth9_cDQG5jjC2QqUabvdwikZhFP-dow90xnJfeJJ3CUQdgKMrHFsKgDtXRgrMAGZOr134MMwQa_mgzgjtwsy_rXME3TtKa6HGjHoxfTk3bbZTs6oyhxRkf_e7Mj_W_o6GbMq_sPHwIQQbh5s-zdBenuT9IMPlYimphRlgogXwFX0jng47oOXP7ex05y8N_kL8UzXmgkogzcOPx8se4U9om15kBBeSJe4G9THZhessAfpdib6f0ETXupKQkfUadn7GjFwMr3Y1ctSPqiNJmz-ychQ'
    );
    setUser({
      username: 'duc.nguyenhong',
      fullName: 'Nguyễn Hồng Đức',
      id: 1
    });
    Router.push('/');
  };

  const logout = () => {
    removeCookie('token');
    setUser(null);
    Router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
