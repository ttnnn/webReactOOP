import { Component } from "react"
import { Card, CardGroup, Container,Carousel} from "react-bootstrap"
import Figure from 'react-bootstrap/Figure';

export class Home extends Component {
    render(){
        return(
            <Container>
                <br></br>
                <CardGroup>
                    <Card style={{ width: '50rem' }}>
                    <Card.Body>
                        <Card.Title>REACT BOOTSTRAP</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Get Start</Card.Subtitle>
                        <Card.Link href="/bisection">Bisection</Card.Link>
                        <Card.Link href="/falseposition">FalsePosition</Card.Link>
                        <Card.Link href="/onepoint">OnePoint</Card.Link>
                        <Card.Link href="/newtonraphson">NewtonRaphson</Card.Link>
                        <Card.Link href="/secant">Secant</Card.Link>
                        <Card.Link href="/conjugate">Conjugate</Card.Link>
                        <Card.Link href="/cramer">Cramer</Card.Link>
                        <Card.Link href="/gauss">Gauss</Card.Link>
                        <Card.Link href="/jacobi">Jacobi</Card.Link>
                        <Card.Link href="/seidel">Seidel</Card.Link>
                    </Card.Body>
                    </Card>
                </CardGroup>
             </Container>
    
        ) 
    }
}

function FigureExample() {
    return (
      <Figure>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src="holder.js/171x180"
        />
        <Figure.Caption>
          Nulla vitae elit libero, a pharetra augue mollis interdum.
        </Figure.Caption>
      </Figure>
    );
  }
  
  export default FigureExample;