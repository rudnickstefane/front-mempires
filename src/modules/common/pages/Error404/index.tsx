import { FaArrowLeft } from "react-icons/fa";
import { Title } from './styles.d';

function Page404() {

    return (
        <>
            <Title className="mt-10">Oops!</Title>
            <div className="flex flex-col items-center">
                <span className='text-3xl mt-5 text-black'>Erro 404</span>
                <p className='text-black'>Algo saiu errado!</p>
                <br />
                <p>A página não pode ser encontrada.</p>
                <a href="/" className="mt-5 py-3 px-5 bg-secondary rounded-lg text-white flex flex-row items-center"><FaArrowLeft className="mr-2" />
                    Voltar</a>
            </div>
        </>
    )
}

export default Page404