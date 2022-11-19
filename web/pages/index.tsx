import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { Metric } from "../components/metric";

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
  const [res, setRes] = useState();

  const change = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const properUrl = buildProperUrl(url);
      console.log(properUrl);
      const results = await fetch("/api/ping");
      const json = await results.json();
      setRes(json);
      // const results = await Promise.all(
      //   regions.map(async (region) => {
      //     const result = await fetch(region.url, {
      //       method: "POST",
      //       body: JSON.stringify({ url }),
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json",
      //       },
      //     });
      //     const json = await result.json();
      //     return { region: region.name, durationMs: json.durationMs };
      //   })
      // );
      // setResults(results);
    } catch (e) {
      console.log(e);
    }
  };

  const test = async () => {
    const res = await fetch("/api/ping");
    const json = await res.json();
    setRes(json);
  };

  const buildProperUrl = (url: string): URL => {
    if (url.search(/https?:\/\//) === 0) {
      return new URL(url);
    }
    return new URL(`https://${url}`);
  };

  return (
    <div className="">
      <div className="bg-blue-900 relative">
        <h1 className="text-center text-white text-7xl font-bold pt-16">
          Website Speed Test
        </h1>
        <div className="bg-white rounded-lg shadow-xl p-8 h-32 -mb-16 z-10 relative max-w-3xl mx-auto mt-16">
          <form onSubmit={submit}>
            <label htmlFor="url" className="block mb-2">
              Your website's URL
            </label>
            <div className="flex items-center ">
              <input
                type="text"
                id="url"
                name="url"
                value={url}
                onChange={change}
                className="bg-gray-100 py-2 px-4 rounded text-lg block flex-1 mr-2"
              />
              <button
                className="block bg-yellow-200 text-yellow-900 font-medium py-2 text-lg px-6"
                type="submit"
              >
                Test Website
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="relative bg-gray-50 pt-32">
        <ul className="max-w-2xl mx-auto space-y-16">
          {regions.map((region) => (
            <li className="shadow-lg" key={region.name}>
              <Metric
                region="USA"
                dnsLookup={res?.dnsLookup}
                tcpConnection={res?.tcpConnection}
                tlsHandshake={res?.tlsHandshake}
                firstByte={res?.firstByte}
                contentTransfer={res?.contentTransfer}
                total={res?.total}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
