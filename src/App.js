import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./style/common.style.css";
import AppLayout from "./Layout/AppLayout";
import AppRouter from "./routes/AppRouter";
import ChannelService from "./ChannelService";


function App() {
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: "e9460f81-7a6f-442d-8f93-23a70f8e892b",
    },
  );
  return (
    <div>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </div>
  );
}

export default App;