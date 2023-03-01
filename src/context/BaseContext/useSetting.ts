import { SETTING_KEY } from "@/config/localKeys";
import useStorage from "@/utils/useStorage";
import { useEffect, useState } from "react";


// @ts-ignore
import { generate, getRgbStr } from "@arco-design/color";


export const setColorVar = (color: string) => {
  const theme =
    document.querySelector("body")?.getAttribute("arco-theme") || "light";
  const newList = generate(color, {
    list: true,
    dark: theme === "dark",
  });

  newList.forEach((l, index) => {
    const rgbStr = getRgbStr(l);
    document.body.style.setProperty(`--arcoblue-${index + 1}`, rgbStr);
  });
};


const defaultSetting: SettingOptions = {
  themeColor: "#165DFF",
  lang: "zh-CN",
  theme: "dark",
  collapsed:false
};

export type UseSetting = {
  setting: SettingOptions;
  setSetting(p: SettingOptions): void;
};

export const changeTheme = (theme) => {
  if (theme === "dark") {
    document.body.setAttribute("arco-theme", "dark");
  } else {
    document.body.removeAttribute("arco-theme");
  }
};

const useSetting = (): UseSetting => {
  const [setting, _setSetting] = useStorage<SettingOptions>(
    SETTING_KEY,
    defaultSetting
  );

  useEffect(() => {
    setColorVar(setting.themeColor);
    changeTheme(setting.theme)
  }, []);

  const setSetting = (value: SettingOptions) => {
    const { themeColor, theme } = value;
    // 更改主题颜色
    if (value.themeColor !== setting.themeColor) {
      setColorVar(themeColor);
    }
    // 更改主题
    if (theme !== setting.theme) {
      changeTheme(theme)
    }
    _setSetting(value);
  };

  return { setting, setSetting };
};
export default useSetting;
