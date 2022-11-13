const main = async (args) => {
  const website = args.url;
  const start = process.hrtime.bigint();
  await fetch(website);
  const end = process.hrtime.bigint();
  return {
    body: JSON.stringify({
      durationMs: Number(((end - start) / BigInt(1_000_000)).toString()),
    }),
    headers: { "content-type": "application/json" },
  };
};
