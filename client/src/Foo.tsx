import { useEffect, useState } from "react";

type APIUserResponse = {
  username: string;
  email: string;
  password: string;
};

function Foo() {
  // const [foo, setFoo] = useState<APIUserResponse[] | null>(null);
  // const [foo, setFoo] = useState<APIUserResponse[] >([{email:"", password:""}]);
  const [foo, setFoo] = useState<APIUserResponse[]>([] as APIUserResponse[]);
  const getData = async () => {
    const response = await fetch("http://localhost:5004/api/users/allusers");

    const result: APIUserResponse[] = await response.json();
    console.log("result", result);
    setFoo(result);
  };
  useEffect(() => {
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };

    // fetch("localhost:5005/api/users/allusers")
    //   .then((response) => response.json())
    //   .then((result) => console.log("result", result))
    //   .catch((error) => console.log("error", error));
    getData();
  }, []);
  return (
    <div>
      Foo
      <div>
        {foo &&
          foo.map((f) => {
            return <div>{f.email}</div>;
          })}
      </div>
    </div>
  );
}

export default Foo;
