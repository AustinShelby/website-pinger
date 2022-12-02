import { FC } from "react";
import { Metrics } from "../pages";

const metricColors: { [key in Metrics]: string } = {
  DNS: "bg-data_1",
  TCP: "bg-data_2",
  TLS: "bg-data_3",
  TTFB: "bg-data_4",
  TRANSFER: "bg-data_5",
};

const names: { [key in Metrics]: string } = {
  DNS: "DNS Lookup",
  TCP: "TCP Connection",
  TLS: "TLS Handshake",
  TTFB: "Time to First Byte",
  TRANSFER: "Content Transfer",
};

export const MetricButton: FC<{
  toggleMetric: (metric: Metrics) => void;
  metric: Metrics;
  selectedMetric?: Metrics;
}> = ({ toggleMetric, metric, selectedMetric }) => {
  return (
    <button
      onClick={() => toggleMetric(metric)}
      className={`${
        metricColors[metric]
      } px-6 py-2 rounded-sm text-sm sm:text-base font-semibold text-black/80 ${
        selectedMetric === undefined || selectedMetric === metric
          ? "opacity-100 hover:opacity-90"
          : "opacity-30 hover:opacity-40"
      }`}
    >
      {names[metric]}
    </button>
  );
};
