
import React from 'react'
import  useRouteCostom  from './routes/useRouteCostom'
import { message } from 'antd';

export const NotificationContext = React.createContext();
function App() {


  const [messageApi, contextHolder] = message.useMessage();
  const handleNotification = (status, content) => {
    messageApi.open({
      type: status,
      content,
    });
  };
  const routes = useRouteCostom();
  return (
    <>
    <NotificationContext.Provider
        value={{
          abc: "Linh đa",
          handleNotification,
        }}
      >
        {contextHolder}
        {routes}
      </NotificationContext.Provider>
    </>
   
  )
}

export default App
