import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from "./Components/Layouts";
import Loading from './Components/Loading';
import { publicRoutes, privateRoutes } from "./Routers";

function App() {
  return (
    <Router>
      <div className="App">
        <Loading />
        <Routes>
          {
            publicRoutes.map((route, index) => {
               const Page = route.component;
               let Layout = DefaultLayout;
               if(route.layout) {
                  Layout = route.layout;
               }
               else if(route.layout === null) {
                  Layout = Fragment;
               }

               return (
                  <Route
                    key = {index}
                    path = {route.path}
                    element = {
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
               )
            })
          }
          {
            privateRoutes.map((route, index) => {
              return (
                <Route
                    key = {index}
                    path = {route.path}
                    element = {
                      <Layout>
                        <Page />
                      </Layout>
                    }
                />
              )
            })
          }
        </Routes>
      </div>
    </Router>
  )
}

export default App;
