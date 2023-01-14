const now = new Date();
now.setDate(now.getDate() - 1);
export const DATE_DEFAULT = now.toISOString().substring(0, 10);
export const AVATAR_DEFAULT =
  "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg";
export const SELECT_OPTIONS_DEFAULT = 0;
export const INPUT_EMPTY_DEFAULT = "";
