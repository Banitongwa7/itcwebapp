import React from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../../../assets/LogoDark.png';
import EmailSuccess from '../../../assets/EmailSuccess.svg';

const ConfirmPass = () => {


    return (
      <div className="flex items-center bg-gray-100 justify-center min-h-screen p-5 min-w-screen">
        <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-xl lg:p-12">
            <div className="m-5">
                <img className="mx-auto h-12 w-auto" src={LogoDark} alt="logo ITC" />
            </div>
            <h3 className="text-2xl">Félicitations ! Vous avez reussi.</h3>
            <div className="flex justify-center">
                <img src={EmailSuccess} className="w-32 h-32" alt="email confirm" />
            </div>
            <p>Veuillez consulter votre nouveau mot de passe sur votre adresse email.</p>
            <div className="mt-4">
                <div>
                    <Link to="/" className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700">
                        Se connecter
                    </Link>
                </div>
                <p className="mt-4 text-sm">Merci de contacter <a href="mailto:davidbanitongwa.gmail.com" className="underline">l'administrateur</a>, si vous n'avez pas réçu un mail.</p>
            </div>
        </div>
    </div>
    )
}

export default ConfirmPass;