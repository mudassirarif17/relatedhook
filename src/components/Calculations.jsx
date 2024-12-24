import React , {useState , useMemo} from 'react'

const Calculations = () => {

    const expensiveCalculations = (num) => {
        console.time();
        for(let i=0; i< 1000000000; i++){
            num += 1;
        }
        console.timeEnd();
        return num;
    }

    const [count , setCount] = useState(0);
    const [todos , setTodos] = useState([]);
    // const calc = expensiveCalculations(count)
    const calc = useMemo(()=>expensiveCalculations(count) , [count])

    const increment = () => {
        setCount((c)=> c+1)
    }

    const addTodo = () => {
        setTodos((t)=>[...t , "New Todo"])
    }



  return (
    <div>
        <h2>My Todos</h2>
        {
            todos.map((data , index)=>(
                <p key={index}>{data}</p>
            ))
        }
        <button onClick={addTodo}>Add Todo</button>
        <hr />
        <div>
            Count : {count}
            <button onClick={increment}> + </button>
            <h2>Expensive Cal : </h2>
            {calc}
        </div>
    </div>
  )
}

export default Calculations