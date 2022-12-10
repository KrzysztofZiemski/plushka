export class LocalStorageManager<Type> {
  private name = "";
  private validator: (v: Type) => boolean = ({}) => true;

  constructor(name: string, validator?: (v: Type) => boolean) {
    this.name = name;
    if (validator) this.validator = validator;
  }

  get state() {
    try {
      const serialisedState = localStorage.getItem(this.name);
      if (serialisedState === null) return null;
      const data = JSON.parse(serialisedState) as Type;
      if (!this.validator(data)) {
        return null;
      }

      return data;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  save(state: Type) {
    try {
      const result = this.validator(state);

      if (!result) throw new Error("invalid data");

      const serialisedState = JSON.stringify(state);

      localStorage.setItem(this.name, serialisedState);
    } catch (e) {
      throw e;
    }
  }

  validate(data: Type) {
    return this.validator(data);
  }
}
