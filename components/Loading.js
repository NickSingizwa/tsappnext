// import {Circle} from "better-react-spinkit" 
import Loader from "../styles/Loading.module.css"
function Loading() {
    return (
        <div>
            <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png" alt="" style={{ marginBottom: 10 }} height={200} />
                    {/* <Circle color="#3CBC28" size={60}/> */}
                    <div className={Loader.loading}>
                        <div className={Loader.loading}>
                            <div className={Loader.loading}>
                                <div className={Loader.loading}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default Loading
