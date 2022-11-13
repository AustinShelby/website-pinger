import { ChangeEvent, FormEvent, useState } from "react";

const regions = [
  {
    name: "Singapore",
    url: "https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-c70d76cc-9eea-459c-8e09-73003a6b8d79/default/ping-website",
  },
];

const HomePage = () => {
  const [url, setUrl] = useState<string>("");

  const change = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch(
      "https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-c70d76cc-9eea-459c-8e09-73003a6b8d79/default/ping-website",
      {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
  };
  // https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-ace62185-5a20-425b-b754-3640ffa6708e/default/test-function
  // https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-ace62185-5a20-425b-b754-3640ffa6708e/default/test-function

  // const main = async () => {
  //   const website = "https://stackoverflow.com/questions/29775797/fetch-post-json-data"
  //   const start = process.hrtime.bigint()
  //   const result = await fetch(website)
  //   const end = process.hrtime.bigint()
  //   return {"result": `Request took: ${((end - start) / BigInt(1_000_000)).toString()}ms`}
  // }

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="url">URL</label>
        <input type="text" value={url} onChange={change} />
      </form>
    </div>
  );
};

export default HomePage;
