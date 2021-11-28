import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Profile } from './components/Profile';
import { Ministers } from './components/Ministers';
import { PartiesVisualization } from './components/Parties';
import { PolygonsExample } from './examples/polygons';
import { BarStackExample } from './examples/BarStackExample';
import { Example } from './examples/PiesExample';
import { BrushChartExample } from './examples/BrushExample';
import { PartySpending } from './components/PartySpending';
import { Covid } from './components/Covid';
import { Distance } from './components/Distance';
import { SpendingByMember } from './components/SpendingByMember';
import { Map } from './components/Map';

const theme = extendTheme({
  colors: {
    travel: '#1a202c',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/mp" element={<Ministers />} />
          <Route path="/mp/:name" element={<Profile />} />
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
          <Route path="/v/spending" element={<SpendingByMember />} />
          <Route path="/v/location" element={<PartySpending />} />
          <Route path="/v/covid19" element={<Covid />} />
          <Route path="/v/distance" element={<Distance />} />

          {/* TESTING */}
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
