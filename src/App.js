import './App.css';
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography,} from "@mui/material";
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
                friends: ["bhaskar", "sameer"]
            },
            {
                name: "kamalnath",
                friends: ["shanti", "sameer"]
            },
            {
                name: "shanti",
                friends: ["bhaskar", "kamalnath"]
            },
            {
                name: "bhaskar",
                friends: ["aayushi", "shanti"]
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

    const [friendsInGraph, setFriendsInGraph] = useState([]);

    return <div className="main-wrapper">
        <Container className={"wrapper"}>
            <div className="sub-wrapper">
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
                                        let index_of_friend = connections.findIndex(value1 => value1.name === e.target["new_friend"].value)
                                        temp_friends[index_of_friend].friends.push(temp_friends[index].name)
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
                        console.log(e.target["first_person"].value)
                        console.log(e.target["second_person"].value)
                        let graph = getConnections(e.target["first_person"].value, e.target["second_person"].value, connections)

                        console.log(graph)

                        if (graph.length > 0) {
                            graph = graph.sort(function (a, b) {
                                return a.length - b.length;
                            });

                            console.log(graph)
                            setFriendsInGraph(graph[0] || [])
                        }
                    }
                    }>
                        <div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Choose First Person</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Choose First Person"
                                    name="first_person"
                                >
                                    {
                                        connections.map(value1 => {
                                            return <MenuItem key={value1.name}
                                                             value={value1.name}>{value1.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Choose Second Person</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Choose Second Person"
                                    name="second_person"
                                >
                                    {
                                        connections.map(value1 => {
                                            return <MenuItem key={value1.name}
                                                             value={value1.name}>{value1.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <Button
                            type={"submit"}
                            variant={"contained"}>
                            Submit
                        </Button>


                    </form>

                    <div className={"avatar-wrapper"}>

                        {
                            friendsInGraph && friendsInGraph.map(value => {
                                return <div>
                                    {value}
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </Container>
    </div>
}

export default App;

