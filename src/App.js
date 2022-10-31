import './App.css';
import {useState} from "react";
import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    TextField, Avatar
} from "@mui/material";


function App() {
    const [name, setName] = useState('');
    const [nameValue1, setNameValue1] = useState('')
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setName(event.target.value);
    };


    let connections = [
        {
            "name": "sameer",
            "friends": ["aayushi", "kamalnath"]
        },
        {
            "name": "aayushi",
            "friends": ["bhaskar"]
        },
        {
            "name": "kamalnath",
            "friends": ["shanti"]
        },
        {
            "name": "shanti",
            "friends": ["bhaskar"]
        }
    ]

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

    console.log('Sameer to Bhaskar:', getConnections('sameer', 'bhaskar', connections))
    console.log('Kamalnath to Bhaskar:', getConnections('kamalnath', 'bhaskar', connections))

    return <div className={"wrapper"}>
        <div className={"names-wrapper"}>

            <h3>Names</h3>
            <Box sx={{maxWidth: 250}}>
                <FormControl fullWidth>

                    <InputLabel>Name</InputLabel>
                    <Select
                        value={name}
                        label="Name"
                        onChange={handleChange}
                    >
                        <MenuItem value={"sameer"}>sameer</MenuItem>
                        <MenuItem value={"aayushi"}>aayushi</MenuItem>
                        <MenuItem value={"kamalnath"}>kamalnath</MenuItem>
                        <MenuItem value={"shanti"}>shanti</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    onClick={handleClickOpen}>
                    Add Name
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}

                >

                    <DialogContent>
                        <DialogContentText>
                            <TextField

                                type={"text"}
                                variant={"outlined"}/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Add Name
                        </Button>

                    </DialogActions>
                </Dialog>

            </Box>
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
