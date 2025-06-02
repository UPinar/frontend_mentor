import { useState } from "react";
import "../src/App.css";

import chartData from "../data/chart-data" 
import clsx from "clsx";

function ChartSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const TOTAL_AMOUNT = 478.33;
  const TOTAL_HEIGHT_OF_DAYS = 
    chartData.reduce((total, data) => total + data.height, 0); 

  const highestHeight = Math.max(...chartData.map(data => data.height));
  const highestHeightIndex = chartData.findIndex(data => data.height === highestHeight);

  const dayElements = chartData.map((data, index) => {
    const styles = {
      height: `${data.height}px`
    };
    const isHighest = index === highestHeightIndex; 
    const isHovered = hoveredIndex === index;
    const className = clsx("day-block", {
      ["day-block--highest"] : isHighest,
      ["day-block--hovered"] : isHovered
    });

    return (
      <div className="day-container" key={index}>
        { 
          isHovered ? 
            <div className="day-amount">
            ${((data.height / TOTAL_HEIGHT_OF_DAYS) * TOTAL_AMOUNT).toFixed(2)}
            </div>  : null
        }
        { 
          <div  
            className={className} 
            style={styles}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}>
          </div> 
        }
      </div>
    );
  });


  return (
    <section className="chart-section">
      <h2 className="chart-title">Spending - Last 7 days</h2>
      <section className="chart">
        {dayElements}
      </section>
      <section className="chart-footer">
        <p>Total this month <br/> <strong>${TOTAL_AMOUNT.toFixed(2)}</strong></p>
        <p>+2.4% <br/> <small>from last month</small></p>
      </section>
    </section>
  );
}

export default ChartSection;
