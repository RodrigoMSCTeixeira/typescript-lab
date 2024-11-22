import SanitizeData from "./SanitizeData/ClassSanitizeDataForObjects";

interface Person {
  name: string;
  age: number;
  address: {
    cep: number;
  };
  cities: [
    {
      city: string;
    }
  ];
}

const defaultValue: Person = {
  name: "",
  age: 0,
  address: {
    cep: 0,
  },
  cities: [
    {
      city: "",
    },
  ],
};

const person = {
  name: "Jon Doe",
  age: 10,
  address: {
    cep: 0,
  },
  cities: [
    {
      city: "0",
    },
    {
      city: "0",
    },
  ],
};

const sanitizeObject = new SanitizeData<Person>({
  data: {
    ...person,
  },
  defaultValue: defaultValue,
}).sanitize;

console.log(sanitizeObject);
