import { useReducer } from 'react';
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
    useRef,
    useMemo,
} from 'react';

function Test() {

    const [sources, setSources] = useState([])

    const nameRef = useRef()

    const [source, setSource] = useState({ name: '', sale: 0 })


    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/comments?_page=1")
            .then(res => {
                let total = res.headers.get('X-Total-Count');
                console.log(res, total);
                return res.json()
            })
            .then(data => {
                console.log(data);
            })

    }, [])


    const handleSubmit = () => {
        setSources([...sources, source])
        setSource({ name: '', sale: 0 })
        nameRef.current.focus()

    }

    const total = useMemo(() => {
        console.log("cal");
        return sources.reduce((prev, current) => prev + current.sale, 0)
    }, [sources])

    const listName = sources.map((source, index) => <li key={index}>{source.name} - {source.sale}</li>)

    const reducer = (state, action) => {

        console.log(action, state);
        switch (action) {
            case 1:
                return { count: state.count + 1 }
            case 2:
                return { count: state.count - 1 }

            default:
                throw new Error('Chua xu ly!')
        }
    }
    const [state, dispatch] = useReducer(reducer, { count: 0 })

    const { count } = state

    return (
        <div>
            <h1>{count}</h1>
            <button type="button" onClick={() => dispatch(1)}>Increment</button>
            <button type="button" onClick={() => dispatch(2)}>Deincrement</button>
            <form >
                <label>
                    <span>Name</span>
                    <input
                        ref={nameRef}
                        type="text"
                        className="name"
                        value={source.name}
                        onChange={event => setSource(prev => ({ ...prev, name: event.target.value }))} />
                </label>
                <label>
                    <span>Sale</span>
                    <input
                        type="number"
                        max={12}
                        min={5}
                        className="sale"
                        value={source.sale}
                        onChange={event => setSource(prev => ({ ...prev, sale: parseInt(event.target.value) }))} />
                </label>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn_submit"
                >
                    Send
                </button>
            </form>

            <ul >
                {listName}
            </ul>
            <h1>{`Total: ${total}`}</h1>
        </div>
    )
}

export default Test