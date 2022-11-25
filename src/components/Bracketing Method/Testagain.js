import { useState } from "react";
import{Col,Container,Row,Table} from "react-bootstrap";
import { Alert } from 'antd';

const Testagain=()=>{
    const[X,setX] = useState([]);
    const[N,setN] = useState(0);
    const[Ans,setAns] = useState();
    const [showAlert, setShowAlert] = useState(false);

    const e =(even)=>{
        if(even.target.value<0){
            setShowAlert(true);
        }else{
            setShowAlert(false);
            setN(even.target.value);
            setX(new Array(parseInt(even.target.value)).fill(0));
        }
    }

    const fx=()=>{
        setAns(X);
    }
    
    return(
        <Container>
            {showAlert&&
            <Alert type='error'
            message='error'
            description='cannot input less than 0'
            closable
            />

            }<Row>
                <Col>
                
                </Col>  
                <Col>
                <input type="number" id="X" value={N} onChange={e}></input>
                </Col>
            </Row>
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
                                <td>{(index+1)*2}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
        </Container>

    )
}

export default Testagain