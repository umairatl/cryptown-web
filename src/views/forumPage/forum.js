import { useEffect, useState } from "react"
import axios from "axios";

const ForumPage = () => {
    const [crypto, setCrypto] = useState(null)
    useEffect(() => {
        const fetchCrypto = async () => {
            const response = await axios('https://localhost:5000/api/crypto/cryptoList')
            const json = await response.data
    
            if (response.status === 200) {
                setCrypto(json)
            }
        }
        fetchCrypto()
      }, [])

    return (  
        <div className="forum">
            <h1>FORUM PAGE</h1>
            <h2>{crypto && (<div>{crypto.mssg}</div>)}</h2>
            {/* {crypto && crypto.cryptoList.map(res => <div>{res.name}</div>)} */}
        </div>
    );
}
 
export default ForumPage;