import useLocalStorage from './useLocalStorage';

export default function useAuth() {
	return useLocalStorage('user', null);
};
