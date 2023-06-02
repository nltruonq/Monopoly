import { useState } from "react"
import axios from "axios";

function SearchFriend() {
    const [value, setValue] = useState("")
    const [list,setList]=useState([])
    const handleClickSearch = () => {
        axios.get(`${process.env.REACT_APP_SERVER_API}/api/user/search-friend/${value}`, {
            headers: {
                ContentType: "application/json"
            }
        })
            .then(res => {
                console.log(res.data)
                setList(res.data.listPropose)
            })
            .catch(error => {
                console.log(error)
            })
        // Perform login logic here

        // Reset form fields
        setValue("")

    }
    return (
        <>
            hello
            <input type="text" value={value} onChange={(e) => {
                setValue(e.target.value)
            }}></input>
            <div onClick={handleClickSearch}>Tìm</div>

            <div>
                {
                    list.map((user,index)=>{
                        return(
                            <div key ={index}>
                                {user?.username}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SearchFriend