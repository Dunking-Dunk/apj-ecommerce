import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Styled from 'styled-components'

const data = [
  { name: "January", Total: 1000 },
  { name: "February", Total: 1100 },
  { name: "March", Total: 1200 },
  { name: "April", Total: 1300 },
  { name: "May", Total: 1250 },
  { name: "June", Total: 1300 },
];

const Chart = ({ aspect, title }) => {
  return (
    <ChartContainer >
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const ChartContainer = Styled.div`
      flex: 4;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 10px;
  color: gray;
`

const Title = Styled.h1`
margin-bottom: 20px;
text-transform: uppercase;
`


export default Chart;
