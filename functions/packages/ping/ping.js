import https from "https";

export const main = async (args) => {
  const eventTimes = {
    startAt: process.hrtime.bigint(),
    dnsLookupAt: BigInt("0"),
    tcpConnectionAt: BigInt("0"),
    tlsHandshakeAt: BigInt("0"),
    firstByteAt: BigInt("0"),
    endAt: BigInt("0"),
  };

  try {
    await new Promise(async (resolve, reject) => {
      const request = https.request(args.url, (response) => {
        response.once("readable", () => {
          console.log("Readable");
          eventTimes.firstByteAt = process.hrtime.bigint();
        });

        response.on("data", () => {});

        response.on("end", () => {
          console.log("end");
          eventTimes.endAt = process.hrtime.bigint();
          resolve(undefined);
        });
      });

      request.on("socket", (socket) => {
        socket.on("lookup", () => {
          console.log("lookup");
          eventTimes.dnsLookupAt = process.hrtime.bigint();
        });
        socket.on("connect", () => {
          console.log("connect");
          eventTimes.tcpConnectionAt = process.hrtime.bigint();
        });
        socket.on("secureConnect", () => {
          console.log("secureConnect");
          eventTimes.tlsHandshakeAt = process.hrtime.bigint();
        });
        socket.on("timeout", () => {
          console.log("timeout");
          request.destroy();
          reject(undefined);
        });
      });

      request.on("error", (error) => {
        console.error(error);
        console.log("error");
        reject(error);
      });

      request.end();
    });

    console.log(eventTimes);
    const dnsLookup = eventTimes.dnsLookupAt - eventTimes.startAt;
    const tcpConnection = eventTimes.tcpConnectionAt - eventTimes.dnsLookupAt;
    const tlsHandshake = eventTimes.tlsHandshakeAt - eventTimes.tcpConnectionAt;
    const firstByte = eventTimes.firstByteAt - eventTimes.tlsHandshakeAt;
    const contentTransfer = eventTimes.endAt - eventTimes.firstByteAt;
    const total = eventTimes.endAt - eventTimes.startAt;
    return {
      body: JSON.stringify({
        dnsLookup: Number(dnsLookup / BigInt(1_000_000)),
        tcpConnection: Number(tcpConnection / BigInt(1_000_000)),
        tlsHandshake: Number(tlsHandshake / BigInt(1_000_000)),
        firstByte: Number(firstByte / BigInt(1_000_000)),
        contentTransfer: Number(contentTransfer / BigInt(1_000_000)),
        total: Number(total / BigInt(1_000_000)),
      }),
      headers: { "content-type": "application/json" },
      status: 200,
    };
  } catch (error) {
    console.error(error);
    console.log(eventTimes);
    res.status(500).end();
    return {
      body: JSON.stringify({ error: "Error requesting URL" }),
      headers: { "content-type": "application/json" },
      status: 500,
    };
  }
  // return {
  //   body: JSON.stringify({
  //     durationMs: Number(((end - start) / BigInt(1_000_000)).toString()),
  //   }),
  //   headers: { "content-type": "application/json" },
  // };
};

// export const main = async (args) => {
//   const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
//   const options = {
//     logLevel: "info",
//     output: "html",
//     onlyCategories: ["performance"],
//     port: chrome.port,
//   };
//   const runnerResult = await lighthouse("https://github.com", options);
//   console.log(runnerResult);

//   const website = args.url;
//   const start = process.hrtime.bigint();
//   await fetch(website);
//   const end = process.hrtime.bigint();
//   return {
//     body: JSON.stringify({
//       durationMs: Number(((end - start) / BigInt(1_000_000)).toString()),
//     }),
//     headers: { "content-type": "application/json" },
//   };
// };
