import { StepHeaderTypes } from "../../types";

export const StepHeader = ({ title, description }: StepHeaderTypes) => (
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl text-[#333333]'>{title}</h1>
        <p className='mt-5 w-[100%] text-center'>{description}</p>
    </div>
);
