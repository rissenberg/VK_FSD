import React from 'react';
import {MainPage} from "../pages/LandingPage";
import {QueryProvider} from "./providers/QueryProvider";
import {AppRoot, Panel, usePlatform, View} from "@vkontakte/vkui";

function App() {
  const platform = usePlatform();

  return (
    <QueryProvider>
      <AppRoot mode="full">
        <View activePanel="main">
            <Panel id="main">
              <MainPage/>
            </Panel>
        </View>
      </AppRoot>
    </QueryProvider>
  );
}

export default App;
