import './App.css';
import {
    Button,
    TextField, Avatar,
} from "@mui/material";
import AddNames from "./Components/AddFriends/AddNames";

function App() {

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

    return <div className={"wrapper"}>
     <AddNames/>
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
