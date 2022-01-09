export const getInitialSetting = (name) => {
    const persistedSetting = window.localStorage.getItem(name);
    const hasPersistedSetting = typeof persistedSetting === "string";

    if (hasPersistedSetting) {
        return persistedSetting;
    }

    return undefined;
};

export const persistSetting = (name, value) => {
    window.localStorage.setItem(name, value);
};