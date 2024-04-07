// frontendservices/operations/tags.js

import { setQuestions, setLoading, setError } from '../slices/tages'
import { apiConnector } from '../apiconnector'
import { endpoints } from '../api'
import { toast } from 'react-toastify'

const { GIVETEST_API, ADDSKILLS_API } = endpoints
export const fetchQuestionsByTag = (tagName) => async (dispatch) => {
  try {
    dispatch(setLoading(true)) // Set loading state to true

    const response = await apiConnector('POST', GIVETEST_API, {
      tagName,
    })
    console.log(response.data, 'deep ka data')
    dispatch(setQuestions(response.data.questions)) // Dispatch the action to update questions in the store
  } catch (error) {
    console.error('Error fetching questions by tag:', error)
    dispatch(setError('Error fetching questions')) // Dispatch the action to set error
  } finally {
    dispatch(setLoading(false)) // Set loading state back to false
  }
}
export const addskills = (newSkills) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    console.log('tag aya', newSkills)
    // Set loading state to true

    const response = await apiConnector('POST', ADDSKILLS_API, {
      newSkills,
    })

    console.log(response.data)
  } catch (error) {
    console.error('Error fetching questions by tag:', error)

    dispatch(setError('Error fetching questions')) // Dispatch the action to set error
  } finally {
    dispatch(setLoading(false)) // Set loading state back to false
  }
}
