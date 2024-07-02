export type UserItem = {
  name: string;
  id: number;
  email: string;
  address?: Address;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipCode: string;
  geo: Coordinate;
};

type Coordinate = {
  lat: string;
  long: string;
};

export type UserData = UserItem & {
  token: string;
};
