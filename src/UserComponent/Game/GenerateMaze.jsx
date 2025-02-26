import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import './GenerateMaze.css';

export default function GenerateMaze() {
    // const [MazeWidth, setMazeWidth] = useState(7);
    // const [MazeHeight, setMazeHeight] = useState(7);
    const [MazeWidth, setMazeWidth] = useState(45);
    const [MazeHeight, setMazeHeight] = useState(45);
    const [Maze, setMaze] = useState(Array(MazeHeight).fill(1).map(() => Array(MazeWidth).fill(1)));

    const [Path, setPath] = useState([[0, 0]]);
    const [Stack, setStack] = useState([]);
    const [Refresh, setRefresh] = useState(0);

    useEffect(() => {
        const ResetMaze = Array(MazeHeight).fill(1).map(() => Array(MazeWidth).fill(1));
        setMaze(ResetMaze);
        setPath([]);
        setStack([]);
    }, [Refresh, MazeWidth, MazeHeight]);



    //generateMazeDFS(0, 0, [0, 0])
    const generateMazeDFS = async (row, col, RandomDirection) => {

        const NewMaze = [...Maze];

        let NewRow = null;
        let NewCol = null;
        const Directions = [[2, 0], [0, 2], [-2, 0], [0, -2]];
        let SubDirections = Directions;

        do {
            SubDirections = SubDirections.filter(dir => !(dir[0] === RandomDirection[0] && dir[1] === RandomDirection[1]));
            // Khi hết đường đi thì dừng lại
            if (SubDirections.length === 0) return;

            RandomDirection = SubDirections[Math.floor(Math.random() * SubDirections.length)];
            NewRow = row + RandomDirection[0];
            NewCol = col + RandomDirection[1];
        } while (NewRow < 0 || NewRow >= Maze.length || NewCol < 0 || NewCol >= Maze[0].length || NewMaze[NewRow][NewCol] !== 1)

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(10);

        NewMaze[row][col] = 0;
        NewMaze[NewRow][NewCol] = 0;
        NewMaze[(row + NewRow) / 2][(col + NewCol) / 2] = 0;
        setMaze(NewMaze);

        await generateMazeDFS(NewRow, NewCol, [-RandomDirection[0], -RandomDirection[1]]);
        await generateMazeDFS(NewRow, NewCol, [-RandomDirection[0], -RandomDirection[1]]);
        await generateMazeDFS(NewRow, NewCol, [-RandomDirection[0], -RandomDirection[1]]);

        console.log('generateMazeDFS success');
    }

    //generateMazePRIM(0, 0, [])
    const generateMazePRIM = async (row, col, Stack) => {

        //Đánh dấu ô đầu tiên được chọn
        //Đưa các cạnh (Vector) có thế đi xung quanh nó vào Stack
        //Random phần tử trong Stack
        //Đánh dấu ô được chọn và tiếp tục

        const NewMaze = [...Maze];

        let NewRow = null;
        let NewCol = null;

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(10);

        NewMaze[row][col] = 0;

        const Directions = [[2, 0], [0, 2], [-2, 0], [0, -2]];

        //Loại bỏ những cạnh "có thể đi tới ô này"
        for (let Direction of Directions) {
            const NewRow = row + Direction[0];
            const NewCol = col + Direction[1];
            if (NewRow >= 0 && NewRow < Maze.length && NewCol >= 0 && NewCol < Maze[0].length && NewMaze[NewRow][NewCol] !== 1) {
                Stack = Stack.filter(stack => !(stack[0] === NewRow && stack[1] === NewCol && stack[2] === row && stack[3] === col))
            }
        }

        //Thêm những cạnh mà "ô này có thể đi tới" vào Stack
        for (let Direction of Directions) {
            const NewRow = row + Direction[0];
            const NewCol = col + Direction[1];
            if (NewRow >= 0 && NewRow < Maze.length && NewCol >= 0 && NewCol < Maze[0].length && NewMaze[NewRow][NewCol] === 1) {
                Stack = [...Stack, [row, col, NewRow, NewCol]];
            }
        }

        if (Stack.length === 0) return;

        //Chọn bất kỳ một ô "có thể đi tới" để tiếp tục
        let NextCell = Stack[Math.floor(Math.random() * Stack.length)];
        row = NextCell[0];
        col = NextCell[1];
        NewRow = NextCell[2];
        NewCol = NextCell[3];

        NewMaze[NewRow][NewCol] = 0;
        NewMaze[(row + NewRow) / 2][(col + NewCol) / 2] = 0;
        setMaze(NewMaze);

        await generateMazePRIM(NewRow, NewCol, Stack);

        console.log('generateMazePRIM success');
    }

    //generateMazeKRUSKAL([])
    const generateMazeKRUSKAL = (Stack) => {

        //Chọn ra 2 tọa độ bất kỳ
        //Kiểm tra xem chúng có kết nối với nhau chưa
        //Nếu chưa thì kết nối, nếu rồi thì return

        let NewMaze = Maze.map((row, index_row) => row.map((cell, index_col) => index_row * row.length + index_col + 4));

        for (let i = 0; i < Maze.length; i = i + 2) {
            for (let j = 0; j < Maze[i].length; j = j + 2) {
                if (j + 2 < Maze[i].length) Stack = [...Stack, [i, j, i, j + 2]];
                if (i + 2 < Maze.length) Stack = [...Stack, [i, j, i + 2, j]];
            }
        }

        const growRandomEdge = async (NewMaze, Stack, BecomeZero) => {

            if (Stack.length === 0) {
                setMaze(NewMaze.map(row => row.map(cell => BecomeZero.some(becomeZero => becomeZero[0] === cell) ? 0 : 1)));
                return;
            }

            let RandomEdge = Stack[Math.floor(Math.random() * Stack.length)];
            if (NewMaze[RandomEdge[0]][RandomEdge[1]] !== NewMaze[RandomEdge[2]][RandomEdge[3]]) {
                const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
                await sleep(10);
                // NewMaze[RandomEdge[0]][RandomEdge[1]] = 0;
                // NewMaze[RandomEdge[2]][RandomEdge[3]] = 0;
                // NewMaze[RandomEdge[2]][RandomEdge[3]] = NewMaze[RandomEdge[0]][RandomEdge[1]];
                NewMaze = NewMaze.map(row => row.map(cell => cell === NewMaze[RandomEdge[2]][RandomEdge[3]] ? NewMaze[RandomEdge[0]][RandomEdge[1]] : cell));
                NewMaze[(RandomEdge[0] + RandomEdge[2]) / 2][(RandomEdge[1] + RandomEdge[3]) / 2] = NewMaze[RandomEdge[0]][RandomEdge[1]];

                BecomeZero = [...BecomeZero, [NewMaze[RandomEdge[0]][RandomEdge[1]]]];
                setMaze(NewMaze.map(row => row.map(cell => BecomeZero.some(becomeZero => becomeZero[0] === cell) ? 0 : cell)));
            }

            Stack = Stack.filter(stack => stack !== RandomEdge);

            await growRandomEdge(NewMaze, Stack, BecomeZero);
        }

        growRandomEdge(NewMaze, Stack, []);

        console.log('generateMazeKRUSKAL success');
    }

    //generateMazeELLER([])
    const generateMazeELLER = (Stack) => {

    }

    const handleEditingMaze = (e) => {
        e.preventDefault();
    }

    return (
        <div className='generatemaze-container'>
            <div className='header'>
                <h1><b>Generate Maze</b></h1>
            </div>

            <div className='content'>
                <Table bordered
                    className='no-wrap align-middle table'
                // style={{ '--table-width': 10, }}
                >
                    <tbody>
                        {Maze.map((row, index_row) => (
                            <tr key={index_row}>
                                {row.map((cell, index_col) => (
                                    <td key={index_col}
                                        style={{
                                            backgroundColor: cell === 2 ?
                                                '#dc3545'
                                                :
                                                (cell === 3 ?
                                                    '#ffc107'
                                                    :
                                                    (cell === 0 ?
                                                        '#64afff'
                                                        :
                                                        '#007bff'
                                                    )
                                                ),
                                        }}
                                    >
                                        {/* <p>{Maze[index_row][index_col]}</p> */}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Form>
                <div className='width-height-control'>
                    <Button onClick={() => { if (MazeWidth >= 10) setMazeWidth(MazeWidth - 10) }} className='btn'>- 10</Button>
                    <Button onClick={() => { if (MazeWidth > 0) setMazeWidth(MazeWidth - 1) }} className='btn'>
                        <i className='fa-solid fa-minus'></i>
                    </Button>
                    <Form.Group controlId='mazewidth' className='form-group'>
                        <Form.Control type='text' min={0} max={100} value={MazeWidth} placeholder='Maze Width' readOnly />
                    </Form.Group>
                    <Button onClick={() => { if (MazeWidth < 100) setMazeWidth(MazeWidth + 1) }} className='btn'>
                        <i className='fa-solid fa-plus'></i>
                    </Button>
                    <Button onClick={() => { if (MazeWidth <= 90) setMazeWidth(MazeWidth + 10) }} className='btn'>+ 10</Button>
                </div>

                <div className='width-height-control'>
                    <Button onClick={() => { if (MazeHeight >= 10) setMazeHeight(MazeHeight - 10) }} className='btn'>- 10</Button>
                    <Button onClick={() => { if (MazeHeight > 0) setMazeHeight(MazeHeight - 1) }} className='btn'>
                        <i className='fa-solid fa-minus'></i>
                    </Button>
                    <Form.Group controlId='mazeheight' className='form-group'>
                        <Form.Control type='text' min={0} max={100} value={MazeHeight} placeholder='Maze Height' readOnly />
                    </Form.Group>
                    <Button onClick={() => { if (MazeHeight < 100) setMazeHeight(MazeHeight + 1) }} className='btn'>
                        <i className='fa-solid fa-plus'></i>
                    </Button>
                    <Button onClick={() => { if (MazeHeight <= 90) setMazeHeight(MazeHeight + 10) }} className='btn'>+ 10</Button>
                </div>
            </Form>
            <Button onClick={() => generateMazeDFS(0, 0, [0, 0])} className='btn btn-generate'>GENERATE DFS</Button>
            <Button onClick={() => generateMazePRIM(0, 0, [])} className='btn btn-generate'>GENERATE PRIM</Button>
            <Button onClick={() => generateMazeKRUSKAL([])} className='btn btn-generate'>GENERATE KRUSKAL</Button>
            <Button onClick={() => generateMazeELLER([])} className='btn btn-generate'>GENERATE ELLER</Button>
            <Button onClick={() => setRefresh(Refresh + 1)} className='btn btn-reset'>Refresh</Button>

            <pre>{JSON.stringify(Maze, null, 0).replace(/,\n/g, ',').replace(/],/g, '],\n')}</pre>
        </div>
    )
}
