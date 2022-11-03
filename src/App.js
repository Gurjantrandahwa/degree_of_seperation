import './App.css';
import {
    Button,
    TextField, Avatar, Box, Typography, FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
import {useState} from "react";
import {names, uniqueNamesGenerator} from 'unique-names-generator';

const config = {
    dictionaries: [names]
}

function App() {
    const [findConnection, setFindConnection] = useState([])
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

    console.log('sammer TO Bhaskar:', getConnections('sameer', 'bhaskar', connections))
    console.log('Kamalnath to Bhaskar:', getConnections('kamalnath', 'bhaskar', connections))
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
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (e.target["new_friend"].value) {
                                let temp_friends = [...connections];
                                temp_friends[index].friends.push(e.target["new_friend"].value)
                                setConnections(temp_friends);
                            }
                        }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Choose New Friend</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Choose New Friend"
                                    name="new_friend"
                                >
                                    {
                                        connections.filter(value1 => value1.name !== value.name).filter(value1 => !value.friends.includes(value1.name)).map(value1 => {
                                            return <MenuItem key={value1.name}
                                                             value={value1.name}>{value1.name}</MenuItem>
                                        })
                                    }
                                    {
                                        connections.filter(value1 => value1.name !== value.name).filter(value1 => !value.friends.includes(value1.name)).length === 0 &&
                                        <MenuItem sx={{
                                            color: "red"
                                        }}
                                                  value="" disabled>No Friends available</MenuItem>
                                    }
                                </Select>
                            </FormControl>
                            <Button type={"submit"}>
                                Add Friend
                            </Button>
                        </form>

                    </Box>
                })
            }
            <Button
                className={"add-people-btn"}
                onClick={() => {
                    let temp_connections = [...connections];
                    let name = uniqueNamesGenerator(config);
                    if (!temp_connections.find(value => {
                        return value.name === name
                    })) {
                        temp_connections.push({
                            name: uniqueNamesGenerator(config),
                            friends: []
                        });
                        setConnections(temp_connections);
                    }

                }}>
                Add People
            </Button>
        </div>
        <div className={"connections"}>
            <form onSubmit={(e) => {
                e.preventDefault()
                
            }
            }>
                <div>
                    <TextField
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
                    type={"submit"}
                    variant={"contained"}>
                    Submit
                </Button>


            </form>

            <div className={"avatar-wrapper"}>

                <Avatar
                    sx={{
                        bgcolor: "purple",
                        color: "white",


                    }}> </Avatar>
            </div>
        </div>
    </div>
}

export default App;
