import React from 'react'
import { getalltags } from '@/frontendservices/operations/tags'
// const skills=
const addskill = () => {
    async function skill(){
        try{
            getalltags();
            
        }
        catch(err){

        }
    }
  return (
    <div>
      <h1>Skills</h1>
      <button onClick={skill()}>Add skills</button>

    </div>
  )
}

export default addskill
