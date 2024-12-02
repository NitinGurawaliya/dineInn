import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

const LazyLanding = lazy(()=>import("./pages/Landing"))
const LazySignup = lazy(()=>import("./pages/Signup"))
const LazySignin = lazy(()=>import("./pages/Signin"))
const LazyMenuUpload = lazy(()=>import("./components/UploadMenu"))
const LazyMyMenu = lazy(()=>import("./components/MyMenu"))
const LazyQrcode = lazy(()=>import("./components/Qrcode"))
const LazyRestaurantMenu = lazy(()=>import("./components/RestaurantMenu"))

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense>
            <Routes>
              <Route path="/" element={<LazyLanding />} />
              <Route path="/signup" element={<LazySignup />}/>
              <Route path="/signin" element={<LazySignin />}/>
              <Route path="/upload/menu" element={<LazyMenuUpload />} />
              <Route path="/myMenu" element={<LazyMyMenu />} />
              <Route path="/qrCode" element={<LazyQrcode />} />
              <Route path="/menu/:id" element = {<LazyRestaurantMenu />} />
            </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App