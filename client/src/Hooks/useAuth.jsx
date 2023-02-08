import useLocalStorage from './useLocalStorage';

export default function useAuth() {
	const [user, setUser] = useLocalStorage('user', null);
	return [user, setUser];
};
