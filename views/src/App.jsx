// import {React.useState} from 'react';

function Form(){
  // const [selectedFile, setSelectedFile] = React.useState(null);
  const [isiFile, setIsiFile] = React.useState("");
  const [message, setMessange] = React.useState("");
  const [resStatus, setResStatus] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleFileChange = (e) => {
      // setSelectedFile(e.target.files[0]);
      setIsiFile("");
      let fr = new FileReader();
      fr.readAsText(e.target.files[0]);
      fr.onload = function() {
          setIsiFile(fr.result);
      };
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      setIsLoading(true);

      // DEBUG ISI FILE DI SINI
    //   console.log("Isi FIle")
    //   console.log(isiFile)
    //   console.log(e.target.result)
      // Tunggu Backend dulu
      const endpoint = 'localhost:3000/api/getGraph';

      const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({isiTxt: isiFile}),
          headers: {
              'Content-Type': 'application/json'
          }
      });

    //   const result = await response.json();
      if (!result["error"]){
          setMessange("Berhasil submit!");
          setIsLoading(false);
          setResStatus("success");
      } else {
          setMessange("Gagal submit!");
          setIsLoading(false);
          setResStatus("gagal");
      }
      console.log(result);
  }

  return(
      <div className="flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className='w-3/4'>
              <div className='mb-6 items-center text-left'>
                  <label className="font-montserrat align-text-left" htmlFor="matriks_txt">Upload Graf dalam Bentuk Matriks</label>
                  <input onChange={handleFileChange} className="block w-full text-sm text-gray-900 rounded-lg cursor-pointer text-white bg-gray-700/20 border-gray-600 placeholder-gray-400" aria-describedby="user_avatar_help" id="matriks_txt" type="file" accept='.txt' required></input>
                  <div className="mt-1 text-sm font-montserrat" id="matriks_txt_help">Sebuah file .txt yang berisi matriks relasi</div>
              </div>
              <button class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg mb-4" type="submit">Submit</button>
          </form>
      </div>
  )
}

function App(){
  return (
    <div style={{backgroundImage: `url("../public/bg.jpg")`}}>
      <div className='flex flex-row h-screen justify-center items-center'>
          <div className='w-1/2 '>
              <div className='text-center w-full bg-gray-100/30 border border-gray-100/20 rounded-lg'>
                  <h2 class="text-5xl py-4 font-montserrat text-white">Input graf dalam bentuk txt</h2>
                  <Form/>
              </div>
          </div>
      </div>
    </div>
  )
  }

const domContainer = document.getElementById('app');
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);