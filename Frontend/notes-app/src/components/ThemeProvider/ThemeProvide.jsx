import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ThemeProvider = ({ children }) => {
    const { theme } = useSelector((state) => state.theme);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return <>{children}</>;
};