interface Props {
  route: string;
  data: object;
}

export const SendData = async ({ route, data }: Props) => {
  const reqConfig: RequestInit = {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(route, reqConfig);
  const res = await response.json();
  return res;
};

export const fetchData = async (route: string) => {
  const reqConfig: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(route, reqConfig);
  const res = await response.json();

  return res;
};
