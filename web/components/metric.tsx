import { FC } from "react";

export const Metric: FC<{
  region: string;
  dnsLookup: number;
  tcpConnection: number;
  tlsHandshake: number;
  firstByte: number;
  contentTransfer: number;
  total: number;
}> = ({
  region,
  dnsLookup,
  tcpConnection,
  tlsHandshake,
  firstByte,
  contentTransfer,
  total,
}) => {
  const totalMs =
    dnsLookup + tcpConnection + tlsHandshake + firstByte + contentTransfer;
  return (
    <div className="bg-white p-8 flex items-center">
      <div className="flex-1">
        <h2>{region}</h2>
        <div>
          <div className="flex h-10 mt-6">
            <div
              className="bg-red-200 hover:bg-red-300 cursor-pointer"
              style={{ width: `${(dnsLookup / totalMs) * 100}%` }}
            ></div>
            <div
              className="bg-purple-200 hover:bg-purple-300 cursor-pointer"
              style={{ width: `${(tcpConnection / totalMs) * 100}%` }}
            ></div>
            <div
              className="bg-orange-200 hover:bg-orange-300 cursor-pointer"
              style={{ width: `${(tlsHandshake / totalMs) * 100}%` }}
            ></div>
            <div
              className="bg-green-200 hover:bg-green-300 cursor-pointer"
              style={{ width: `${(firstByte / totalMs) * 100}%` }}
            ></div>
            <div
              className="bg-blue-200 hover:bg-blue-300 cursor-pointer"
              style={{ width: `${(contentTransfer / totalMs) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      <p className="text-xl font-bold pl-6">
        {new Intl.NumberFormat("en-US", {
          style: "unit",
          unit: "millisecond",
        }).format(total)}
      </p>
    </div>
  );
};
