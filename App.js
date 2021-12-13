import React from 'react'
import ToDo_design from './components/pages/ToDo_design'
import { Provider } from "react-redux"
import { configStore } from './components/redux/store'


const App = () => {
  return (
    <>
      <Provider store={configStore}>
        <ToDo_design />
      </Provider>
    </>
  )
}


//store={configStore} ==> دي مباصيلها ال global state ودي زي كونتينر هحط فيه كل الصفحات اللي عاوزاها تشتغل علي الي داتا دي

export default App