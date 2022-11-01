
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    TextField,  Typography,
} from "@mui/material";
export default function AddNames() {
    const [filterName, setFilterName] = useState([])
    const [NameValue, setNameValue] = useState('')
    const [connections, setConnections] = useState(
        [
            {
                name: "sameer",
                friends: ["aayushi", "kamalnath"]
            },
            {
                name: "aayushi",
                friends: ["bhaskar"]
            },
            {
                name: "kamalnath",
                friends: ["shanti"]
            },
            {
                name: "shanti",
                friends: ["bhaskar"]
            }
        ]
    )
    useEffect(() => {
        if (NameValue) {
            const keyword = NameValue;
            if (keyword !== NameValue) {
                const results = connections.filter((user) => {
                    return user.friends.toLowerCase().includes(keyword.toLowerCase())||
                        user.name.toLowerCase().includes(keyword.toLowerCase());
                });
                setFilterName(results)
            } else {
                setFilterName([]);
            }
        }
    }, [NameValue])

    return    <div className={"names-wrapper"}>
            {
                connections.map((value, index) => {
                    return <Box key={index}
                                sx={{
                                    maxWidth: 300,
                                    borderRadius: "10px",
                                    border: "2px solid black",
                                    padding: "20px",
                                    margin: "20px"
                                }}>

                        <Typography variant={"h5"} className={"main-name"}>
                            {value.name}
                        </Typography>

                        <div className={"friends-names"}>
                            {value.friends.map((value1, index1) => {
                                return <Box
                                    key={index1}
                                    sx={{
                                        p: 1,
                                        bgcolor: "purple",
                                        color: "white",
                                        borderRadius: "5px",

                                    }}>

                                    <Typography>
                                        {value1}
                                    </Typography>
                                </Box>
                            })}
                        </div>
                        <TextField
                            variant={"outlined"}
                            type={"search"}
                            value={NameValue}
                            onChange={(event => {
                                setNameValue(event.target.value)
                            })}
                        />

                        {filterName.map((value, index) => {
                            return <div key={index}>
                                <Typography variant={"h5"}>
                                    {value.friends}
                                </Typography>
                                <Button
                                    onClick={() => {
                                        setConnections([
                                            ...connections,
                                            {
                                                ...value,
                                            }
                                        ])
                                        setFilterName([])
                                        setNameValue("")
                                    }}
                                >
                                    Add Name
                                </Button>
                            </div>
                        })}
                    </Box>
                })
            }
    </div>
}