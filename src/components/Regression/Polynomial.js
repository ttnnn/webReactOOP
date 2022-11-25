import { useState } from "react"
import { Container,Table,Col,Row, Button } from "react-bootstrap"
import { evaluate } from "mathjs";
import 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";

const Polynomial=()=>{
    const[X,setX] = useState([]) ;
    const[N,setN] = useState(0) ;
    const[M,setM] = useState(0) ;
    const[equation,setEquation] = useState("x^2") ;

    const cal=(X)=>{
        var fx , scope ;
        scope={
            X:X,
            x:X,
            y:X,
            Y:X
        }
        fx = evaluate(equation,scope) ;
        return fx;
    }
    const calregression=(X, a)=>{
        var scope, i ;
        var fx =0; 
        for(i=0;i<a.length;i++){
            fx += a[i]*Math.pow(X,i);
        }
        return fx;
    }

     const[restate,setrestate] = useState({labels: X.map((element,index)=>{return index+1;}),
    datasets: [
      {
        label: 'Y',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#000033',
        borderColor: '#000033',
        borderWidth: 2,
        data: X.map((element,index)=>{return cal(index+1);})
      }
    ]
});

const fill2DimensionsArray = (arr, rows, columns) => {
    for (var i = 0; i < rows; i++) {
        arr.push([0])
        for (var j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
}
const diagonalize = (M) => {
    var m = M.length;
    var n = M[0].length;
    for(var k=0; k<Math.min(m,n); ++k) {
      var i_max = findPivot(M, k);
      if (M[i_max, k] === 0)
        throw "matrix is singular";
      swap_rows(M, k, i_max);
      for(var i=k+1; i<m; ++i) {
        var c = M[i][k] / M[k][k];
        for(var j=k+1; j<n; ++j) {
          M[i][j] = M[i][j] - M[k][j] * c;
        }
        M[i][k] = 0;
      }
    }
  }
  
  const findPivot = (M, k) => {
    var i_max = k;
    for(var i=k+1; i<M.length; ++i) {
      if (Math.abs(M[i][k]) > Math.abs(M[i_max][k])) {
        i_max = i;
      }
    }
    return i_max;
  }
  
  const swap_rows = (M, i_max, k) => {
    if (i_max !== k) {
      var temp = M[i_max];
      M[i_max] = M[k];
      M[k] = temp;
    }
  }
  
  const makeM = (a, b) => {
    for(var i=0; i<a.length; ++i) {
      a[i].push(b[i]);
    }
  }
  
  const substitute = (M) => {
    var m = M.length;
    for(var i=m-1; i>=0; --i) {
      var x = M[i][m] / M[i][i];
      for(var j=i-1; j>=0; --j) {
        M[j][m] -= x * M[j][i];
        M[j][i] = 0;
      }
      M[i][m] = x;
      M[i][i] = 1;
    }
  }
  
  const extractX = (M) => {
    var x = [];
    var m = M.length;
    var n = M[0].length;
    for(var i=0; i<m; ++i){
      x.push(M[i][n-1]);
    }
    return x;
  }
  
  const solve = (a, b) => {
    makeM(a,b);
    diagonalize(a);
    substitute(a);
    var x = extractX(a);
    return x;
  }
    const PolynomialRegression = (order) => {
        var i,j,k;
        var data = [];
        var obj={};
        for(i=0;i<N;i++){
            obj = {
                X:i+1,
                Y:cal(i+1),
            }
            data.push(obj);
        }
        var n = data.length;
        var a = [];
        var obj = {};
        fill2DimensionsArray(a, order+1, order+1);
        var b = new Array(order+1).fill(0);
        var sum=0;
        //console.log("order = "+order)
        //console.log(a)
        for(i=0;i<order+1;i++){
            for(k=0;k<=i;k++){
                sum=0;
                var t=i+k;
                for(j=0;j<n;j++){
                    sum+= Math.pow(data[j].X,t);
                }
                //console.log("i="+i+"k="+k+"sum="+sum);
            
                a[i][k] = sum;
                a[k][i] = sum;
            }
            sum=0;
            for(j=0;j<n;j++){
                sum+= data[j].Y*Math.pow(data[j].X,i)
            }
            b[i] = sum;
            //console.log(a);
      //console.log(b);
        }
        var sumY = 0;
        var st = 0;
        var sr = 0;
        var ans = 0;
        var f = solve(a, b);
        sum = 0;
        for(i=0;i<order+1;i++){
            //console.log(ans)
        }
        
        for(i=0;i<n;i++){
            sumY += data[i].Y;
        }
    
        var ym = sumY/n;
    
        for(i=0;i<n;i++){
            var ax = 0;
            for(j=0;j<order+1;j++){
                if(j===0){
                    ax-= f[j];
                }else{
                    ax-= f[j]*Math.pow(data[i].X,j);
                }
            }
            st+= Math.pow((data[i].Y-ym),2);
            sr+= Math.pow((data[i].Y+ax),2)
        }
        var syx = Math.pow((sr/(n-(order+1))),0.5);
        var r2 = (st-sr)/st;
        return f;
    }
    
    
    const e=(even)=>{
        setN(even.target.value);
        setX(new Array(parseInt(even.target.value)).fill(0)) ;
        var A= new Array(parseInt(even.target.value)).fill(0) ;
       
    }

    const click=()=>{
        var a = PolynomialRegression(M);
        console.log("a0 = "+a[0]+" a1 = "+a[1])
        var A= new Array(parseInt(N)).fill(0) ;
        setrestate({labels: A.map((element,index)=>{return index+1;}),
        datasets: [
            {
                label: 'X',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#000000',
                borderColor: '#000000',
                borderWidth: 2,
                data: A.map((element,index)=>{return cal(index+1);})
              },
         {
               label: 'Y',
               fill: false,
               lineTension: 0.5,
               backgroundColor: '#990000',
               borderColor: '#990000',
               borderWidth: 2,
               data: A.map((element,index)=>{return calregression(index+1, a);})
      }
    ]
    })
    }
    
    return(
        <Container>
           <Row>
            <Col>
            <h4>X</h4>
            <input type="number" id="X" value={N} onChange={e} ></input>
            </Col>
            <Col>
            <h4>order</h4>
            <input type="number" id="M" value={M} onChange={e=>{setM(e.target.value)}} ></input>
            </Col>
           </Row>
           <Button onClick={click}>Calculate</Button>
           <Table striped bordered hover variant="light">
                <thead>
                 <tr>
                     <th width="30%">X</th>
                     <th width="30%">Y</th>
                </tr>
                </thead>
                <tbody>
                        {X.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{cal((index+1))}</td>
                            </tr>)
                        })}
                </tbody>
           </Table>
           <Row>
           <Col>
           <Line
                data={restate}
                options={{
                title:{
                    display:true,
                    text:'Test',
                    fontSize:20
                    },
                legend:{
                display:true,
                position:'right'
                }
            }}
            />
           </Col>
           </Row>
           
        </Container>
    )
}

export default Polynomial