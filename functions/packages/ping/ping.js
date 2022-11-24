import https from "https";

export const main = async (args) => {
  try {
    const fakeResponse = await fetch(args.url);

    const eventTimes = {
      startAt: process.hrtime.bigint(),
      dnsLookupAt: BigInt("0"),
      tcpConnectionAt: BigInt("0"),
      tlsHandshakeAt: BigInt("0"),
      firstByteAt: BigInt("0"),
      endAt: BigInt("0"),
    };

    await new Promise(async (resolve, reject) => {
      const request = https.request(fakeResponse.url, (response) => {
        response.once("readable", () => {
          eventTimes.firstByteAt = process.hrtime.bigint();
        });

        response.on("data", () => {});

        response.on("end", () => {
          eventTimes.endAt = process.hrtime.bigint();
          resolve(undefined);
        });
      });

      request.on("socket", (socket) => {
        socket.on("lookup", () => {
          eventTimes.dnsLookupAt = process.hrtime.bigint();
        });
        socket.on("connect", () => {
          eventTimes.tcpConnectionAt = process.hrtime.bigint();
        });
        socket.on("secureConnect", () => {
          eventTimes.tlsHandshakeAt = process.hrtime.bigint();
        });
        socket.on("timeout", () => {
          request.destroy();
          reject(undefined);
        });
      });

      request.on("error", (error) => {
        reject(error);
      });

      request.end();
    });

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
    };
  } catch (error) {
    console.error(error);
    return {
      body: JSON.stringify({ error: "Error requesting URL" }),
      headers: { "content-type": "application/json" },
      statusCode: 500,
    };
  }
};
