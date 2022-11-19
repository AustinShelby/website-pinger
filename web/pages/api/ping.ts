import https from "https";

const handler = async (req, res) => {
  const eventTimes = {
    // use process.hrtime() as it's not a subject of clock drift
    startAt: process.hrtime.bigint(),
    dnsLookupAt: BigInt("0"),
    tcpConnectionAt: BigInt("0"),
    tlsHandshakeAt: BigInt("0"),
    firstByteAt: BigInt("0"),
    endAt: BigInt("0"),
  };

  try {
    await new Promise(async (resolve, reject) => {
      const request = https.request(
        "https://www.milinemiami.com/",
        (response) => {
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
        }
      );

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
    res.status(200).json({
      dnsLookup: Number(dnsLookup / BigInt(1_000_000)),
      tcpConnection: Number(tcpConnection / BigInt(1_000_000)),
      tlsHandshake: Number(tlsHandshake / BigInt(1_000_000)),
      firstByte: Number(firstByte / BigInt(1_000_000)),
      contentTransfer: Number(contentTransfer / BigInt(1_000_000)),
      total: Number(total / BigInt(1_000_000)),
    });
  } catch (error) {
    console.error(error);
    console.log(eventTimes);
    res.status(500).end();
  }

  // res.status(200).json({ message: "Hello from Next.js!" });
};

export default handler;
