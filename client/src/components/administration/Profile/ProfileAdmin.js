import React, { useContext, useState } from 'react';
import Context from './../../../context/Context';
import picicon from './../../../assets/picicon.svg';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';




const ProfileAgent = () => {

    let {admin} = useContext(Context)

    const history = useHistory()

    const [name, setName] = useState(admin.full_name)
    const [phone, setPhone] = useState(admin.phone)
    const [email, setEmail] = useState(admin.email)
    const [pic, setPic] = useState(admin.picture)
    const [passwchecker, setPasswchecker] = useState('')
    const [newpass, setNewpass] = useState('')
    const [message, setMessage] = useState('')

    // set picture in hooks when user change
    const changePicture = (e) => {
        let file = document.getElementById('fileInput').files[0]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function(e) {document.querySelector('#image').src = e.target.result}
        setPic(file)
    }


    // traitement image profile

    let pictureWithQuote = admin.picture
    let pictureWithoutQuote = pictureWithQuote.replaceAll('"', '')
    let picture = "http://127.0.0.1:8000/profile/" + pictureWithoutQuote


    // update profile admin

    let updateAgent = async (e) => {
        if (passwchecker === '')
        {
            setMessage("Vous devez saisir votre mot de passe pour proceder à la mise à jour de vos informations.")
        }else{
            e.preventDefault();

            let formdata = new FormData();

            if (pic !== admin.picture)
            {
                formdata.append('picture', pic, pic.name)
            }

            if (name !== admin.full_name)
            {
                formdata.append('full_name', name)
            }

            if(phone !== admin.phone)
            {
                formdata.append('phone', phone)
            }

            if(newpass)
            {
                formdata.append('password', newpass)
            }

            formdata.append('email', email)
            formdata.append('checker', passwchecker)

            let resp = await fetch(`http://127.0.0.1:8000/api/updateadmin/${admin.user_id}`, {
                method: 'POST',
                body:formdata
            })

            let data = await resp.json()

            if (data !== 200)
            {
                setMessage("Mot de passe incorrect !");
            }else{
                swal("Felicitations !", "Vos données ont été mis à jour. Veuillez vous connecté à nouveau pour actualiser vos informations.", "success");
                // Go to login
                history.push('/dashboard')
            }
        }
    }

    /*
    one uppercase | one lowercase | one special character | min 4
    pattern="(?=^.{4,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
    */


    // Function change button to update or Valider

    let updateInfo = name !== admin.full_name || phone !== admin.phone || pic !== admin.picture || email !== admin.email || newpass ? (<button type="submit" className="w-96 shadow-md focus:outline-none border border-transparent py-2 px-5 rounded-lg text-center text-white bg-green-500 hover:bg-green-600 font-medium"> Update </button>) : (<button type="button" className="w-96 shadow-md focus:outline-none border border-transparent py-2 px-5 rounded-lg text-center text-white bg-blue-500 hover:bg-blue-600 font-medium"> Valider </button>)

  return (
    <div>
        <div className="max-w-3xl mx-auto px-4 py-10">

        <form method="post" onSubmit={updateAgent}>
            <div className="mb-5 text-center">
                <div className="mx-auto w-32 h-32 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                    <img id="image" className="object-cover w-full h-32 rounded-full" alt='img cover' src={picture} />
                </div>

                <label htmlFor="fileInput" type="button" className="cursor-pointer inline-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium">
                    <img src={picicon} className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1" alt="icon" />
                    Browse Photo
                </label>

                <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-1">photo de profile</div>

                <input name="photo" id="fileInput" className="hidden" type="file" onChange={changePicture}/>
            </div>

               {/*Message d'erreur*/}
            <div className="mb-1">
                <p className='text-center font-mono text-lg text-red-600'>{message}</p>
            </div>

            <div className="mb-5">
                <label htmlFor="namefull" className="font-bold mb-1 text-gray-700 block">Nom complet</label>
                <input type="text" id="namefull" name="namefull" className="w-full border-2 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium" value={name} onChange={(e)=>setName(e.target.value)} required/>
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">E-mail</label>
                <input type="email" id="email" name="email" className="w-full border-2 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                    value={email}  onChange={(e)=>setEmail(e.target.value)} required/>
            </div>

            <div className="mb-5">
                <label htmlFor="phone" className="font-bold mb-1 text-gray-700 block">Téléphone</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{8}" className="w-full border-2 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium" value={phone} onChange={(e)=>setPhone(e.target.value)} title="Ex: 54427127" required/>
            </div>

            <div className="mb-5">
                <label htmlFor="newpass" className="font-bold mb-1 text-gray-700 block">Changer de mot de passe</label>
                <input type="password" id="newpass" name="newpass" className="w-full border-2 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium" onChange={(e)=>setNewpass(e.target.value)} title="Nouveau mot de passe"/>
            </div>

            <div className="mb-5">
                <label htmlFor="passwchecker" className="font-bold mb-1 text-gray-700 block">Saisir votre mot de passe pour le Update</label>
                <input type="password" id="passwchecker" name='passwchecker' className="w-full border-2 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium" placeholder="*******" onChange={(e)=>setPasswchecker(e.target.value)} required/>
            </div>



            {/*<!-- Button submit -->*/}
            <div className="flex justify-center w-full py-5 bg-white">
                {updateInfo}
            </div>
        </form>

        </div>

    </div>
  )
}

export default ProfileAgent;