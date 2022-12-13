// Original Source: https://github.com/fireship-io/tailwind-dashboard/blob/main/src/hooks/useDarkMode.jsx
// Modified for personal use!
import { useEffect, useState } from 'react';

const useDarkThemeByDefault = true;

const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue];
};

export default function useDarkMode() {
	const [enabled, setEnabled] = useLocalStorage('dark-theme', useDarkThemeByDefault);
	const isEnabled = typeof enabled === 'undefined' ? useDarkThemeByDefault : enabled;

	useEffect(() => {
		const className = 'dark';
		const bodyClass = window.document.body.classList;

		isEnabled ? bodyClass.add(className) : bodyClass.remove(className);

	}, [enabled, isEnabled]);

	return [enabled, setEnabled];
};