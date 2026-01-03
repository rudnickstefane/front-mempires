import { storageKeys } from "./StorageKeys";

type StorageValue = string | number;
type AllowedKeys = keyof typeof storageKeys;
type StorageMap = Partial<Record<AllowedKeys, StorageValue>> &
  Record<string, StorageValue>;

export const storage = {
  set(keyOrObject: StorageMap | string, value?: StorageValue) {
    const data: Record<string, StorageValue> =
      typeof keyOrObject === "string"
        ? { [keyOrObject]: value as StorageValue }
        : keyOrObject;

    Object.entries(data).forEach(([key, val]) => {
      const k = (storageKeys as Record<string, string>)[key] ?? key;
      localStorage.setItem(k, JSON.stringify(val));
    });
  },

  get<T extends StorageValue>(key: AllowedKeys | string): T | null {
    const k = (storageKeys as Record<string, string>)[key as string] ?? key;
    const item = localStorage.getItem(k);

    // Usamos o construtor JSON.parse apenas se o item existir,
    // forçando o retorno para T ou null para satisfazer o compilador.
    return item !== null ? (JSON.parse(item) as T) : null;
  },

  getMany<T extends Record<string, StorageValue>>(
    keys: (AllowedKeys | string)[]
  ): T {
    return keys.reduce((acc, key) => {
      const value = this.get(key);
      return { ...acc, [key]: value };
    }, {} as T);
  },

  remove(key: AllowedKeys | string) {
    const k = (storageKeys as Record<string, string>)[key as string] ?? key;
    localStorage.removeItem(k);
  },
};
