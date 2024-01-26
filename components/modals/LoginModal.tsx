import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading){
            return;
        }
        loginModal.onClose();
        registerModal.onOpen()
    },[loginModal, registerModal, isLoading])

    const onSubmit = useCallback(async ()=> {
        try{
            setIsLoading(true);

            //todo login actions
            loginModal.onClose();

        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false);
        }
    }, [loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Email"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="Password"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>First time using Twitter? 
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline">
                     Create an Account
                </span>
            </p>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        body={bodyContent}
        actionLabel="Sign In"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        footer={footerContent}
    />
    )
}

export default LoginModal