import {useState} from 'react';
// import "./network.css"
import Graph from "react-graph-vis";
import React from 'react';

const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    }
  };
  
  function randomColor() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  }

function Form(){
  // const [selectedFile, setSelectedFile] = React.useState(null);
  const [isiFile, setIsiFile] = React.useState("");
  const [message, setMessange] = React.useState("");
  const [resStatus, setResStatus] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [namaNode, setNamaNode] = React.useState("");
  const [jmlNode, setJmlNode] = React.useState(0);
  const [relasiMatriks, setRelasiMatriks] = React.useState([]);
  const [initial, setInitial] = React.useState(0);
  const [destination, setDestination] = React.useState(0);
  

  const handleFileChange = (e) => {
      // setSelectedFile(e.target.files[0]);
      setIsiFile("");
      let fr = new FileReader();
      fr.readAsText(e.target.files[0]);
      fr.onload = function() {
          setIsiFile(fr.result);
      };
  }

    const handleInitialChange = (e) => {
        setInitial(e.target.selectedIndex);
    }

    const handleDestinationChange = (e) => {
        setDestination(e.target.selectedIndex);
    }

  const handleSubmit = async (e) => {
      e.preventDefault();

      // DEBUG ISI FILE DI SINI
    //   console.log("Isi FIle")
    //   console.log(isiFile)
    //   console.log(e.target.result)
      // Tunggu Backend dulu
      const endpoint = 'http://localhost:3000/api/getGraph';

      fetch(endpoint, {
          crossDomain:true,
          method: 'POST',
          body: JSON.stringify({isiTxt: isiFile}),
          headers: {
              'Content-Type': 'application/json'
          },
          mode: 'cors'
      }).then(response => {
        if (response.headers.get('content-type').match("application/json")) {
            return response.json();
        }
        })
        .then(json => {
            console.log(json);
            setNamaNode(json.namaNode);
            setJmlNode(json.jmlNode);
            setRelasiMatriks(json.relasiMatriks);
            return json;
        })
        .catch(error => {
            console.log(error)
        })
        createNode();
    }
    
    
    // BAGIAN GRAPH
    const createNode = (x, y) => {
        Object.keys(namaNode).map((nama, id) => {
            const color = randomColor();
            setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
            
            for (let i = 0; i < jmlNode; i++) {
                for (let j = 0; j < jmlNode; j++) {
                    if (relasiMatriks[i][j] >= 0) {
                        const labelEdge = relasiMatriks[i][j].toString();
                        edges.push({
                            from: i,
                            to: j,
                            label: labelEdge,
                            color: randomColor()
                        });
                    }
                }
            }
                return {
                    graph: {
                    nodes: [
                        ...nodes,
                        { id, label: nama, color, x, y }
                    ],
                    edges: [
                        ...edges,
                        
                    ]
                    },
                    counter: jmlNode,
                    ...rest
                }
            });
        })
      }

      const [graphState, setGraphState] = useState({
        counter: jmlNode,
        graph: {
          nodes: [],
          edges: [
          ]
        },
        events: {
          select: ({ nodes, edges }) => {
            console.log("Selected nodes:");
            console.log(nodes);
            console.log("Selected edges:");
            console.log(edges);
            alert("Selected node: " + nodes);
          },
        }
      })

      const handleSubmitDijkstra = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const endpoint = 'http://localhost:3000/api/countDijkstra';

        fetch(endpoint, {
          crossDomain:true,
          method: 'POST',
          body: JSON.stringify({
            initial: initial,
            destination: destination,
          }),
          headers: {
              'Content-Type': 'application/json'
          },
          mode: 'cors'
          
        })
        console.log(initial)
      }

      const { graph, events } = graphState;

  return(
      <div className="flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className='w-3/4'>
              <div className='mb-6 items-center text-left'>
                  <label className="font-montserrat align-text-left text-l" htmlFor="matriks_txt">Upload Graf dalam Bentuk Matriks</label>
                  <input onChange={handleFileChange} className="block w-full text-l text-gray-900 rounded-lg cursor-pointer text-white bg-gray-700/20 border-gray-600 placeholder-gray-400" aria-describedby="user_avatar_help" id="matriks_txt" type="file" accept='.txt' required></input>
                  <div className="mt-1 text-l font-montserrat" id="matriks_txt_help">Sebuah file .txt yang berisi matriks relasi</div>
              </div>
              <button class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg mb-4" type="submit">Submit</button>
          </form>
          <form className='w-3/4 mb-6' onSubmit={handleSubmitDijkstra}>
              <div className='flex items-center border-black space-x-5'>
                  <div style={{margin: 10}}>
                    <p className='text-left font-montserrat'>Initial</p>
                  </div>
                  <div style={{margin: 10}}>
                    <select onChange={handleInitialChange} class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        {
                            namaNode ?
                                Object.keys(namaNode).map((nama, index) => (
                                    <option key={index}>{nama}</option>
                                ))
                            : <option>Node</option>
                        }
                    </select>
                  </div>
                  <div style={{margin: 10}}>
                    <p className='text-left font-montserrat'>Destination</p>
                  </div>
                  <div style={{margin: 10}}>
                    <select onChange={handleDestinationChange} class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        {
                            namaNode ? 
                                Object.keys(namaNode).map((nama, index) => (
                                    <option key={index}>{nama}</option>
                                    
                                ))
                            : <option>Node</option>
                        }
                        {}
                    </select>
                  </div>
             </div>
             <button class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg mb-4" type="submit">Cari!</button>
          </form>
          <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} />
      </div>
  )
}

export default function App(){
  return (
    <div style={{backgroundImage: `url("bg.jpg")`}}>
      <div className='flex flex-row h-screen justify-center items-center' style={{overflowY: 'scroll'}}>
          <div className='w-3/4 ' style={{overflowY: 'scroll'}}>
              <div className='text-center w-full bg-gray-100/30 border border-gray-100/20 rounded-lg mt-15'>
                  <h2 class="py-4 font-montserrat text-white" style={{fontSize: 40}}>Dijkstra Path Finding</h2>
                  <Form/>
              </div>
          </div>
      </div>
    </div>
  )
  }
