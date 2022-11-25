import { useState } from "react";
import { Button, Container, Table, Row, Col } from "react-bootstrap"

const Marix = () => {

    const [N,setN] = useState(0);
    const [R,setR] = useState(0);
    const [Matrix1,setMatrix1] = useState([]);
    const [Matrix2,setMatrix2] = useState([]);

    const [Ans, setAns] = useState([]);
    const [AnsPlus, setAnsPlus] = useState([]);
    const [AnsSub, setAnsSub] = useState([]);
    const [AnsMulti, setAnsMulti] = useState([]);
    const [Tables,setTable] = useState([]);

    const fill2DimensionsArray = (arr, rows, columns) => {
        for (var i = 0; i < rows; i++) {
            arr.push([0])
            for (var j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
    }
    const plus=(a, b)=>{
        var sum;
        var c = [];
        fill2DimensionsArray(c, N, N);
        for(var i=0;i<N;i++){
            for(var j=0;j<N;j++){
                c[i][j] = a[i][j]+b[i][j];
            }
        }
        return c;
    }
    const calculateplus = () =>{
        setAnsMulti([]);
        setAnsSub([]);
        var a = [];
        fill2DimensionsArray(a, N, N);
        for(var i=0;i<N;i++){
            for(var j=0;j<N;j++){
                a[i][j]=parseInt(document.getElementById("a"+i+j).value);
            }
        }
        console.log(a);
        var b = [];
        fill2DimensionsArray(b, R, R);
        for(var i=0;i<N;i++){
            for(var j=0;j<N;j++){
                b[i][j]=parseInt(document.getElementById("b"+i+j).value);
            }
        }
        console.log(b);
        setAnsPlus(plus(a,b));        
    }

    const sub=(a, b)=>{
        var sum;
        var c = [];
        fill2DimensionsArray(c, N, N);
        for(var i=0;i<N;i++){
            for(var j=0;j<N;j++){
                c[i][j] = a[i][j]-b[i][j];
            }
        }
        return c;
    }

    const calculatesubtract = () =>{
        setAnsPlus([]);
        setAnsMulti([]);
        var a = [];
        fill2DimensionsArray(a, N, N);
        for(var i=0;i<N;i++){
            for(var j=0;j<N;j++){
                a[i][j]=parseInt(document.getElementById("a"+i+j).value);
            }
        }
        console.log(a);
        var b = [];
        fill2DimensionsArray(b, R, R);
        for(var i=0;i<N;i++){
            for(var j=0;j<N;j++){
                b[i][j]=parseInt(document.getElementById("b"+i+j).value);
            }
        }
        console.log(b);
        setAnsSub(sub(a,b));        
    }

    const multiply=(a, b)=>{
        var sum;
        var c = [];
        fill2DimensionsArray(c, N, R);
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < R; j++) {
                for (var k = 0; k < N; k++)
                    c[i][j] += a[i][k] * b[k][j];
            }
        } console.log(c)
        return c;
    }

    const calculatemultiply = () =>{
        setAnsPlus([]);
        setAnsSub([]);
        var a = [];
        fill2DimensionsArray(a, N, N);
        for(var i=0;i<N;i++){
            for(var j=0;j<N;j++){
                a[i][j]=parseInt(document.getElementById("a"+i+j).value);
            }
        }
        console.log(a);
        var b = [];
        fill2DimensionsArray(b, R, R);
        for(var i=0;i<N;i++){
            for(var j=0;j<N;j++){
                b[i][j]=parseInt(document.getElementById("b"+i+j).value);
            }
        }
        console.log(b);
        setAnsMulti(multiply(a,b));        
    }
    

    return(
        <Container>
            <Row>
                <Col>
                <h1>input A</h1>
            <input type="number" id="N" value={N} onChange={e=>{
                setN(parseInt(e.target.value));
                setMatrix1(new Array(parseInt(e.target.value)).fill( new Array(parseInt(e.target.value)).fill(0)))
                }}>
             </input>
                </Col>
                <Col>
                <h2>input B</h2>
             <input type="number" id="R" value={R} onChange={e=>{
                setR(parseInt(e.target.value));
                setMatrix2(new Array(parseInt(e.target.value)).fill( new Array(parseInt(e.target.value)).fill(0)))
                }}>
             </input>
                </Col>
            </Row>
            
            
                <Row>
                    <Col>
                    {Matrix1.map((element,index)=>{
                    var i = index; 
                    return(
                        <Table>
                            <tr key={i}>
                            {Matrix1[i].map((e,index)=>{
                            return(
                                <td key={""+i+index}>
                                    <h1>a{i}{index}</h1>
                                    <input id={"a"+i+index}/>
                                </td>
                            )
                            })}
                          
                            </tr>
                        </Table>
                    )
                })}
                    </Col>
                    <Col>
                    {Matrix2.map((element,index)=>{
                    var i = index; 
                    return(
                        <Table>
                            <tr key={i}>
                            {Matrix2[i].map((e,index)=>{
                            return(
                                <td key={""+i+index}>
                                    <h1>b{i}{index}</h1>
                                    <input id={"b"+i+index}/>
                                </td>
                            )
                            })}
                            </tr>
                        </Table>
                    )
                })}
                    </Col>
                </Row>

                <Table striped bordered hover variant="light">
                <tbody>
            {AnsPlus.map((element,index)=>{
                    var i = index; 
                    return(
                        
                            <tr key={i}>
                            {AnsPlus[i].map((e,index)=>{
                            return(
                                <td key={""+i+index}>
                                    {e}
                                </td>
                            )
                            })}
                            </tr>
                        
                    )
                })}

            {AnsSub.map((element,index)=>{
                    var i = index; 
                    return(
                        
                            <tr key={i}>
                            {AnsSub[i].map((e,index)=>{
                            return(
                                <td key={""+i+index}>
                                    {e}
                                </td>
                            )
                            })}
                            </tr>
                        
                    )
                })}

            {AnsMulti.map((element,index)=>{
                    var i = index; 
                    return(

                            <tr key={i}>
                            {AnsMulti[i].map((e,index)=>{
                            return(
                                <td key={""+i+index}>
                                    {e}
                                </td>
                            )
                            })}
                            </tr>
                    )
                })}
                
                </tbody>
                </Table>

                <Row>
                    <Col>
                     <Button variant="dark" onClick={calculateplus}>Plus</Button>
                    </Col>
                    <Col>
                     <Button variant="dark" onClick={calculatesubtract}>Subtract</Button>
                    </Col>
                    <Col>
                     <Button variant="dark" onClick={calculatemultiply}>Multiply</Button>
                    </Col>
                </Row>

        </Container>
    )
}

export default Marix