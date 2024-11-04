import { Outlet } from "react-router-dom"
import Container from "../../components/Container"

function PageBase() {
    return (
        <main>
            <Container>
                <Outlet></Outlet>
            </Container>
        </main>
    )
}

export default PageBase