import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from '@nextui-org/button'
import { Link } from 'react-router-dom'
import { Input } from '@nextui-org/input'
import { useForm } from 'react-hook-form'
import '../../components/header/Header.css'
import { login, signup } from "../../api/authApi.js";
import { setUser } from "../../store/slice/authSlice.js";
import { useDispatch } from "react-redux";

function Auth() {
    const [selected, setSelected] = React.useState("login");
    const dispatch = useDispatch();


    // signup
    const { register: signupRegister, handleSubmit: signupHandleSubmit , reset:signupFormReset} = useForm();
    const handleSignup = async (data) => {

        try {
            const response = await signup(data);
            if (response.status != 200) {
                console.log(response);
                return;
            }
            const { email, name } = data;
            dispatch(setUser({ email, name }));
            signupFormReset();
        } catch (error) {
            console.log("Error =>", error);
        }
    }

    // login
    const { register: loginRegister, handleSubmit: loginHandleSubmit , reset:loginFormReset } = useForm();
    const handleLogin = async (data) => {
        console.log(data);
        try {
            const response = await login(data);
            if (response.status != 200) {
                console.log(response);
                return;
            }
            const { email, name } = response.data.user;
            dispatch(setUser({ email, name }));
            loginFormReset();
        } catch (error) {
            console.log("Error =>", error);
        }
    }

    return (
        <div className="flex flex-col w-full justify-center items-center  mt-10 gap-2">
            <h1 className="text-3xl font-semibold underline rancho-regular">Authentication First</h1>
            <Card className="max-w-full w-[340px] h-[400px] shadow-lg shadow-slate-300 border-1">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                    >
                        <Tab key="login" title="Login">
                            <form
                                onSubmit={loginHandleSubmit(handleLogin)}
                                className="flex flex-col gap-4 mt-3">
                                <Input isRequired {...loginRegister('email')} label="Email" placeholder="Enter your email" type="email" />
                                <Input
                                    {...loginRegister('password')}
                                    isRequired
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                />
                                <p className="text-center text-small">
                                    Need to create an account?{" "}
                                    <Link size="sm" onClick={() => setSelected("sign-up")}>
                                        Sign up
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button type="submit" fullWidth color="primary">
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="sign-up" title="Sign up">
                            <form
                                onSubmit={signupHandleSubmit(handleSignup)}
                                className="flex flex-col gap-4 h-[300px] mt-3" >
                                <Input isRequired {...signupRegister('name')} label="Name" placeholder="Enter your name" type="text" />
                                <Input isRequired {...signupRegister('email')} label="Email" placeholder="Enter your email" type="email" />
                                <Input
                                    isRequired
                                    {...signupRegister('password')}
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                />
                                <p className="text-center text-small">
                                    Already have an account?{" "}
                                    <Link size="sm" onClick={() => setSelected("login")}>
                                        Login
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button fullWidth color="primary" type="submit">
                                        Sign up
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
}

export default Auth;
