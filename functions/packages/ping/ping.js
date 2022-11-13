const main = async () => {
  const website =
    "https://stackoverflow.com/questions/29775797/fetch-post-json-data";
  const start = process.hrtime.bigint();
  const result = await fetch(website);
  const end = process.hrtime.bigint();
  return {
    body: `Request took: ${((end - start) / BigInt(1_000_000)).toString()}ms`,
    headers: { "content-type": "application/json" },
  };
};
