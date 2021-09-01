import { useSelector } from 'react-redux';

export function useToken() {
    const { token } = useSelector((state) => state.userLogin);

    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      return config
}