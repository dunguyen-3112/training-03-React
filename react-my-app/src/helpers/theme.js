import { THEME_DARK, THEME_LIGHT } from "../constants";

const themeToColor = (theme) => {
    switch (theme) {
        case THEME_DARK:
            return THEME_LIGHT;
        case THEME_LIGHT:
            return THEME_DARK;

        default:
            throw new Error("Theme not handle!!!");
    }
};

export { themeToColor };
