// import {React.useState} from 'react';
// import "./network.css"
import Graph from "react-graph-vis";
import React from 'react';


function Form(){
  // const [selectedFile, setSelectedFile] = React.useState(null);
  const [isiFile, setIsiFile] = React.useState("");
  const [message, setMessange] = React.useState("");
  const [resStatus, setResStatus] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [namaNode, setNamaNode] = React.useState("");
  const [initial, setInitial] = React.useState("");
  const [destination, setDestination] = React.useState("");
  

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
        setInitial(e.target.value);
    }

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    }

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

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
            return json;
        })
        .catch(error => {
            console.log(error)
        })
    }
    

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
          <form className='w-3/4 mb-6'>
              <div className='flex items-center border-black space-x-5'>
                  <div style={{margin: 10}}>
                    <p className='text-left font-montserrat'>Initial</p>
                  </div>
                  <div style={{margin: 10}}>
                    <select onChange={handleInitialChange} class="block appearance-none w-2/5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
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
                    <select onChange={handleDestinationChange} class="block appearance-none w-2/5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        {
                            namaNode ?
                                Object.keys(namaNode).map((nama, index) => (
                                    <option key={index}>{nama}</option>
                                ))
                            : <option>Node</option>
                        }
                    </select>
                  </div>
             </div>
          </form>
      </div>
  )
}

export default function App(){
  return (
    <div style={{backgroundImage: `url("../public/bg.jpg")`}}>
      <div className='flex flex-row h-screen justify-center items-center'>
          <div className='w-1/2 '>
              <div className='text-center w-full bg-gray-100/30 border border-gray-100/20 rounded-lg'>
                  <h2 class="py-4 font-montserrat text-white" style={{fontSize: 40}}>Dijkstra Path Finding</h2>
                  <Form/>
              </div>
          </div>
      </div>
    </div>
  )
  }
