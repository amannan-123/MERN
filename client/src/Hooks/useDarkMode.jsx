import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useDarkThemeByDefault = true;

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