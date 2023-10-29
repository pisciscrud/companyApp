import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Department {
  id: number;
  name: string;
  employees: Employee[];
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
}

interface DepartmentChartProps {
  departments: Department[];
}

const DepartmentChart: React.FC<DepartmentChartProps> = ({ departments }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy(); // Уничтожаем предыдущий график, если он существует
        }

        const employeeCounts = departments.map(
          (department) => department.employees.length
        );

        chartRef.current = new Chart(ctx, {
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
