import './App.css';
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    TextField, Avatar, Typography,
} from "@mui/material";


function App() {
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

    function connectionsListToGraph(connections) {
        const graph = {}
        for (let {name, friends} of connections) {
            graph[name] = friends
        }
        return graph
    }

    function getConnections(source, target, connections) {
        const graph = connectionsListToGraph(connections)
        const connectionPaths = []

        function findConnections(source, target, path = [source], visited = {}) {
            if (visited[source]) return;
            visited[source] = true;

            for (let friend of graph[source]) {
                if (friend === target) {
                    connectionPaths.push(path.concat(target));
                } else {
                    findConnections(friend, target, path.concat(friend), visited)
                }
            }
        }

        findConnections(source, target);

        return connectionPaths;
    }

    useEffect(() => {
        if (NameValue) {
            const keyword = NameValue;
            if (keyword !== NameValue) {
                const results = connections.filter((user) => {
                    return user.friends.toLowerCase().includes(keyword.toLowerCase());
                });
                setFilterName(results)
            } else {
                setFilterName([]);
            }
        }
    }, [NameValue])

    return <div className={"wrapper"}>
        <div className={"names-wrapper"}>
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

                        {filterName.map((value3, index3) => {
                            return <div key={index3}>
                                <Typography variant={"h5"}>
                                    {value3.friends}
                                </Typography>
                                <Button
                                    onClick={() => {
                                        setConnections([
                                            ...connections,
                                            {
                                                ...value3,

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
        <div className={"connections"}>

            <div>
                <TextField
                    onChange={(e) => {

                    }}

                    variant={"outlined"}
                    type={"text"}
                    label={"Name1"}/>
            </div>
            <div>
                <TextField
                    variant={"outlined"}
                    type={"text"}
                    label={"Name2"}/>
            </div>

            <Button
                variant={"contained"}>
                Submit
            </Button>

            <div className={"avatar-wrapper"}>
                <Avatar
                    sx={{
                        bgcolor: "skyblue",
                        color: "black",
                        width: 80, height: 80,
                        textAlign: "center",
                    }}
                >

                </Avatar>

            </div>

        </div>
    </div>
}

export default App;
