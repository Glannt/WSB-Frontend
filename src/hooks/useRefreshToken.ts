import axios from '../service/customize_axios';
import useAuth from './useAuth';
import { AuthContextType } from '../context/AuthProvider';
type RefreshTokenResponse = {
  accessToken: string;
};
const useRefreshToken = () => {
  // Extract setAuth from the context
  const { setAuth }: any = useAuth();

  // Define the refresh function
  const refresh = async (): Promise<string | undefined> => {
    try {
      // Make an API request to refresh the token
      const response = await axios.get<RefreshTokenResponse>('refresh', {
        withCredentials: true,
      });

      // Update the auth context with the new access token
      setAuth((prevAuth: any) => {
        console.log(JSON.stringify(prevAuth));
        console.log(response.data.accessToken);

        // Make sure to return a new object to update the context correctly
        return { ...prevAuth, accessToken: response.data.accessToken };
      });

      // Return the new access token
      return response.data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return undefined;
    }
  };

  return refresh;
};
export default useRefreshToken;
