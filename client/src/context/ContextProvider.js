import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Context from "./Context"
import jwtDecode from "jwt-decode";



const ContextProvider = ({children}) => {

    let [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [loading, setLoading] = useState(true)


    let [agent, setAgent] = useState( () => localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null )
    let [admin, setAdmin] = useState( () => localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null )
    let [message, setMessage] = useState('')

    let [authTwoFactor, setAuthTwoFactor] = useState(false)

    const history = useHistory()


    let loginAgent = async (e)=> {
        e.preventDefault();

        let resp = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await resp.json()
        if(resp.status === 200)
        {
            setAuthToken(data)
            setAgent(jwtDecode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
            setAuthTwoFactor(true)
            history.push('/twofactor')

        }else{
            setMessage("Email or Password Incorrect !")
        }
    }

    // Admin

    let loginAdmin = async (e)=> {
        e.preventDefault();

        let resp = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await resp.json()
        if(resp.status === 200)
        {
            setAuthToken(data)
            setAdmin(jwtDecode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
            if (!admin.superuser)
            {
                setMessage("Seul l'administrateur peut se connecter !")
            }else{
                setAuthTwoFactor(true)
                history.push('/twofactoradmin')
            }

        }else{
            setMessage("Email or Password Incorrect !")
        }
    }


    let logoutAgent = () => {

        setAuthToken(null)
        setAgent(null)
        localStorage.removeItem('authToken')
        history.push('/')
    }

    let logoutAdmin = () => {

        setAuthToken(null)
        setAdmin(null)
        localStorage.removeItem('authToken')
        history.push('/admin')
    }




    let updateToken = async ()=> {

        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authToken.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTwoFactor(true)
            setAuthToken(data)
            setAgent(jwtDecode(data.access))
            setAdmin(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutAgent()
            logoutAdmin()
        }

        if(loading){
            setLoading(false)
        }

    }



    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authToken){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [ authToken, loading ])






    // data context

    let contextData = {
        // Agent
        agent:agent,
        loginAgent:loginAgent,
        logoutAgent:logoutAgent,
        // Admin
        admin:admin,
        loginAdmin:loginAdmin,
        logoutAdmin:logoutAdmin,
        // For all
        message:message,
        // Two Factor Auth
        authTwoFactor:authTwoFactor,
        setAuthTwoFactor:setAuthTwoFactor,
        // Function statistique
        
    }



    return (
        <Context.Provider value={contextData}>
                {children}
        </Context.Provider>
    )
}

export default ContextProvider;
