import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Context from "./Context"
import jwtDecode from "jwt-decode";



const ContextProvider = ({children}) => {

    let [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [loading, setLoading] = useState(true)

    // set Agent
    let [agent, setAgent] = useState( () => localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null )
    // set Admin
    let [admin, setAdmin] = useState( () => localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null )
    // auth two factor
    let [checkUser, setCheckUser] = useState(null)
    let [checkUserAdmin, setCheckUserAmin] = useState(null)
    // message authentication
    let [message, setMessage] = useState("")
    // message two factor auth
    let [messageAuth, setMessageAuth] = useState("")
    // token authentication
    let [token, setToken] = useState(null)
    // change interface login and two auth factor
    let [stepAuth, setStepAuth] = useState(false)

    const history = useHistory()

    // Login Agent
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
            setToken(token = data)
            setStepAuth(stepAuth = true)

        }else{
            setMessage("Email or Password Incorrect !")
        }
    }

    // Auth Two Factor Agent
    let codeAuthCheck = async (e) => {
        e.preventDefault();
        setCheckUser(checkUser = jwtDecode(token.access))
        let code = e.target.code.value
        const reg = new RegExp('^[0-9]+$');

        if (reg.test(code) && code.length === 5){
            let resp = await fetch(`http://127.0.0.1:8000/api/codeauth/${checkUser.user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'number':code})
            })
            let data = await resp.json()
            if (data !== 200)
            {
                setMessageAuth("Code Invalide !")
            }else{

                setAuthToken(authToken = token)
                setAgent(agent = jwtDecode(token.access))
                localStorage.setItem('authToken', JSON.stringify(token))
                history.push("/home")

            }
        }else{
            setMessageAuth("Code Invalide !")
        }
    }




    // Login Admin

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
            setToken(token = data)
            setCheckUserAmin(checkUserAdmin = jwtDecode(data.access))
            if (!checkUserAdmin.superuser)
            {
                setMessage("Seul l'administrateur peut se connecter !")
            }else{
                setStepAuth(stepAuth = true)
            }

        }else{
            setMessage("Email or Password Incorrect !")
        }
    }

    // Auth Two Factor Admin
     let codeAuthCheckAdmin = async (e) => {
        e.preventDefault();
        let code = e.target.code.value
        const reg = new RegExp('^[0-9]+$');

        if (reg.test(code) && code.length === 5){
            let resp = await fetch(`http://127.0.0.1:8000/api/codeauth/${checkUserAdmin.user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'number':code})
            })
            let data = await resp.json()
            if (data !== 200)
            {
                setMessageAuth("Code Invalide !")
            }else{
                setAuthToken(authToken = token)
                setAdmin(admin = jwtDecode(token.access))
                localStorage.setItem('authToken', JSON.stringify(token))
                history.push("/dashboard")
            }
        }else{
            setMessageAuth("Code Invalide !")
        }
    }





    // logout Agent
    let logoutAgent = () => {

        setAuthToken(null)
        setAgent(null)
        localStorage.removeItem('authToken')
        setStepAuth(stepAuth = false)
        history.push('/')
    }



    // logout Admin
    let logoutAdmin = () => {

        setAuthToken(null)
        setAdmin(null)
        localStorage.removeItem('authToken')
        setStepAuth(stepAuth = false)
        history.push('/admin')
    }



    // function for update token
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
            setAuthToken(authToken = data)
            setAgent(agent = jwtDecode(data.access))
            setAdmin(admin = jwtDecode(data.access))
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
        // For message
        message:message,
        messageAuth:messageAuth,
        // Two Factor Auth
        codeAuthCheck:codeAuthCheck,
        codeAuthCheckAdmin:codeAuthCheckAdmin,
        // step auth
        stepAuth:stepAuth,
        
    }


    return (
        <Context.Provider value={contextData}>
                {children}
        </Context.Provider>
    )
}

export default ContextProvider;
