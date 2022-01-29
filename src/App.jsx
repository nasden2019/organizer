import React from 'react';
import shortid from 'shortid'
// import { useDispatch, useSelector } from 'react-redux';
// import { addAction } from './redux/actions';

function App() {

  // initial task
  const [task, setTask] = React.useState('');

  // new tasks
  const [tasks, setTasks] = React.useState([]);

  // allows us edit item in the form 
  const [editionMode, setEditionMode] = React.useState(false);

  // what is edited in the form and return it edited 
  const [id, setId] = React.useState('');

  // error message
  const [error, setError] = React.useState(null)

  // search tasks
  const [filtering, setFiltering] = React.useState('')

  // Redux
  // const dispatch = useDispatch();
  // const state = useSelector(state => state);

  // console.log(state)



  // ----- to keep data store, using LocalStorage-----
  React.useEffect(() => {
    const json = localStorage.getItem("tasks");
    const loadedTasks = JSON.parse(json);
    if (loadedTasks) {
      setTasks(loadedTasks);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);
  }, [tasks]);



  // Add Items
  const addTask = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      console.log('Task input is empty'); // let know if input its empty
      setError('Write something, please :)') // grab the error
      return
    }
    // console.log(task) nothing shouldn't show up in the console, if input was filled up 



    // redux
    // dispatch(addAction({ task: { id: shortid.generate(), taskName: task } }))


    setTasks([
      ...tasks,
      { id: shortid.generate(), taskName: task } //add new task, without deleting the rest
    ]);

    setTask('') // clear input
    setError(null)
  }

  // delete tasks
  const deleteTask = id => { // select task by id
    const filterArray = tasks.filter(item => item.id !== id) // and remove it by using filter method
    setTasks(filterArray);
  }


  // edit button
  const edit = item => {
    setEditionMode(true) // unable edition mode
    setTask(item.taskName) // send task to the form to be edited
    setId(item.id); // select id
    setError(null) // no error
  }


  // completed task
  const completedTask = (id) => {
    const filterArray = tasks.map(item => {
      if (item.id === id) {
        item.completed = true
      }
      return item
    })
    setTasks(filterArray);
  }

  // edit form
  const editTask = (e) => {
    e.preventDefault();

    if (!task.trim()) { // trim avoid blank spaces
      console.log('Its empty'); // send message if its not filled
      return
    }

    // if its the one clicked, then return these parameters, if not return the default one 
    const filterArray = tasks.map(
      item => item.id === id ? { id: id, taskName: task } : item
    )

    setTasks(filterArray) // save changes
    setEditionMode(false) // go back to state by fefault 
    setTask('') // clear it
    setId('');
  }


  // search tasks 
  const searchTask = (e) => {
    setFiltering(e.target.value)
  }


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 title">Saal Organizer : )</h1>
      <hr />

      <div className="row">
        <div className="col-md-8 col-sm-4 order-sm-2">
          <h4 className="text-center mt-3">Tasks list</h4>
          <ul className="list-group">

            {

              tasks.length === 0 ? (
                <li className="list-group-item">There are no tasks</li>
              ) : (
                tasks.filter(task => task.taskName.toLowerCase().includes(filtering.toLowerCase()))
                  .map(item => (
                    <li key={item.id} className="list-group-item mb-2">
                      <span className="lead">{item.taskName} x</span>

                      <button
                        className="btn btn-danger btn-sm float-right mx-2"
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </button>

                      <button
                        className="btn btn-warning btn-sm float-right py-1 px-3"
                        onClick={() => edit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-success btn-sm float-right mx-2"
                        onClick={() => completedTask(item.id)}
                      >
                        Completed
                      </button>

                    </li>
                  ))
              )
            }

          </ul>
        </div>

        <div className="col-md-4 col-sm-6 order-sm-1">
          <h4 className="text-center mt-4">
            {
              editionMode ? 'Edit Task' : 'Add Task'
            }
          </h4>
          {/*  ternary operator to switch between edit and add task */}
          <form onSubmit={editionMode ? editTask : addTask}>

            {
              error ? <span className="text-danger my-2">{error}</span> : null
            }

            <input
              onChange={e => setTask(e.target.value)} // grab the value
              type="text" className="form-control mb-2"
              placeholder="What do you gotta do?"
              value={task}
            />

            {
              editionMode ? (
                <button className="btn btn-warning btn-block" type="submit">Edit</button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">Add</button>
              )
            }

          </form>
        </div>
      </div>


      {/* SEARCH TASKS */}
      <div className='row justify-content-center'>

        <div className="col-sm-6">
          {/* <div className="col-sm-8 mx-auto text-center"> */}
          <h4 className='text-center mt-4'>Search Task</h4>
          <input type="text"
            className='form-control'

            onChange={searchTask}
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
