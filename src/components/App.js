import React, { useEffect, useState } from 'react'
import '../styles/App.css';

const Loader = () => {
  return <div id="loader">Loading...</div>
}

const App = () => {
  const [Loading, setLoading] = useState(false);
  const [type, setType] = useState('education');
  const [data, setData] = useState({});

  const GetFetchedData = async() => {
    const controller = new AbortController();
    const response = await fetch(`http://www.boredapi.com/api/activity?type=${type}`,{
      signal: controller.signal,
    })
    const json = await response.json();
    setData(json);

    return () => {
      controller.abort();
    };
  }

  const refresh = () => {
    const fun = async() => {
      setLoading(true);
      await GetFetchedData();
      setLoading(false);
    }
    fun();
  }

  useEffect(() => {
    refresh();
  }, [type]);

  const handleRecreationButton = () => {
    if(type === 'recreational'){
      refresh();
      return;
    }
    setType('recreational');
  }
  const handleEducationButton = () => {
    if(type === 'education'){
      refresh();
      return;
    }
    setType('education');
  }

  return (
    <div id="main">
      {Loading ? Loader() : <div id='activity'>{data.activity}</div>}
      <button id='btn-recreation' onClick={handleRecreationButton}>Recreational</button>
      <button id='btn-education' onClick={handleEducationButton}>Education</button>
    </div>
  )
}

export default App;

