import { FC } from "react";
import { Metrics } from "../pages";

const metricTexts: { [key in Metrics]: string } = {
  DNS: "text-data_1",
  TCP: "text-data_2",
  TLS: "text-data_3",
  TTFB: "text-data_4",
  TRANSFER: "text-data_5",
};

export const Metric: FC<{
  region: string;
  region_2?: string;
  dnsLookup: number | undefined;
  tcpConnection: number | undefined;
  tlsHandshake: number | undefined;
  firstByte: number | undefined;
  contentTransfer: number | undefined;
  total: number | undefined;
  maxTotal: number | undefined;
  selectedMetric?: Metrics;
  toggleMetric: (metric: Metrics) => void;
}> = ({
  region,
  region_2,
  dnsLookup,
  tcpConnection,
  tlsHandshake,
  firstByte,
  contentTransfer,
  total,
  maxTotal,
  selectedMetric,
  toggleMetric,
}) => {
  const totalMs =
    dnsLookup + tcpConnection + tlsHandshake + firstByte + contentTransfer;

  const metricSelection: { [key in Metrics]?: number } = {
    DNS: dnsLookup,
    TCP: tcpConnection,
    TLS: tlsHandshake,
    TTFB: firstByte,
    TRANSFER: contentTransfer,
  };
  const formattedParts = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "millisecond",
  }).formatToParts(
    Number.isInteger(metricSelection[selectedMetric])
      ? metricSelection[selectedMetric]
      : total
  );
  return (
    <div className="flex items-center">
      <p
        className={`text-2xl text-right ${
          selectedMetric ? metricTexts[selectedMetric] : "text-white"
        }  font-bold pr-6 w-2/12`}
      >
        {formattedParts[0].value === "NaN" ? "--" : formattedParts[0].value}
        &nbsp;
        <span className="text-base font-normal">{formattedParts[2].value}</span>
      </p>
      <div className="w-8/12">
        {Number.isInteger(dnsLookup) &&
          Number.isInteger(tcpConnection) &&
          Number.isInteger(tlsHandshake) &&
          Number.isInteger(firstByte) &&
          Number.isInteger(contentTransfer) &&
          Number.isInteger(total) &&
          Number.isInteger(maxTotal) && (
            <div className="flex h-10 space-x-px">
              <div
                onClick={() => toggleMetric("DNS")}
                className={`bg-data_1 cursor-pointer ${
                  selectedMetric === undefined || selectedMetric === "DNS"
                    ? "opacity-100 hover:opacity-90"
                    : "opacity-30 hover:opacity-40"
                }`}
                style={{
                  width: `${(dnsLookup / totalMs) * (total / maxTotal) * 100}%`,
                }}
              ></div>
              <div
                onClick={() => toggleMetric("TCP")}
                className={`bg-data_2 cursor-pointer ${
                  selectedMetric === undefined || selectedMetric === "TCP"
                    ? "opacity-100 hover:opacity-90"
                    : "opacity-30 hover:opacity-40"
                }`}
                style={{
                  width: `${
                    (tcpConnection / totalMs) * (total / maxTotal) * 100
                  }%`,
                }}
              ></div>
              <div
                onClick={() => toggleMetric("TLS")}
                className={`bg-data_3 cursor-pointer ${
                  selectedMetric === undefined || selectedMetric === "TLS"
                    ? "opacity-100 hover:opacity-90"
                    : "opacity-30 hover:opacity-40"
                }`}
                style={{
                  width: `${
                    (tlsHandshake / totalMs) * (total / maxTotal) * 100
                  }%`,
                }}
              ></div>
              <div
                onClick={() => toggleMetric("TTFB")}
                className={`bg-data_4 cursor-pointer ${
                  selectedMetric === undefined || selectedMetric === "TTFB"
                    ? "opacity-100 hover:opacity-90"
                    : "opacity-30 hover:opacity-40"
                }`}
                style={{
                  width: `${(firstByte / totalMs) * (total / maxTotal) * 100}%`,
                }}
              ></div>
              <div
                onClick={() => toggleMetric("TRANSFER")}
                className={`bg-data_5 cursor-pointer ${
                  selectedMetric === undefined || selectedMetric === "TRANSFER"
                    ? "opacity-100 hover:opacity-90"
                    : "opacity-30 hover:opacity-40"
                }`}
                style={{
                  width: `${
                    (contentTransfer / totalMs) * (total / maxTotal) * 100
                  }%`,
                }}
              ></div>
            </div>
          )}
      </div>
      <p className="w-2/12 text-left text-white font-semibold leading-none pl-4 whitespace-nowrap">
        {region}
        {region_2 && (
          <>
            <br />
            <span className="text-gray-400 text-xs leading-loose font-normal">
              {region_2}
            </span>
          </>
        )}
      </p>
    </div>
  );
};
