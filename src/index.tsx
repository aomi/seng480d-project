import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Profile } from './components/Profile';
import { Ministers } from './components/Ministers';
import { Constituencies } from './components/Constituencies';
import { Data } from './components/Data';
import { PartiesVisualization } from './components/Parties';
import { PolygonsExample } from './examples/polygons';
import { BarStackExample } from './examples/BarStackExample';
import { Example } from './examples/PiesExample';
import { BrushChartExample } from './examples/BrushExample';
import { Spending } from './components/Spending';

const theme = extendTheme({});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/mp" element={<Ministers />} />
          <Route path="/mp/:name" element={<Profile />} />
          <Route path="/constituencies" element={<Constituencies />} />
          <Route path="/data" element={<Data />} />
          <Route
            path="/parties"
            element={<PartiesVisualization width={500} height={1200} />}
          />
          {/* Examples */}
          <Route
            path="/examples/polygons"
            element={<PolygonsExample width={500} height={1200} />}
          />
          <Route
            path="/examples/barstack"
            element={<BarStackExample width={500} height={500} />}
          />
          <Route
            path="/examples/pie"
            element={<Example height={500} width={1500} />}
          />
          <Route
            path="/examples/brush"
            element={<BrushChartExample height={700} width={1500} />}
          />
          <Route path="/vis/spending" element={<Spending />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
