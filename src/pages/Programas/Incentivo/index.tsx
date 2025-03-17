import { FaArrowRight } from "react-icons/fa";
import { ContentHeader, ContentImage, GradientBottomHeader, GradientOverlay, GradientTopHeader, PromoText, TextContainer } from '../../../components/Header/styles.d';
import { DestaqueTitle, GradientHeaderEnd } from '../../../components/Styles/styles.d';

function Incentivo() {
    return (
        <>
            <ContentHeader>
                <GradientTopHeader></GradientTopHeader>
                <ContentImage>
                    <GradientOverlay>
                    </GradientOverlay>
                </ContentImage>
                <GradientBottomHeader></GradientBottomHeader>
                <TextContainer>
                    <PromoText>
                        <DestaqueTitle className="bg-secondary text-white">Entenda</DestaqueTitle>
                        <div className='flex flex-col'>
                            <span className="text-[24px]">Como funciona <span className='text-[17px]'>o</span></span><span className="text-[34px] mb-10">Programas de Incentivo</span>
                            <p className='text-[17px] font-light text-[#cbcbcb]'>Acesse um sistema <b className='font-bold '>completo</b> para gestão de academias, com <b className='font-bold'>programas de incentivo</b> e treinos personalizados.</p><br />
                            <a href="/cadastro" className='bg-secondary text-[white] p-3 rounded-lg flex flex-row items-center justify-center w-[33%]'>Experimentar agora <FaArrowRight className='ml-2' /></a>
                        </div>
                    </PromoText>
                </TextContainer>
            </ContentHeader>
            <GradientHeaderEnd />

            <section className="py-16">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-8">Programas de Incentivo</h2>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <p className="mb-6">
                            Nossos Programas de Incentivo sÃ£o projetados para oferecer vantagens tanto para os alunos quanto para as academias.
                            Para os alunos, oferecemos descontos em uma ampla gama de produtos parceiros, incluindo acessÃ³rios, suplementos, roupas de treino e muito mais.
                            Estes incentivos ajudam a melhorar a experiÃªncia do aluno, motivando-o a se manter ativo e envolvido com a academia.
                        </p>
                        <p className="mb-6">
                            Para as academias, nossos programas proporcionam descontos em equipamentos e serviÃ§os de fornecedores parceiros, permitindo que vocÃª
                            mantenha suas instalaÃ§Ãµes atualizadas e com custos reduzidos. AlÃ©m disso, nossos sistemas de incentivo incluem estratÃ©gias para recuperaÃ§Ã£o
                            de alunos ausentes, como contatos automatizados e ligaÃ§Ãµes, para evitar o cancelamento de matrÃ­culas e assegurar que os alunos continuem a
                            frequentar as aulas.
                        </p>
                        <p className="mb-6">
                            Nossa missÃ£o Ã© garantir que todos saiam ganhando: alunos motivados e satisfeitos, academias com lucro e fornecedores com aumento nas vendas.
                            Estamos comprometidos em ajudar vocÃª a maximizar o sucesso e a eficiÃªncia do seu negÃ³cio, enquanto oferece aos seus alunos uma experiÃªncia
                            de qualidade.
                        </p>
                        <p>
                            Quer saber mais sobre como nossos Programas de Incentivo podem beneficiar vocÃª e sua academia? Entre em contato conosco hoje e descubra todas
                            as oportunidades disponÃ­veis para impulsionar seu sucesso!
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Incentivo;
