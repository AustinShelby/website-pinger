import { FC } from "react";

export const Metric: FC<{
  region: string;
  dnsLookup: number;
  tcpConnection: number;
  tlsHandshake: number;
  firstByte: number;
  contentTransfer: number;
  total: number;
  maxTotal: number;
}> = ({
  region,
  dnsLookup,
  tcpConnection,
  tlsHandshake,
  firstByte,
  contentTransfer,
  total,
  maxTotal,
}) => {
  const totalMs =
    dnsLookup + tcpConnection + tlsHandshake + firstByte + contentTransfer;
  return (
    <div className="flex items-center">
      <h2 className="w-2/12 text-right text-gray-500 pr-4">{region}</h2>
      <div className="w-8/12">
        <div className="flex h-8">
          <div
            className="bg-red-600 hover:bg-red-500 cursor-pointer"
            style={{
              width: `${(dnsLookup / totalMs) * (total / maxTotal) * 100}%`,
            }}
          ></div>
          <div
            className="bg-purple-600 hover:bg-purple-500 cursor-pointer"
            style={{
              width: `${(tcpConnection / totalMs) * (total / maxTotal) * 100}%`,
            }}
          ></div>
          <div
            className="bg-orange-600 hover:bg-orange-500 cursor-pointer"
            style={{
              width: `${(tlsHandshake / totalMs) * (total / maxTotal) * 100}%`,
            }}
          ></div>
          <div
            className="bg-green-600 hover:bg-green-500 cursor-pointer"
            style={{
              width: `${(firstByte / totalMs) * (total / maxTotal) * 100}%`,
            }}
          ></div>
          <div
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer"
            style={{
              width: `${
                (contentTransfer / totalMs) * (total / maxTotal) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <p className="text-xl text-right text-white font-bold pl-6 w-2/12">
        {new Intl.NumberFormat("en-US", {
          style: "unit",
          unit: "millisecond",
        }).format(total)}
      </p>
    </div>
  );
};
