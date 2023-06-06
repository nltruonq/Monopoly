import { useState } from "react"
import axios from "axios";

import Button from '@mui/material/Button';

import styles from "./SearchFriend.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SearchFriend() {
    const [value, setValue] = useState("")
    const [list, setList] = useState([])
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
            <div className={cx("container")}>
                <div className={cx("form")}>
                    <div className={cx("input-form")}>

                        <input type="text" value={value} onChange={(e) => {
                            setValue(e.target.value)
                        }}></input>

                    </div>
                    <div className="btn-search">
                        <Button onClick={handleClickSearch} variant="outlined" >
                            Search
                        </Button>
                    </div>

                </div>

                <div className={cx("list-friends-search")}>
                    {
                        list.map((user, index) => {
                            return (
                                <div className={cx("friend")} key={index}>
                                    {user?.username}
                                </div>
                            )
                        })
                    }
                </div>
            </div >
        </>
    )
}

export default SearchFriend