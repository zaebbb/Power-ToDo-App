import React, {useRef} from 'react';
import addIMG from "./images/plus.png"
import "./inputField.css"

interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void
}

const InputField:React.FC<Props> = ({todo, setTodo, handleAdd}:Props) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <form className="input" onSubmit={e => {
            handleAdd(e)
            inputRef.current?.blur()
        }}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Введите название задачи"
                className="input__box"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button className={"input__submit"}>
                <img src={addIMG} alt=""/>
            </button>
        </form>
    );
};

export default InputField;
