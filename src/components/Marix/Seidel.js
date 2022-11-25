import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";


const Seidel = () => {
    
    const [N, setN] = useState(4);
    const [Ans, setAns] = useState([]);

    const error = (ans0,ans) =>{
        var e = Math.abs(ans0-ans);
        return e
    }
    
    const calSeidel = (x) =>{
        var n = 4;
        var i, j;
        var ans0;
        var ans = [0, 0, 0, 0];
        var xold = [0, 0, 0, 0];
        var er = [100, 100, 100, 100];
        var e = 0.000001;
        var iter = 0;
        while(er[0]>e && er[1]>e && er[2]>e && er[3]>e){
            iter++
            for (i = 0; i < n; i++) {
                ans0 = ans[i];
                ans[i] = x[i][n];
                for (j = 0; j < n; j++) {
                    if(x[i][(j%n+n)%n]!==x[i][i]){
                        ans[i] -= x[i][(j%n+n)%n]*xold[(j%n+n)%n];
                    }
                }
                ans[i] = ans[i]/x[i][i];
                xold[i] = ans[i];
                er[i] = error(ans0,ans[i]);   
            }
        }
        return ans;
    }

    const fill2DimensionsArray = (arr, rows, columns) => {
        for (var i = 0; i < rows; i++) {
            arr.push([0])
            for (var j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
    }

    const [Matrix, setMatrix] = useState([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]]);


    const calculateRoot = () =>{
        var a = [];
        fill2DimensionsArray(a, N, N);
        for(var i = 0; i<N; i++){
            for(var j = 0; j<N+1; j++){
                a[i][j] = parseFloat(document.getElementById(""+i+j).value);
            }
        }
        setAns(calSeidel(a));
    }

    return(
        <Container className="mb-4">
            <h1>Seidel</h1>
                <Container>
                    {Matrix.map((element,index)=>{
                        var i = index;
                        return(
                        <Table>
                            <tr key={i}>
                            {Matrix[index].map((e,index)=>{return(<td key={""+i+index}><h5>{i}{index}</h5><input id={""+i+index}/></td>)})}
                            </tr>
                        </Table>
                        )
                    })}
                </Container>
                <Button className="mb-4" variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                <br></br>
                <h1>Ans =</h1>
                <Table striped bordered hover variant="light">
                    <tbody>
                    <tr>
                    {Ans.map((element,index)=>{
                        return(
                            <td key={index}>X{index+1} = {element}</td>
                        )
                    })}
                    </tr>
                    </tbody>
                </Table>
        </Container>
    )
}

export default Seidel