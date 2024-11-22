export default class SanitizeData<T extends Record<string, any>> {
  #_data: T = {} as T;

  constructor({ data, defaultValue }: { data: any; defaultValue: T }) {
    this.#_sanitize({
      data,
      defaultValue,
    });
  }

  #_sanitize({ data, defaultValue }: { data: any; defaultValue: T }) {
    for (const key in defaultValue) {
      //extraindo o valor de data
      const currentValue = data[key];
      //extraindo o tipo de cada propriedade de valores padrão
      const typeDefaultValue = typeof defaultValue[key];
      //extraindo o valor de cada propriedade de valores padrão
      const currentDefaultValue = defaultValue[key];

      if (
        currentValue === undefined ||
        typeof currentValue !== typeDefaultValue
      ) {
        throw new Error(
          `Invalid type for ${key}. Expected ${typeDefaultValue}, got ${typeof currentValue}. ${key}: ${currentValue}`
        );
      }

      switch (typeDefaultValue) {
        case "object": {
          if (Array.isArray(currentDefaultValue)) {
            currentValue.forEach((item: any) => {
              this.#_sanitize({
                data: item,
                defaultValue: currentDefaultValue[0],
              });
            });
          } else {
            this.#_sanitize({
              data: currentValue,
              defaultValue: currentDefaultValue,
            });
          }
          break;
        }
      }
    }

    this.#_data = data;
  }

  get sanitize() {
    return this.#_data;
  }
}
