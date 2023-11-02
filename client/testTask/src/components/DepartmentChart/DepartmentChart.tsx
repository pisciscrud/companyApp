import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { GetFiveLargestDepartamentsOutput } from "../../api/types";

interface DepartmentChartProps {
  departments: GetFiveLargestDepartamentsOutput;
}

const DepartmentChart: React.FC<DepartmentChartProps> = ({ departments }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"doughnut", number[], string> | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        const employeeCounts = departments.map(
          (department) => department.employees?.length ?? 0
        );
        if (chartRef) {
          const chart = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: departments.map((department) => department.name),
              datasets: [
                {
                  data: employeeCounts,
                  backgroundColor: [
                    "rgba(0, 0, 255, 0.6)",
                    "rgba(0, 128, 255, 0.6)",
                    "rgba(19, 38, 98, 0.4)",
                    "rgba(102, 178, 255, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                  ],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
            },
          });
          chartRef.current = chart;
        }
      }
    }
  }, [departments]);

  return (
    <div
      style={{
        marginTop: "40px",
        width: "300px",
        height: "300px",
        marginRight: "40px",
        color: "white",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          border: "3px solid rgb(19, 38, 98)",
        }}
      ></canvas>
    </div>
  );
};

export default DepartmentChart;
