import { FC } from "react";

export const Message: FC<{ timeMs?: number }> = ({ timeMs }) => {
  const formattedTime = timeMs
    ? new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "millisecond",
      }).format(timeMs)
    : "--";
  return (
    <div className="absolute">
      <div className="relative w-full">
        <div className="absolute bottom-4 -left-4">
          <div className="relative w-full drop-shadow">
            <div className="flex items-center px-4 py-1.5 bg-gray-700 rounded-t-sm rounded-br-sm">
              {timeMs && (
                <div className="relative z-10 h-3 w-3 rounded-full mr-4">
                  <div
                    className={`h-3 w-3 rounded-full absolute animate-ping ${
                      timeMs < 800
                        ? "bg-green-500/60"
                        : timeMs < 1200
                        ? "bg-yellow-500/60"
                        : "bg-red-500/60"
                    } `}
                  ></div>
                  <div
                    className={` h-3 w-3 rounded-full ${
                      timeMs < 800
                        ? "bg-green-500"
                        : timeMs < 1200
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    } absolute`}
                  ></div>
                </div>
              )}
              <p className="text-white text-lg whitespace-nowrap tabular-nums font-medium">
                {formattedTime}
              </p>
            </div>
            <div className="absolute w-6 h-6 rotate-45 left-[5.04px] -bottom-[12px] bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
