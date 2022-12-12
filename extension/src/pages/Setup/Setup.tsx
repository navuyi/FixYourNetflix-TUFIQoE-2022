import React, { useEffect } from 'react';
import { MESSAGE_HEADERS, T_MESSAGE } from '../../config/messages.config';
import { ChromeStorage } from '../../utils/custom/ChromeStorage';
import "./style.scss"



const Setup = () => {
  
  useEffect(() => {
    const init = async () =>{
      const settings = await ChromeStorage.get_experiment_settings()
      const exp_variables = await ChromeStorage.get_experiment_variables()
      exp_variables.experiment_running = true
      await ChromeStorage.set_single("experiment_variables", exp_variables)

      const message : T_MESSAGE = {
        header: MESSAGE_HEADERS.REDIRECT,
        data: {
          url: settings.video_url[0]
        }
      }
      chrome.runtime.sendMessage(message)
    }

    init()
  }, [])

  return (
    <div className="App">
     
    </div >
  );
};

export default Setup;