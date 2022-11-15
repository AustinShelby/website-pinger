import { ChangeEvent, FormEvent, Fragment, useState } from "react";

const regions = [
  {
    name: "Singapore",
    url: "https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-c70d76cc-9eea-459c-8e09-73003a6b8d79/default/ping-website",
  },
  {
    name: "New York",
    url: "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-d3627ee8-5865-429f-9444-34c626260179/pings/new-york-pink",
  },
  {
    name: "London",
    url: "https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-2276c8b9-7f4d-4165-a749-af9b8996cb37/pings/london-ping",
  },
  {
    name: "Sidney",
    url: "https://australia-ping-fsoph.ondigitalocean.app/ping/ping",
  },
];

type Result = { region: string; durationMs: number };

const HomePage = () => {
  const [url, setUrl] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);

  const change = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const results = await Promise.all(
      regions.map(async (region) => {
        const result = await fetch(region.url, {
          method: "POST",
          body: JSON.stringify({ url }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const json = await result.json();
        return { region: region.name, durationMs: json.durationMs };
      })
    );
    setResults(results);
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="url">URL</label>
        <input type="text" value={url} onChange={change} />
        <button>Test Website Speed</button>
      </form>

      <h2>Results</h2>
      <dl>
        {results.map((result, index) => (
          <Fragment key={index}>
            <dt>{result.region}</dt>
            <dd>
              {new Intl.NumberFormat("en-US", {
                style: "unit",
                unit: "millisecond",
              }).format(result.durationMs)}
            </dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
};

export default HomePage;
